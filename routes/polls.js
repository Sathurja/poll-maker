const express = require('express')
const router = express.Router()
const Poll = require('../models/poll')


// 1. Post Poll
router.post('/', async(request, response) => {
    const poll = new Poll ({
        poll_name: request.body.poll_name,
        description: request.body.description,
        options: request.body.options
        // number_of_participants: request.body.number_of_participants
    })

    try {
        const newPoll = await poll.save()
        response.status(200).json(newPoll._id)
        if (request.body.poll_name == null) {
            response.status(401).json({message: "You haven't entered a Poll name"})
        }
        if (request.body.description == null) {
            response.status(402).json({message: "You haven't entered a description name"})
        }
        if (request.body.options == null) {
            response.status(403).json({message: "You haven't entered the options"})
        }
    } catch (error) {
        response.status(500).json({message: error.message})
    }
})


// 2. Get Poll Results
router.get('/:id', getPoll, (request, response) => {
    response.json(response.poll)
})


// 3. Post response (aka patch choice array)
router.patch('/:id', getPoll, async(request, response) => {
    if (request.body.choice != null) {
        response.poll.options = { ...response.poll.options, [request.body.choice]: response.poll.options[request.body.choice] + 1 }
    }

    try {
        const updatedPoll = await response.poll.save()
        response.json(updatedPoll)
    } catch (error) {
        response.status(400).json({message: error.message})
    }
})


// 4. Delete Poll
router.delete('/:id', getPoll, async (request, response) => {
    try {
        await response.poll.remove()
        response.json({message: 'Deleted Poll'})
    } catch {
        response.status(500).json({message: error.message})
    }
})


// 5. Update Poll
router.patch('/:id', getPoll, async(request, response) => {
    if (request.body.poll_name != null) {
        response.poll.poll_name = request.body.poll_name
    }
    if (request.body.description != null) {
        response.poll.description = request.body.description
    }
    if (request.body.options != null) {
        response.poll.options = request.body.options
    }
    if (request.body.number_of_participants != null) {
        response.poll.number_of_participants = request.body.number_of_participants
    }

    try {
        const updatedPoll = await response.poll.save()
        response.json(updatedPoll)
    } catch (error) {
        response.status(400).json({message: error.message})
    }
})


// // 6. Get Poll Options (really number 3 in order)



//Getting all polls --Don't actually use (just for checking)
router.get('/', async (request, response) => {
    try {
        const polls = await Poll.find()
        response.json(polls)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
})

router.delete('/:id', getPoll, async (request, response) => {
    try {
        await response.poll.remove()
        response.json({message: 'Deleted Poll'})
    } catch {
        response.status(500).json({message: error.message})
    }
})




//Middleware function
async function getPoll (request, response, next) {
    let poll
    try {
        poll = await Poll.findById(request.params.id)
        if(poll == null) {
            return response.status(404).json({message: 'Cannot find poll'}) //Requested poll is not in database
        }
    } catch (error) {
        return response.status(500).json({message: error.message})
    }
    response.poll = poll
    next()
}



module.exports = router












































/*

//Getting all polls
router.get('/', async (request, response) => {
    try {
        const polls = await Poll.find()
        response.json(polls)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
})


//Getting One Poll
router.get('/:id', getPoll, (request, response) => {
    response.json(response.poll)
})


//Creating One poll
router.post('/', async(request, response) => {
    const poll = new Poll ({
        poll_name: request.body.poll_name,
        description: request.body.description,
        options: request.body.options,
        // number_of_participants: request.body.number_of_participants
    })

    try {
        const newPoll = await poll.save()
        response.status(200).json(newPoll)
    } catch (error) {
        response.status(400).json({message: error.message})
    }
})


//Updating One poll
router.patch('/:id', getPoll, async(request, response) => {
    if (request.body.poll_name != null) {
        response.poll.poll_name = request.body.poll_name
    }
    if (request.body.description != null) {
        response.poll.description = request.body.description
    }
    if (request.body.options != null) {
        response.poll.options= request.body.options
    }
    if (request.body.number_of_participants != null) {
        response.poll.number_of_participants = request.body.number_of_participants
    }

    try {
        const updatedPoll = await response.poll.save()
        response.json(updatedPoll)
    } catch (error) {
        response.status(400).json({message: error.message})
    }
})


//Deleating One Poll
router.delete('/:id', getPoll, async (request, response) => {
    try {
        await response.poll.remove()
        response.json({message: 'Deleted Poll'})
    } catch {
        response.status(500).json({message: error.message})
    }
})
*/
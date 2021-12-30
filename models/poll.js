const mongoose = require("mongoose")

const pollSchema = new mongoose.Schema ({
    poll_name: {
        type: String
    },
    description: {
        type: String
    },
    options: {
        type: Object
    }

    // number_of_participants: {
    //     type: Number,
    //     required: false
    // }

})


module.exports = mongoose.model("Poll", pollSchema)
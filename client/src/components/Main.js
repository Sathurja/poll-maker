import React, {useEffect, useState} from "react"
import ReactDOM from 'react-dom'
import axios from 'axios';


export default function Main() {
    const [inputName, setInputName] = useState("")
    const [inputDescription, setInputDescription] = useState("")
    const [inputOptions, setInputOptions] = useState([""])

    const [pollId, setPollId] = useState("")

    function handleInputNameChange (event) {
        const {name, value} = event.target
        setInputName(value)
    }

    function handleInputDescriptionChange (event) {
        const {description, value} = event.target
        setInputDescription(value)
    }

    const handleInputOptionsChange = (event, index) => {
        const {name, value} = event.target
        const list = [...inputOptions]
        list[index] = value
        setInputOptions (list)
    }

    const addOption = () => {
        setInputOptions ([...inputOptions, ""])
    }

    function createPoll() {
        if ( (inputName == "") || (inputDescription == "") || (inputOptions == "") ) {
            return 
        }
        console.log(inputName)
        console.log(inputDescription)
        let optionsObj = {}
        for (let x of inputOptions) {
            optionsObj[x] = 0
        }
        console.log(optionsObj)
        axios.post("/polls/", {
            poll_name: inputName,
            description: inputDescription,
            options: optionsObj
        })
        
        .then(
            console.log(pollId))
        .then ( res => setPollId(res.data))
        .then(
        console.log(pollId))
    }

    useEffect(() => {
        Message()
    }, [pollId])

    const [message, setMessage] = React.useState([])
    
    function Message() {
        if (pollId != "") {
            setMessage(prevArray => [...prevArray, <h1 className="main--poll_created">We made your Poll!</h1>])
            setMessage(prevArray => [...prevArray, <p className="main--message">Now you can share this poll with your friends to have them participate. </p>])
            setMessage(prevArray => [...prevArray, <p className="main--message_id">The id for your poll is: <strong>{pollId}</strong> </p>])
            setMessage(prevArray => [...prevArray, <p className="main--paragraph">To have your friends participate in your poll, share this link with them and give them your id:</p>])
            setMessage(prevArray => [...prevArray, <p className="main--links">http://localhost:3000/polling</p>])
            setMessage(prevArray => [...prevArray, <p className="main--paragraph">And use this link to check out the results of your poll using your id:</p>])
            setMessage(prevArray => [...prevArray, <p className="main--links">http://localhost:3000/results</p>])
        }
    }


    return (
        <main className="main">
            <h1 className="main--title">Create a poll</h1>

            <ul id="main--input_boxes">
                <li className="main--input_title">Poll Name</li>
                <div className="main-input-box">
                    <input
                        type = "text"
                        placeholder = "ex. Favioutite Color"
                        className = "main--input"
                        id = "name"
                        onChange={handleInputNameChange}
                    />
                </div>

                <li className="main--input_title">Description</li>
                <div className="main-input-box">
                    <input
                        type = "text"
                        placeholder = "ex. Choose your faviourite Color"
                        className = "main--input"
                        id = "description"
                        onChange={handleInputDescriptionChange}
                    />
                </div>
                <li className="main--input_title_options">Options</li> 

                {inputOptions.map( (data, index) => {
                    return (
                        <div key={index}>
                            <li className="main--input_title">
                                <input
                                    type = "text"
                                    placeholder = "ex. Red"
                                    className = "main--input"
                                    name="options"
                                    value={data.options}
                                    onChange={event => handleInputOptionsChange(event, index)}
                                />
                            </li>
                            {(inputOptions.length - 1) === index &&
                                <button className="main--add_option" onClick={addOption}>Add another option</button>
                            }
                        </div>
                    )
                } )}
                    
                {/* <pre>
                    {JSON.stringify(inputOptions, null, 1)}
                </pre>          */}
                
            </ul>
            

            <button
                className="main--button"
                onClick={createPoll} //make sure that if the person doesn't add another option, taht you still include their single option as apart of the options map
            >
                Create!
            </button>
            <div className="message">{message}</div>
        </main>
    )
}




















    /*
    function handleInputOptionsChange (event) {
        const {options, value} = event.target
        setInputElements ({
            ...inputElements,
            options: value
        })
    }
    */

    // useEffect( () => {

    // }, [inputArr])

    // useEffect( () => {
    //     setInputElements(prevArray => [...prevArray, <input>getElementById(count).type</input>])
    // }, count)

    // function handleInputChange (event) {
    //     const {name, value} = event.target
    //     setInputElements
    // }

/*
    this.state = {
        name: "",
        description: "",
        options: {

        }

    }

    function onChangeName(input) {
        this.setState( {
            name: input.target.value
        })
    }
    function onChangeDescription(input) {
        this.setState( {
            description: input.target.value
        })
    }
    function onChangeDescription(input) {
        this.setState( {
            description: input.target.value
        })
    }

    function onSubmit (input) {
        input.preventDefault();
        const poll = {
            name: this.state.name,
            description: this.state.description,
            options: this.state.options
        }

        console.log(poll)

        window.location = "/"
    }
*/

/*

    //adds an option when "add an option button is clicked"
    function add_option () {
        var li = document.createElement("li");
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "ex. another color");
        input.setAttribute("className", "main--input");
        input.setAttribute("id", "input");
        li.appendChild(input);
        document.getElementById("main--input_boxes").appendChild(li);
        //patchPoll()////CHANGE THIS TO INCLUDE THE PARAMETER OF CHANGING THE INPUT TO THE MAP THING, ORRR, DO THE PATCHING IN THIS ADD_OPTION FUNCITON using map.set
    }
    var count = 0;
    function addOption () {
        count = count+1;
        setAddOptions(prevArray => [...prevArray,
            <li className="main--input_title">
                <input
                    type = "text"
                    placeholder = "ex. Red"
                    className = "main--input"
                    value = {inputElements.option}
                    // id = ${count}
                    onChange={handleInputOptionsChange}
                />
            </li>
        ])
    }
*/
/*
    function sendToApi() {
        var name = document.getElementById("name")
        axios.get("./polls").then((responce) => {
            const data = responce.data;
            this.setState({posts: data});
            console.log("We made your poll!")
        })
    }*/
    
    // count = 0
    // inputElements = [<input id=count></input>]
    // options = ["Red", "Green"]
/*
    function createPoll() {
        optionsObject = {}

        axios.post("/polls", {
            name: inputName,
            description: inputDescription,
            options: inputOptions
        })
*/
        /*
        var name = document.getElementById("name")
        var description = document.getElementById("description")
        var option = document.getElementById("option")
        console.log(name)
        console.log(description)
        console.log(option)
        axios.post("/polls", {
            name: name,
            description: description,
            options: {
                [option]: 0
            }
        })
        .then (console.log("euihiw"))
        .then(res => res.json())
        .then(console.log)
        
        .catch(err => console.log(err))*/
    


































  //Use Select tag to have a drop down menu for picking faviourite color <select> </select>
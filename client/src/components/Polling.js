import React, {useEffect, useState} from "react"
import axios from 'axios';

export default function Polling() {
    const [inputId, setInputId] = useState("")
    const [inputOptions, setInputOptions] = useState([])
    const [pollName, setPollName] = useState("")
    const [pollDescription, setPollDescription] = useState("")
    const [selectedOption, setSelectedOption] = useState("")

    function handleChange (event) {
        setDisplay("")
        setConfirmOptionText("")
        const {name, value} = event.target
        setInputId(value)
    }

    function getPoll() {
        axios.get(`/polls/${inputId}`)
        .then(response => {
            console.log(response.data);
            setPollName(response.data.poll_name)
            setPollDescription(response.data.description)
            setInputOptions(Object.keys(response.data.options))
        })
        
    }

    useEffect(() => {
        displayOptions()
    }, [inputOptions])

    function handleOptionChange ({ target }) {
        setSelectedOption(target.value)
    }

    const [display, setDisplay] = React.useState([])
    function displayOptions() {
        if (inputId != []) {
            console.log(pollName)
            setDisplay(prevArray => [...prevArray, <h1 className="polling--name">{pollName}</h1>])
            setDisplay(prevArray => [...prevArray, <h2 className="polling--description">{pollDescription}</h2>])
            setDisplay(prevArray => [...prevArray, <h3 className="polling--option_title">Here are the options:</h3>])
            for (let i=0; i<inputOptions.length; i++) {
                setDisplay(prevArray => [...prevArray, 
                    <ul>
                        <li className="polling--options">{inputOptions[i]}</li>
                    </ul>
                    ])
            }
            setDisplay(prevArray => [...prevArray, <p className="polling--display_message">Choose your option</p>])
            setDisplay(prevArray => [...prevArray,
                <select onChange={handleOptionChange} className="polling--selection_box">
                    <option disabled selected value >select</option>
                    {inputOptions.map(options => <option className="polling--select_options"> {options} </option>)}
                </select>])
            // console.log(`Hello`)
            // setDisplay(prevArray => [...prevArray, <h1>{confirmOptionText}</h1>])
        }
    }

    const [confirmOptionText, setConfirmOptionText] = useState("")
    useEffect(() => {
        if (selectedOption != ""){
            setConfirmOptionText( <p className="polling--choice_confirm">Click to confirm your choice of {selectedOption}
                             <button className="polling--confirm_btn" onClick={confirmBtnClick}> Confirm!</button></p>)
        }
    
    }, [selectedOption])

    const [responce, setResponce] = useState("")
    function confirmBtnClick() {
        if (selectedOption != "select") {
            axios.patch(`/polls/${inputId}`, {
                "choice": selectedOption
            })
            .then(response => {
                console.log(response.data);
            })
            .then (setResponce(prevArray => [...prevArray, <p>Yay! We've recorded your response!</p>]))
        }
    }

    return (
        <div className = "polling">
            <h1 className="main--title">Answer a poll</h1>
            <p className="main--input_title">Enter the pin your poller gave you here:</p>
            <input
                 type = "text"
                 placeholder = "61cXXXXXXXXXXXXXXXXXXXXX"
                 className = "polling--id"
                 name="id"
                 onChange={handleChange}
            />
            <button
                className="polling--button"
                onClick={getPoll}
            >
                Answer my Poll!
            </button>
            <div className="polling--display">{display}</div>
            <h1>{confirmOptionText}</h1>
            {/* <button className="polling--confirm_btn" onClick={confirmBtnClick}> Confirm!</button> */}
            
            <h1>{responce}</h1>
        </div>
    )
}
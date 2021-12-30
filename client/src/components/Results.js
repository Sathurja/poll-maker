import React, {useEffect, useState} from "react"
import axios from 'axios';

export default function Results() {
    const [inputId, setInputId] = useState("")
    function handleChange (event) {
        setDisplay("")
        const {name, value} = event.target
        setInputId(value)
    }
    
    const [display, setDisplay] = React.useState([])
    function getResults() {
        axios.get(`/polls/${inputId}`)
        .then(response => {
            console.log(response.data.options);
            console.log(JSON.stringify(response.data.options));
            console.log(Object.keys(response.data.options)[2]);
            console.log(Object.keys(response.data.options).length);
            //displayResults()
            setDisplay(prevArray => [...prevArray, <h1>Here are the Results to your poll named {response.data.poll_name}!</h1>])
            for (let i=0; i<(Object.keys(response.data.options).length); i++) {
                setDisplay(prevArray => [...prevArray, 
                    <div>
                        <p className="results--display"> {Object.keys(response.data.options)[i]} : {Object.values(response.data.options)[i]}</p>
                    </div>
                ])
            }
        })
    }
    // function displayResults() {
    //     setDisplay(prevArray => [...prevArray, <h1>Here are the Results!</h1>])
    //     for (let i=0; i<(Object.keys(response.data).length); i++) {
    //         setDisplay(prevArray => [...prevArray, 
    //             <div>
    //                 <p>{Object.keys(response.data)[1]} : </p>
    //             </div>
    //         ])
    //     }
    // }
    ///Now get an input options (keys) array using usestate (also did in Polling.js, so can do the same as that, or modify a little if i want)
    ///Then do a options values array ex.[5,2,4,8] using useState aswell
    ///Then use those in the display results function instead of Object.keys 
    ///Nevermind, I did it in an easier way!
    return (
        <div className="results">
            <h1 className="main--title">Check Out Your Poll Results</h1>
            <p className="main--input_title">Enter your Poll's Id</p>
            <input
                type = "text"
                placeholder = "61cXXXXXXXXXXXXXXXXXXXXX"
                className = "polling--id"
                name="id"
                onChange={handleChange}
            />
            <button className="polling--button" onClick={getResults}>Get Results!</button>
            <div className="results--display">{display}</div>
        </div>
    )
}
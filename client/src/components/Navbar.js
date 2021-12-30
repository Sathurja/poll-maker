import React from "react"
import {NavLink} from "react-router-dom"


export default function Navbar() {
    return (
        <nav className="header">
            <h3 className="header--title">Poll Maker</h3>
            <ul className="header--list">
                <li className="header--items">
                    <NavLink to="/" className="header--item">Create A Poll</NavLink>
                </li>
                <li className="header--items">
                    <NavLink to="/polling" className="header--item">Answer Poll</NavLink>
                </li>
                <li className="header--items">
                    <NavLink to="/results" className="header--item">Get Results</NavLink>
                </li>
            </ul>
        </nav>
    )
}
import React from "react";
import './css/inputs.css';
import '../App.css';

import Scores from "./elements/Scores";
export default function Stats(){
    

    return(
    <div className="wrapper">
        <div className="table-container">
        <table className="stats">
            <caption>Top 10 </caption>
            <thead>
                <tr><td>Place</td></tr>
                <tr><td>Username</td></tr>
                <tr><td>Turns</td></tr>

            </thead>
            <tbody>
                <Scores/>
            </tbody>
        </table>
        
        </div>
    </div>
        
    )
}
import '../App.css';
import React from "react";
import picture from "../imgs/gem.png"
import pictureback from "../imgs/cover.png"
import picture2 from "../imgs/Fire1.png"
import bg from "../imgs/bg.png"
export default function Home(){

    return(
        <div>
        <div className="header">
           <h2>Zagraj w Magic Match</h2>
         
        </div >
            <div className='animatedCards'>
                <img className='menuCard' src={picture}></img>
                <img className='menuCard delay-0' src={pictureback}></img>
                <img className='menuCard1 delay-1' src={picture2}></img>
            </div>
        </div>
    )
}

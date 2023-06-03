import '../App.css';
import React, { useState } from 'react';
import Logout from './Logout';
import './css/Navbar.css';
import checkToken from "./Token"
export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  return (

    <div className="nav">

      <a className='logo'>Magic Match</a>

      <button onClick={toggleNavigation} className={`navbar-toggler ${isOpen && 'active'}`} type="button">
        <span></span>
        <span></span>
        <span></span>
      </button>

      
      {checkToken()? (
      <div className={`navbar ${isOpen && 'show'}`}>
        <a href="/">Home</a>
        <a href="/Play">Play</a>
        <a href="/Stats">Scoreboard</a>
        <a href="/Profile">Profile</a>
        <Logout/>
      </div>)
      : (
        <div className={`navbar ${isOpen && 'show'}`}>
      <a href="/login">Login</a>
        <a href="/signup">Signup</a>
      </div>
      )}

    </div>  

  );

}






// import '../App.css';
// import React from "react";
// import Logout from './Logout';
// export default function Navbar(){
//     return(
//         <div className="nav">
           
//             <a className='logo'>Magic Match</a>
//             <div className="navbar">
                
//                 <a className="a1" href="/Play"  > Play</a>
//                 <a href="/ "  > Home</a>
//                 <a href="/Stats "  > Scoreboard</a>
//                 <a href="/Profile "  > Profile</a>
//                 <Logout/>
//             </div>
//         </div>
//     )
// }

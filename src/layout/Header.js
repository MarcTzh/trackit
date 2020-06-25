import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";
//for menu logo
import Trackit_logo from '../Images/Trackit_logo.png';

export default function Header() {
  return (
    <header id="header">
    <div>
    <Link to="/">
        <img src={Trackit_logo} 
          alt="Trackit_logo"
          height='60' className="title"/>
      </Link>
        
       <div style ={{display: flex, justifyContent: center}}>
          <AuthOptions/>
        </div> 
    </div>
      
    </header>
  );
}
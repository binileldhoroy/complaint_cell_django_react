import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import Button from '@mui/material/Button';


function Header() {
  return (
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <section class="top-nav">
    <div id="logo">
    <Link to="/">
      Complaint Cell
      </Link>
    </div>
    <input id="menu-toggle" type="checkbox" />
    <label class='menu-button-container' for="menu-toggle">
    <div class='menu-button'></div>
  </label>
    <ul class="menu">
      <li>
      <div className="create-account m-2 d-flex flex-column">
          <p className="text-center mb-0"><AiOutlineUserAdd color='white'/></p>
          <Link to="/signup">
          <Button className="create-btn" size="medium" style={{color:'white'}}>Create Account</Button>
          </Link>
        </div>
      </li>
      <li>
      <div className="create-account m-2 m-2 d-flex flex-column">
        <p className="text-center mb-0"><AiOutlineLogin color='white'/></p>
        <Link to="/login">
        <Button className="create-btn" size="medium" style={{color:'white'}}>Login </Button>
        </Link>
        </div>
      </li>
    </ul>
  </section>

    </div>
  )
}

export default Header
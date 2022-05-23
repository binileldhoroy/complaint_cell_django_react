import React from 'react'
import './Header.css'
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import Button from '@mui/material/Button';


function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark nav-bg">
  <div className="container-fluid">
    <p className="navbar-brand"> Home</p>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
       
      </ul>
        <div className="create-account m-2 d-flex flex-column">
          <p className="text-center mb-0"><AiOutlineUserAdd color='white'/></p>
          <Button className="create-btn" size="medium" style={{color:'white'}}>Create Account</Button>
        </div>
        <div className="create-account m-2 m-2 d-flex flex-column">
        <p className="text-center mb-0"><AiOutlineLogin color='white'/></p>
        <Button className="create-btn" size="medium" style={{color:'white'}}>Login</Button>
        </div>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Header
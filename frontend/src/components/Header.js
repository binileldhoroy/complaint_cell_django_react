import React, {useContext} from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import Button from '@mui/material/Button';
import logo from '../static/images/logo.png'
import avater from '../static/images/avater.jpg'
import {Dropdown, ButtonGroup} from 'react-bootstrap'
import { LoginContext } from '../context/LoginContext';



function Header() {

  const {user,logoutUser} = useContext(LoginContext)

  return (
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <section className="top-nav">
    <div id="logo">
      {
        user ? <Link to="/home">
            <img className="logo_img img-fluid" src={logo} alt="" srcSet="" />
        </Link> :
      
    (<Link to="/">
      <img className="logo_img img-fluid" src={logo} alt="" srcSet="" />
      </Link>)
}
    </div>
    <input id="menu-toggle" type="checkbox" />
    <label className='menu-button-container' htmlFor="menu-toggle">
    <div className='menu-button'></div>
  </label>
  { user ? (
     <ul className="menu">
     <li className='li_menu'>
         <div className="create-account m-2 d-flex flex-column">
            <p className="text-center mb-0"><AiOutlineUserAdd color='white'/>
            <Dropdown as={ButtonGroup}>
              <Button className="drop_down" variant="">{user.username}</Button>

              <Dropdown.Toggle split className="drop_down" id="dropdown-split-basic" />

              <Dropdown.Menu >
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item >
                  <Link to="/myprofile">
                  <Button variant="outline-danger" style={{color:'black'}}>My Profile</Button>
                  </Link>
                  </Dropdown.Item>
                <Dropdown.Item ><Button variant="outline-danger" style={{color:'black'}}  onClick={logoutUser}>Logout</Button></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </p>
          </div>
        </li>
        </ul>
  ): ( 
    <ul className="menu">
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
    )}
  </section>

    </div>
  )
}

export default Header
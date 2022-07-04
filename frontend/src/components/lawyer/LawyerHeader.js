import React, {useContext, useState} from 'react'
import '../Header.css'
import { Link } from 'react-router-dom'
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import Button from '@mui/material/Button';
import logo from '../../static/images/logo.png'
import {Dropdown, ButtonGroup} from 'react-bootstrap'
import { Popover, Typography } from '@mui/material';
import { LoginContext } from '../../context/LoginContext';

const LawyerHeader = () => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {


    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const {user,logoutUser} = useContext(LoginContext)

  return (
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <section className="top-nav lawyer-top-nav">
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
              <Button className="lawyer_drop_down" variant="">{user.username}</Button>

              <Dropdown.Toggle split className="lawyer_drop_down" id="dropdown-split-basic" />

              <Dropdown.Menu >
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item >
                  <Link to="/myprofile">
                  <Button variant="outline-danger" style={{color:'black'}}>My Profile</Button>
                  </Link>
                  </Dropdown.Item>
                <Dropdown.Item ><Button variant="outline-danger" style={{color:'black',backgroundColor:'#ACA59D'}}  onClick={logoutUser}>Logout</Button></Dropdown.Item>
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


          <Button className="create-btn" size="medium" style={{color:'white'}}  aria-describedby={id}  onClick={handleClick}>
        Creat Account
      </Button>
      <Popover
         id={id}
         open={open}
         anchorEl={anchorEl}
         onClose={handleClose}
         anchorOrigin={{
           vertical: 'bottom',
           horizontal: 'left',
         }}
      >
        <Typography sx={{ p: 2 }}>
          <Link to="/signup">
          <Button  size="small">Create User Account</Button><br></br>
          </Link>
          <Link to="/lawyer/signup">
          <Button  size="small">Create Lawyer Account</Button>
          </Link>
        </Typography>
      </Popover>
    
          
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

export default LawyerHeader
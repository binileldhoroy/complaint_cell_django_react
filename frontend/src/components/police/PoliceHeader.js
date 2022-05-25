import React, {useContext} from 'react'
import '../Header.css'
import { Link } from 'react-router-dom'
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import Button from '@mui/material/Button';

const PoliceHeader = () => {
  return (
    <div>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <section className="top-nav">
    <div id="logo">
      {/* {
        user ? <Link to="/home">
            Complaint Cell
        </Link> :
      
    (<Link to="/"> */}
      Complaint Cell
      {/* </Link>)
} */}
    </div>
    <input id="menu-toggle" type="checkbox" />
    <label className='menu-button-container' htmlFor="menu-toggle">
    <div className='menu-button'></div>
  </label>
  {/* { user ? (<p>User</p> ): (  */}
    <ul className="menu">
   <li>
       <div className="create-account m-2 d-flex flex-column">
          <p className="text-center mb-0"><AiOutlineUserAdd color='white'/></p>
          <Link to="/police/signup">
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
    {/* )} */}
  </section>

    </div>
  )
}

export default PoliceHeader
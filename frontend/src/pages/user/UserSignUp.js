import React from 'react'
import './UserSignUp.css'
import {Col,Row} from 'react-bootstrap'
import Header from '../../components/Header';


const UserSignUp = () => {
  return (
    <div  >
     <Header/>


<section id='signupdiv' className="vh-100 bg-image" >
  <div className="mask d-flex align-items-center h-100 gradient-custom-3" >
    <div className="container h-100" >
      <div className="row d-flex justify-content-center align-items-center h-100" >
        <div className="col-12 col-md-9 col-lg-7" >
          <div className="card-content" >
            <div className="card-body" >
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>

              <form id='form'>
              <Row  className='p-3 m-0'>
              <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="text" className="form-control form-control-lg" name='firstname' />
                  <label className="form-label" >First Name</label>
                  {/* <p style={{color:'red'}} >{errors.name?.message}</p> */}
                </div>
            </Col>
            <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="text" className="form-control form-control-lg" name='lastname' />
                  <label className="form-label" >Last Name</label>
                  {/* <p style={{color:'red'}} >{errors.name?.message}</p> */}
                </div>
            </Col>
            
            <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="text" className="form-control form-control-lg" name='username' />
                  <label className="form-label" >Username</label>
                  {/* <p style={{color:'red'}}>{errors.username?.message}{errorMsg}</p> */}
                </div>
            </Col>

            <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="Email" id="form3Example3cg" className="form-control form-control-lg" name='email' />
                  <label className="form-label" >Email</label>
                  {/* <p style={{color:'red'}}>{errors.email?.message}</p> */}
                </div>
            </Col>

            <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="text" id="form3Example3cg" className="form-control form-control-lg" name='phone' />
                  <label className="form-label" >Phone Number</label>
                  {/* <p style={{color:'red'}}>{errors.email?.message}</p> */}
                </div>
            </Col>

                <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="password" id="form3Example4cg" className="form-control form-control-lg" name='password' />
                  <label className="form-label" >Password</label>
                  {/* <p style={{color:'red'}}>{errors.password?.message}</p> */}
                </div>
            </Col>

                <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="password" id="form3Example4cdg" className="form-control form-control-lg" name='repassword' />
                  <label className="form-label" >Repeat your password</label>
                  {/* <p style={{color:'red'}}>{errors.repassword && 'Password should Match!'}</p> */}
                </div>
                </Col>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>
              

                </Row>  
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default UserSignUp
import React, {useContext} from 'react'
import './UserSignUp.css'
import {Col,Row} from 'react-bootstrap'
import Header from '../../components/Header';
import {AuthContext} from '../../context/UserContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import bg1 from '../../static/images/bg1.jpg'



const schema = yup.object().shape({
  firstname: yup.string().required('This field is required!'),
  lastname: yup.string().required('This field is required!'),
  username: yup.string().min(3, "Username should contain 3 characters").required("Userame is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().min(10,'Phone number is not valid').max(10,'Phone number is not valid'),
  password: yup.string().min(8, "Password should contain 8 characters").required("Password is required"),
  repassword: yup.string().oneOf([yup.ref("password"), null]),
});


const UserSignUp = () => {

  const {signUpUser, errorMsg, signUpError} = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <>
    <style>
      {`body {background:url(${bg1})}`}
    </style>
    <div  >
     <Header/>


<section >
  <div className="mask d-flex align-items-center h-100 gradient-custom-3" >
    <div className="container " >
      <div className="row d-flex justify-content-center align-items-center h-100" >
        <div className="col-12 col-md-9 col-lg-7" >
          <div className="card-content" >
            <div className="card-body" >
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>

              <form id='form' onSubmit={handleSubmit(signUpUser)}>
              <Row  className='p-3 m-0'>
              <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="text" {...register('firstname')} className="form-control form-control-lg" name='firstname' />
                  <label className="form-label" >First Name</label>
                  <p style={{color:'red'}} >{errors.firstname?.message}</p>
                </div>
            </Col>
            <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="text" {...register('lastname')} className="form-control form-control-lg" name='lastname' />
                  <label className="form-label" >Last Name</label>
                  <p style={{color:'red'}} >{errors.lastname?.message}</p>
                </div>
            </Col>
            
            <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="text" {...register('username')} className="form-control form-control-lg" name='username' />
                  <label className="form-label" >Username</label>
                  <p style={{color:'red'}}>{errors.username?.message}{errorMsg}{signUpError.username}</p>
                </div>
            </Col>

            <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="Email" {...register('email')} id="form3Example3cg" className="form-control form-control-lg" name='email' />
                  <label className="form-label" >Email</label>
                  <p style={{color:'red'}}>{errors.email?.message}</p>
                </div>
            </Col>

            <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="text" {...register('phone')} id="form3Example3cg" className="form-control form-control-lg" name='phone' />
                  <label className="form-label" >Phone Number</label>
                  <p style={{color:'red'}}>{errors.phone?.message}</p>
                </div>
            </Col>

                <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="password" {...register('password')} id="form3Example4cg" className="form-control form-control-lg" name='password' />
                  <label className="form-label" >Password</label>
                  <p style={{color:'red'}}>{errors.password?.message}{signUpError.password}</p>
                </div>
            </Col>

                <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="password" {...register('repassword')} id="form3Example4cdg" className="form-control form-control-lg" name='repassword' />
                  <label className="form-label" >Repeat your password</label>
                  <p style={{color:'red'}}>{errors.repassword && 'Password should Match!'}</p>
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
    </>
  )
}

export default UserSignUp
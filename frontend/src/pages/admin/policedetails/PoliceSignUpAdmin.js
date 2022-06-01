import React, {useContext} from 'react'
import {Col,Row} from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AdminContext } from '../../../context/AdminContext'


const schema = yup.object().shape({
    officer: yup.string().required('This field is required!'),
    position: yup.string().required('This field is required!'),
    district: yup.string().required('This field is required!'),
    place: yup.string().required('This field is required!'),
    username: yup.string().min(3, "Username should contain 3 characters").required("Userame is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().min(10,'Phone number is not valid').max(10,'Phone number is not valid'),
    password: yup.string().min(8, "Password should contain 8 characters").required("Password is required"),
    repassword: yup.string().oneOf([yup.ref("password"), null]),
  });

const PoliceSignUpAdmin = () => {

    const {signUpPolice, errorMsg, signUpError} = useContext(AdminContext)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      })

  return (
    <>   
    <div>
        <section>
  <div className="mask d-flex align-items-center h-100 gradient-custom-3" >
    <div className="container " >
      <div className="row d-flex justify-content-center align-items-center h-100" >
        <div className="col-12 col-md-9 col-lg-12" >
          <div className="card-content" >
            <div className="card-body" >
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>

              <form 
               onSubmit={handleSubmit(signUpPolice)}
               >
              <Row  className=' m-0'>
              <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="text" {...register('officer')} className="form-control form-control-lg" name='officer' />
                  <label className="form-label" >Officer Incharge</label>
                  <p style={{color:'red'}} >{errors.officer?.message}</p>
                </div>
            </Col>
            <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="text" {...register('position')} className="form-control form-control-lg" name='position' />
                  <label className="form-label" >Officer Position</label>
                  <p style={{color:'red'}} >{errors.position?.message}</p>
                </div>
            </Col>
            
            <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="text" {...register('username')} className="form-control form-control-lg" name='username' />
                  <label className="form-label" >Username</label>
                  <p style={{color:'red'}}>{errors.username?.message}</p>
                </div>
            </Col>

            <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="Email" {...register('email')} id="form3Example3cg4" className="form-control form-control-lg" name='email' />
                  <label className="form-label" >Email</label>
                  <p style={{color:'red'}}>{errors.email?.message}</p>
                </div>
            </Col>

            <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="text" {...register('phone')} id="form3Example3cg1" className="form-control form-control-lg" name='phone' />
                  <label className="form-label" >Phone Number</label>
                  <p style={{color:'red'}}>{errors.phone?.message}</p>
                </div>
            </Col>

            <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="text" {...register('district')} className="form-control form-control-lg" name='district' />
                  <label className="form-label" >District</label>
                  <p style={{color:'red'}}>{errors.district?.message}</p>
                </div>
            </Col>

            <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="text" {...register('place')} className="form-control form-control-lg" name='place' />
                  <label className="form-label" >Place</label>
                  <p style={{color:'red'}}>{errors.place?.message}</p>
                </div>
            </Col>

                <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="password" {...register('password')} id="form3Example4cg3" className="form-control form-control-lg" name='password' />
                  <label className="form-label" >Password</label>
                  <p style={{color:'red'}}>{errors.password?.message}</p>
                </div>
            </Col>

                <Col md={6} className='px-3 '>
                <div className="form-outline ">
                  <input type="password" {...register('repassword')} id="form3Example4cdg2" className="form-control form-control-lg" name='repassword' />
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

export default PoliceSignUpAdmin
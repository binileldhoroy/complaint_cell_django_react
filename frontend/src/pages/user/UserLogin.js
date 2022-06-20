import React, {useContext} from 'react'
import './UserLogin.css'
import Header from '../../components/Header'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { LoginContext } from '../../context/LoginContext'
import { Spinner } from 'react-bootstrap'




const schema =  yup.object().shape({
  username: yup.string().required('This Field is Required'),
  password: yup.string().required('This Field is Required'),
})


const UserLogin = () => {

  const {loginUser,errorMsg,loginLoading} = useContext(LoginContext)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <div>

<Header/>


<div className='d-flex justify-content-center' >
      <section className="d-flex justify-content-center">

    <div className="d-flex align-items-center col-md-6 h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5" style={{border:'1px solid black'}}>

<form style={{width: "50rem"}} onSubmit={handleSubmit(loginUser)}>

  <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Log in</h3>

  <div className="form-outline mb-4">
    <input type="text" {...register('username')} name='username' id="form2Example18" className="form-control form-control-lg"  />
    <label className="form-label" >UserName</label>
    <p style={{color:'red'}} >{errors.username?.message}</p>
  </div>

  <div className="form-outline mb-4">
    <input type="password" {...register('password')} name='password' id="form2Example28"  className="form-control form-control-lg" />
    <label className="form-label" >Password</label>
    <p style={{color:'red'}} >{errors.password?.message}</p>
  </div>

  <div className="pt-1 mb-4">
    <button className="btn btn-info btn-lg btn-block" type="submit">
      {loginLoading === false ?
    <Spinner
    as="span"
    animation="border"
    size="sm"
    role="status"
    aria-hidden="true"
  />
: ''}
      Login</button>
  </div>

  <label className="text-danger">{errorMsg}</label>
</form>

</div>

</section>
</div>



    </div>
  )
}

export default UserLogin


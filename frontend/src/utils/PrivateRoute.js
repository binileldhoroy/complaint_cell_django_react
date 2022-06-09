import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';


//private route for people

export function PrivateRoutePeople({ children }) {


    const { user, userType } = useContext(LoginContext);
    if(user != null) {
      if(userType === 'is_user') {
       return( children)
      }else if(userType === 'is_police'){
        return(

          <Navigate to='/police/home'/>
        )
      }
      else if(userType === 'is_superuser') {
        return(

          <Navigate to='/dashboard'/>
        )
      }else if(userType === 'is_lawyer') {
        return(

          <Navigate to='/lawyer/lawyer-home'/>
        )
      }
  }else{
    return(

      <Navigate to='/login'/>
    )
  }
  }


//private route for police

export function PrivateRoutePolice({ children }) {

    const { user, userType } = useContext(LoginContext);
    console.log(userType);
    if(user != null) {
      if(userType === 'is_police') {
       return( children)
      }else if(userType === 'is_superuser'){
        return(

          <Navigate to='/dashboard'/>
        )
      }
      else if(userType === 'is_user') {
        return(

          <Navigate to='/home'/>
        )
      }else if(userType === 'is_lawyer') {
        return(

          <Navigate to='/lawyer/lawyer-home'/>
        )
      }
  }else{
    return(

      <Navigate to='/login'/>
    )
  }
  }


//private route for lawyer

export function PrivateRouteLawyer({ children }) {

    const { user, userType } = useContext(LoginContext);
    if(user != null) {
      if(userType === 'is_lawyer') {
       return( children)
      }else if(userType === 'is_police'){
        return(

          <Navigate to='/police/home'/>
        )
      }
      else if(userType === 'is_user') {
        return(

          <Navigate to='/home'/>
        )
      }else if(userType === 'is_superuser') {
        return(

          <Navigate to='/dashboard'/>
        )
      }
  }else{
    return(

      <Navigate to='/login'/>
    )
  }
  }


//private route for admin

export function PrivateRouteAdmin({ children }) {

    const { user, userType } = useContext(LoginContext);
    console.log(user);
    console.log(userType);
    if(user != null) {
      if(userType === 'is_superuser') {
       return( children)
      }else if(userType === 'is_police'){
        return(

          <Navigate to='/police/home'/>
        )
      }
      else if(userType === 'is_user') {
        return(

          <Navigate to='/home'/>
        )
      }else if(userType === 'is_lawyer') {
        return(

          <Navigate to='/lawyer/lawyer-home'/>
        )
      }
  }else{
    return(

      <Navigate to='/login'/>
    )
  }
    
  }
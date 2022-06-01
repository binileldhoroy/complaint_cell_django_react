import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

export function PrivateRoutePeople({ children }) {

    const { user } = useContext(LoginContext);
    return user ? children : <Navigate to='/' />;
  }
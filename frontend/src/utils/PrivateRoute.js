import { useContext } from 'react'
import { AuthContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom';

export function PrivateRoutePeople({ children }) {

    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to='/' />;
  }
import {createContext,useState} from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios'
import swal from 'sweetalert'
import {useNavigate} from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])
    const [userEdit,setUserEdit] = useState([])
    const [errorMsg,setErrorMsg] = useState('')

    const navagat = useNavigate()

    const loginUser = async ({username,password}) => {
        await axios.post('http://127.0.0.1:8000/api/token/',{
            'username':username,
            'password': password
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    } 

    const contextData = {
        loginUser
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
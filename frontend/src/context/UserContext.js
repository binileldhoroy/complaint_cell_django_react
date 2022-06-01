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
    const [signUpError, setSignUpError] = useState([])
    const [users, setUsers] = useState([])
    const [userType, setUserType] = useState()
    const [userEdit,setUserEdit] = useState([])
    const [errorMsg,setErrorMsg] = useState('')

    const navagat = useNavigate()

    const baseUrl = 'http://127.0.0.1:8000/api/'
    // ueserLogin


    const signUpUser = async (e) => {
        await axios.post(`${baseUrl}signup/`,{
            'first_name': e.firstname,
            'last_name': e.lastname,
            'username': e.username,
            'email': e.email,
            'phone': e.phone,
            'password': e.password,
            'password2': e.repassword,
        }).then(res => {
            console.log(res.response.data);
        }).catch(err => {
            setSignUpError(err.response.data);
        })

    }

    const contextData = {
        // loginUser,
        // user,
        errorMsg,
        signUpUser,
        signUpError,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
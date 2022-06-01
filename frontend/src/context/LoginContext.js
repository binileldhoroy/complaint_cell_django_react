import {createContext,useState} from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios'
import swal from 'sweetalert'
import {useNavigate} from 'react-router-dom'


export const LoginContext = createContext()


export const LoginProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(true)
    const [errorMsg,setErrorMsg] = useState('')

    const navagat = useNavigate()

    const baseUrl = 'http://127.0.0.1:8000/api/'
    // ueserLogin

    const loginUser = async (e) => {
        await axios.post(`${baseUrl}token/`,{
            'username':e.username,
            'password': e.password
        }).then(res => {
            console.log(res.data);
            const userType = (jwt_decode(res.data.access).type)
            if (userType === 'is_user'){
                setAuthTokens(res.data);
                setUser(jwt_decode(res.data.access))
                localStorage.setItem('authTokens',JSON.stringify(res.data))
                navagat('/home')
            }else if(userType === 'is_lawyer'){
                setAuthTokens(res.data);
                setUser(jwt_decode(res.data.access))
                localStorage.setItem('authTokens',JSON.stringify(res.data))
                navagat('/lawyer/lawyer-home')
            }else if(userType === 'is_police'){
                setAuthTokens(res.data);
                setUser(jwt_decode(res.data.access))
                localStorage.setItem('authTokens',JSON.stringify(res.data))
                navagat('/police/home')
            }else if(userType === 'is_superuser'){
                setAuthTokens(res.data);
                setUser(jwt_decode(res.data.access))
                localStorage.setItem('authTokens',JSON.stringify(res.data))
                navagat('/dashboard')
            }
        }).catch(err => {
            console.log(err.response.data.detail);
            setErrorMsg(err.response.data.detail)
        })
    } 


    const logoutUser = () => {

        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to leave this page?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              
              swal("You successfully Logout", {
                icon: "success",
              });
                setAuthTokens(null)
                setUser(null)
                localStorage.removeItem('authTokens')
                navagat('/login')
            } 
          })
        }


    const loginContextData = {
        loginUser,
        user,
        logoutUser,
        authTokens
    }

    return (
        <LoginContext.Provider value = {loginContextData}>
            {children}
        </LoginContext.Provider>
    )

}
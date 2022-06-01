import {createContext,useState} from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import {useNavigate} from 'react-router-dom'

export const PoliceContext = createContext()

export const PoliceProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [signUpError, setSignUpError] = useState([])
    const [errorMsg,setErrorMsg] = useState('')

    const navagat = useNavigate()

    const baseUrl = 'http://127.0.0.1:8000/api/police/'
 

    const signUpPolice = async (e) => {
        await axios.post(`${baseUrl}police-signup/`,{
            'email': e.email,
            'username': e.username,
            'officer_incharge': e.officer,
            'officer_position': e.position,
            'phone':e.phone,
            'ps_district': e.district,
            'ps_place': e.place,
            'password': e.password,
            'password2': e.repassword,
        }).then(res => {
            console.log(res);
            navagat('/login')
        }).catch(err => {
            setSignUpError(err);
        })
    }

    const contextData = {
        errorMsg,
        signUpPolice,
        signUpError,
    }

    return(
        <PoliceContext.Provider value={contextData}>
            {children}
        </PoliceContext.Provider>
    )
}
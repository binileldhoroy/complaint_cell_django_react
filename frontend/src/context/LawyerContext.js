import {createContext,useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const LawyerContext = createContext()


export const LawyerProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [signUpError, setSignUpError] = useState([])
    const [errorMsg,setErrorMsg] = useState('')

    const navagat = useNavigate()

    const baseUrl = 'http://127.0.0.1:8000/api/lawyer/'


    const signUpLawyer = async (e) => {
        await axios.post(`${baseUrl}lawyer-signup/`,{
            'first_name':e.firstname,
            'last_name':e.lastname,
            'username':e.username,
            'email':e.email,
            'enrollment_number':e.enroll,
            'phone':e.phone,
            'password':e.password,
            'password2':e.repassword,
            'lawyer_image':e.profile,
        },
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
        ).then( res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
            setSignUpError(err.response.data);
        })
    }

    const contextData = {
        signUpLawyer,
        errorMsg,
        signUpError,
    }

    return(
        <LawyerContext.Provider value={contextData}>
            {children}
        </LawyerContext.Provider>
    )
 
}
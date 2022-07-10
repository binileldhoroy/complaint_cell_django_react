import {createContext,useState} from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios'
import swal from 'sweetalert'
import {useNavigate} from 'react-router-dom'
import {  toast } from 'react-toastify'


export const LoginContext = createContext()


export const LoginProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [loginLoading, setLoginLoading] = useState(true)
    const [errorMsg,setErrorMsg] = useState('')
    const [userType,setUserType] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access).type : null)
    const [policeDistrict,setPoliceDistrict] = useState([])
    const [policeStation,setPoliceStation] = useState([])
    const [otpBtn,setOtpBtn] = useState(true)
    const [otpVerify,setOtpVerify] = useState(false)
    const [doneOtp,setDoneOtp] = useState(false)
    const [singnUpLoading,setSignUpLoading] = useState(false)
    const [errorOtp,setErrorOtp] = useState(false)
    const [verifyBtn,setVerifyBtn] = useState(true)

    const navagat = useNavigate()

    const baseUrl = 'http://127.0.0.1:8000/api/'


    const toastWarning = (msg) => {
        toast.warn(msg, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }

    const toastError = (msg) => {
        toast.error(msg, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }

    const toastSuccess = (msg) => {
        toast.success(msg, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }


    // ueserLogin

    const loginUser = async (e) => {
        setLoginLoading(false)
        await axios.post(`${baseUrl}token/`,{
            'username':e.username,
            'password': e.password
        }).then(res => {
            console.log(res.data);
            const type = jwt_decode(res.data.access).type
            setUserType(jwt_decode(res.data.access).type)
            if (type === 'is_user'){
                setAuthTokens(res.data);
                setUser(jwt_decode(res.data.access))
                localStorage.setItem('authTokens',JSON.stringify(res.data))
                setLoginLoading(true)
                navagat('/home')
            }else if(type === 'is_lawyer'){
                setAuthTokens(res.data);
                setUser(jwt_decode(res.data.access))
                localStorage.setItem('authTokens',JSON.stringify(res.data))
                setLoginLoading(true)
                navagat('/lawyer/lawyer-home')
            }else if(type === 'is_police'){
                setAuthTokens(res.data);
                setUser(jwt_decode(res.data.access))
                localStorage.setItem('authTokens',JSON.stringify(res.data))
                setLoginLoading(true)
                navagat('/police/home')
            }else if(type === 'is_superuser'){
                setAuthTokens(res.data);
                setUser(jwt_decode(res.data.access))
                localStorage.setItem('authTokens',JSON.stringify(res.data))
                setLoginLoading(true)
                navagat('/dashboard')
            }
        }).catch(err => {
            
            console.log(err.response.data);
            setErrorMsg(err.response.data.detail)
            setLoginLoading(true)
            toastWarning('invalid username or password')      
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
                setUserType('')
                localStorage.removeItem('authTokens')
                navagat('/login')
            } 
          })
        }

    const getPoliceDistrict = async () => {
        await axios.get(`${baseUrl}police-district/`,{}).then(res => {
            console.log(res.data);
            setPoliceDistrict(res.data)
        }).catch(err => {
            console.log(err.data);
        })
    }


    const getPoliceStation = async (id) => {
        await axios.get(`${baseUrl}police-station/${id}`,{}).then(res => {
            console.log(res.data);
            setPoliceStation(res.data)
        }).catch(err => {
            console.log(err.data);
        })
    }

    const sendOtp = async (phone) => {
        if (phone === null || phone.length !== 10){
            swal("Enter a valide number", {
                icon: "error",
              });
        }else{
        setSignUpLoading(true)
        await axios.post(`${baseUrl}send-otp/`,{
            'mobile_no':phone
        }).then(res => {
            console.log(res.data);
            setOtpBtn(false)
            setSignUpLoading(false)
            swal("OTP Sent", {
                icon: "success",
              });
        }).catch(err => {
            console.log(err.data);
            setSignUpLoading(false)
            swal("OTP Not Sent", {
                icon: "error",
              });
        })
    }
    }

    const verifyOtp = async (otp,phone) => {
        setSignUpLoading(true)
        await axios.post(`${baseUrl}otp-verify/`,{
            'otp':otp,
            'mobile_no':phone,
        }).then(res => {
            if(res.data === 'approved'){
                setSignUpLoading(false)
                setOtpVerify(true)
                setOtpBtn(false)
                setDoneOtp(true)
                setErrorOtp(false)
                setVerifyBtn(false)
            }else if(res.data ==='pending'){
                setSignUpLoading(false)
                setDoneOtp(false)
                setErrorOtp(true)
            }
            })
    }

    


    const loginContextData = {
        loginUser,
        user,
        logoutUser,
        authTokens,
        userType,
        getPoliceDistrict,
        policeDistrict,
        policeStation,
        getPoliceStation,
        loginLoading,
        sendOtp,
        otpBtn,
        otpVerify,
        verifyOtp,
        doneOtp,
        singnUpLoading,
        errorOtp,
        verifyBtn,
        toastWarning,   
        toastError,
        toastSuccess,
    }

    return (
            <LoginContext.Provider value = {loginContextData}>
            {children}
            </LoginContext.Provider>
    )

}
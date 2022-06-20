import {createContext,useContext,useState} from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios'
import swal from 'sweetalert'
import {useNavigate} from 'react-router-dom'
import { LoginContext } from './LoginContext';

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    // const [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    // const [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [pinLoading, setPinLoading] = useState(false)
    const [signUpError, setSignUpError] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [userType, setUserType] = useState()
    const [userEdit,setUserEdit] = useState([])
    const [errorMsg,setErrorMsg] = useState('')
    const [myComplaints,setMyComplaints] = useState([])
    const [pincodeDetails,setPincodeDetails] = useState([])
    const [profileLoader,setProfileLoader] = useState(false)
    



    const navigate = useNavigate()

    const baseUrl = 'http://127.0.0.1:8000/api/'
    // ueserLogin
    const {logoutUser,authTokens} = useContext(LoginContext)

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
            navigate('/login')
            swal("Register Successfully", {
                icon: "success",
              });
        }).catch(err => {
            setSignUpError(err.response.data);
        })

    }


    const userProfile = async () => {
        await axios.get(`${baseUrl}profile/`,{
            headers: {
                Authorization: `Bearer ${authTokens.access}`
              }
        }).then(res => {
            console.log(res.data);
            setUserInfo(res.data)
        }).catch(err => {
            console.log(err);
        })
    }

    const updateUserProfile = async (e) => {
        console.log('hh');
        await axios.post(`${baseUrl}personalinfo/`,{
            'dob': e.dob,
            'gender': e.gender,
            'relative_name': e.relative,
            'relative_type':e.relation_type,
            'proof_type': e.id_type,
            'proof_number':e.id_number,
            'house_name':e.house_name,
            'house_number':e.house_no,
            'street':e.street,
            'locality':e.locality,
            'pin_code':e.pincode,
            'village':e.village,
            'country':e.country,
            'state':e.state,
            'police_district':e.ps_district,
            'police_station':e.ps_station,


        },{
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        }).then(res => {
            console.log(res.data);
            navigate('/home')
        }).catch(err => {
            console.log(err);
        })
    }

    const getMyComplaints = async () => {
        await axios.get(`${baseUrl}my-complaints/`,{
            headers: {
                Authorization: `Bearer ${authTokens.access}`
              }
        }).then(res => {
            console.log(res.data);
            setMyComplaints(res.data)
        }).catch(err => {
            console.log(err);
        })
    }

    const searchPostOffice = async (pin) => {
        setPinLoading(true)
        await axios.get(`https://api.postalpincode.in/pincode/${pin}`,{}).then(res => {
            console.log(res.data[0].PostOffice);
            setPincodeDetails(res.data[0].PostOffice)
            setPinLoading(false)
        }).catch(err => {
            console.log(err);
        })
    }

    const [fileDescription, setFileDescription] = useState('');
    const [file, setFile] = useState();
    const [descError, setDescError] = useState('')
    const [attachError,setAttachError] = useState('')
    const [complaintDate,setComplaintDate] = useState('')
    const [complaintSuccess,setComplaintSuccess] = useState(false)
    const [complaintResponce,setComplaintResponce] = useState('')
    const [complaintLoader,setComplaintLoader] = useState(false)

    const complaintRegister = async (e) => {
        setComplaintLoader(true)
        if(fileDescription === '' && file === undefined){
            setAttachError('Please attach file')
        }else{
            axios.post(`${baseUrl}newcomplaint/`,{
                'complaint_nature': e.complaint,
                'incident_place': e.place,
                'police_district': e.psdistrict,
                'police_place': e.psstation,
                'incident_date': complaintDate,
                'file_discription': fileDescription,
                'file_upload': file,
                'compalaint_description': e.description,


            },{
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                    'Content-Type': 'multipart/form-data',
                }
            }).then(res => {
                console.log(res.data);
                setComplaintSuccess(true)
                setComplaintResponce(res.data)
                setFileDescription('')
                setFile()
                setComplaintDate('')
                setComplaintLoader(false)
                navigate('/register')
            }).catch(err => {
                console.log(err);
                setComplaintLoader(false)
            })
        }
    }

    const contextData = {
        errorMsg,
        signUpUser,
        signUpError,
        userProfile,
        userInfo,
        updateUserProfile,
        getMyComplaints,
        myComplaints,
        searchPostOffice,
        pincodeDetails,
        pinLoading,
        setFileDescription,
        fileDescription,
        setFile,
        file,
        complaintRegister,
        descError,
        setDescError,
        attachError,
        setComplaintDate,
        setAttachError,
        complaintSuccess,
        setComplaintSuccess,
        complaintResponce,
        complaintLoader,
        
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
import {createContext,useContext,useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './LoginContext';


export const AdminContext = createContext()



export const AdminProvider = ({children}) => {
    const [lawyerLoading, setLawyerLoading] = useState(true)
    const [errorMsg,setErrorMsg] = useState('')
    const [users, setUsers] = useState([])
    const [lawyers, setLawyer] = useState([])
    const [activeLawyers, setActiveLawyer] = useState([])
    const [lawyerProfile, setLawyerProfile] = useState([])
    const [policeInfo, setPoliceInfo] = useState([])
    const [signUpError, setSignUpError] = useState([])



    const navagat = useNavigate()

    const baseUrl = 'http://127.0.0.1:8000/api/dashboard/'

    const {authTokens} = useContext(LoginContext)

    const getUsers = async () => {
        await axios.get(`${baseUrl}user-details/`,{
            headers: {
              Authorization: `Bearer ${authTokens.access}`
            }
          }).then(res => {
            console.log(res.data);
            setUsers(res.data)
          }).catch(err => {
              console.log(err);
          })
        }


    const blockUser = async (e) => {
        const userId = e.target.value
        await axios.post(`${baseUrl}block-user/${userId}`,{
            'action':'block'
        },{
            headers: {
                Authorization: `Bearer ${authTokens.access}`
              }
        }).then(response => {
            getUsers()
            console.log(response.data);
        })

    }

    const unblockUser = async (e) => {
        const userId = e.target.value
        console.log(userId);
        await axios.post(`${baseUrl}block-user/${userId}`,{
            'action':'unblock'
        },{
            headers: {
                Authorization: `Bearer ${authTokens.access}`
              }
        }).then(res => {
            getUsers()
            console.log(res.data);
        })
    }


    const getLawyers = async () => {
        await axios.get(`${baseUrl}lawyer-details/`,{
            headers: {
                Authorization: `Bearer ${authTokens.access}`
              }
        }).then(res => {
            console.log(res.data);
            setLawyer(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const getLawyerProfile = async (lawyerId) => {
        await axios.get(`${baseUrl}lawyer-info/${lawyerId}`,{
            headers: {
                Authorization: `Bearer ${authTokens.access}`
              }
        }).then(res => {
            console.log(res.data);
            setLawyerProfile(res.data)
        }).catch(err => {
            console.log(err)
        })
    }


    const hireLawyer = async (lawyerId) => {
        await axios.get(`${baseUrl}hire-lawyer/${lawyerId}`,{
            headers: {
                Authorization: `Bearer ${authTokens.access}`
              }
        }).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err)
        })
    }

    const signUpPolice = async (e) => {
        setLawyerLoading(false)
        await axios.post(`http://127.0.0.1:8000/api/police/police-signup/`,{
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
            setLawyerLoading(true)
            navagat('/dashboard/police-list')
        }).catch(err => {
            setSignUpError(err);
        })
    }

    const getActiveLawyers = async () => {
        setLawyerLoading(false)
        await axios.get(`${baseUrl}hired-lawyers/`,{
            headers: {
                Authorization: `Bearer ${authTokens.access}`
              }
        }).then(res => {
            console.log(res.data);
            setActiveLawyer(res.data)
            setLawyerLoading(true)
        }).catch(err => {
            console.log(err);
        })
    }


    const getPoliceStation = async () => {
        await axios.get(`${baseUrl}police-station/`,{
            headers: {
                Authorization: `Bearer ${authTokens.access}`
              }
        }).then(res => {
            console.log(res.data);
            setPoliceInfo(res.data)
        }).catch(err => {
            console.log(err);
        })
    }

    const contextData = {
        getUsers,
        users,
        blockUser,
        unblockUser,
        getLawyers,
        lawyers,
        lawyerProfile,
        getLawyerProfile,
        hireLawyer,
        signUpPolice,
        activeLawyers,
        getActiveLawyers,
        getPoliceStation,
        policeInfo,
        lawyerLoading
    }

    return(
        <AdminContext.Provider value={contextData}>
            {children}
        </AdminContext.Provider>
    )
 
}
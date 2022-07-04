import {createContext,useContext,useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { LoginContext } from './LoginContext';


export const LawyerContext = createContext()


export const LawyerProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [signUpError, setSignUpError] = useState([])
    const [errorMsg,setErrorMsg] = useState('')
    const [lawyerCases,setLawyerCases] = useState([])
    const [singleCase,setSingleCase] = useState([])

    const navagat = useNavigate()
    const { authTokens,toastSuccess } = useContext(LoginContext);


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
            'lawyer_image':e.profile[0],
        },
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
        ).then( res => {
            console.log(res);
            navagat('/login')
            swal("Register Successfully", {
                icon: "success",

            })
        }).catch(err => {
            console.log(err);
            setSignUpError(err.response.data);
        })
    }

    const [acceptCaseCount,setAcceptCaseCount] = useState(0)
    const lawyerAssignedComplaints = async () => {
        await axios.get(`${baseUrl}requested-complaints/`,{
            headers: {
                Authorization: `Bearer ${authTokens.access}`,
            }
        }).then(res => {
          console.log(res.data);
          setAcceptCaseCount(res.data.accept_count)
          setLawyerCases(res.data.data)
        }).catch(err => {
            console.log(err);
        })
    }

    const getSingleComplaint = async (id) => {
        await axios.get(`${baseUrl}requested-complaint/${id}`, {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          }
        }).then((res) => {
          console.log(res.data);
          setSingleCase(res.data);
        }).catch((err) => {
          console.log(err);
        })
      }

    const [complaintNotes, setComplaintNotes] = useState([]);
  const getNotes = async (id) => {
    console.log(id,"aasdasdasas");
    await axios
      .get(`${baseUrl}notes/${id}`, {
        headers: {
            Authorization: `Bearer ${authTokens.access}`,
        }
      }).then((res) => {
        console.log(res.data);
        setComplaintNotes(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }


  const lawyerCaseAccept = async (id,fee,complaint_id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to accept this case?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        
    axios.post(`${baseUrl}accept-case/`, {
        'people':id,
        'amount':fee,
        'complaint':complaint_id,
        'payment_type':'Razorpay',

    },{
        headers: {
            Authorization: `Bearer ${authTokens.access}`,
        }
    }).then(res => {
        console.log(res.data);
        toastSuccess("Case Accepted")
        navagat('/lawyer/lawyer-home')
        
    }).catch(err => {
        console.log(err);
    })
  }})
  }

    const contextData = {
        signUpLawyer,
        errorMsg,
        signUpError,
        lawyerAssignedComplaints,
        lawyerCases,
        singleCase,
        getSingleComplaint,complaintNotes,getNotes,
        lawyerCaseAccept,
        acceptCaseCount,
    }

    return(
        <LawyerContext.Provider value={contextData}>
            {children}
        </LawyerContext.Provider>
    )
 
}
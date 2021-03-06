import { createContext, useContext, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginContext";

export const PoliceContext = createContext();

export const PoliceProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [signUpError, setSignUpError] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [newcomplaints, setNewComplaints] = useState([]);
  const [viewComplaint, setViewComplaint] = useState([]);
  const [viewAcceptedComplaint, setAcceptedComplaint] = useState([]);
  const [completedComplaints, setCompletedComplaints] = useState([]);

  const navigate = useNavigate();

  const baseUrl = "http://127.0.0.1:8000/api/police/";
  const { authTokens,toastError,toastSuccess } = useContext(LoginContext);

  const signUpPolice = async (e) => {
    await axios
      .post(`${baseUrl}police-signup/`, {
        email: e.email,
        username: e.username,
        officer_incharge: e.officer,
        officer_position: e.position,
        phone: e.phone,
        ps_district: e.district,
        ps_place: e.place,
        password: e.password,
        password2: e.repassword,
      })
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        toastError(err.response.data);
      });
  };

  const getNewcomplaints = async () => {
    await axios
      .get(`${baseUrl}complaints/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setNewComplaints(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getViewComplaint = async (id) => {
    await axios
      .get(`${baseUrl}complaint/${id}`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setViewComplaint(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getViewComplaintModal = async (id) => {
    await axios
      .get(`${baseUrl}complaint/${id}`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setViewComplaint(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const acceptComplaint = async (id) => {
    await axios
      .get(`${baseUrl}accept-complaint/${id}`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toastSuccess("Complaint Accepted");
        navigate("/police/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAcceptedComplaint = async () => {
    await axios
      .get(`${baseUrl}accepted-complaints/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAcceptedComplaint(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const acceptedSingleComplaint = async (id) => {
    await axios
      .get(`${baseUrl}complaint/${id}`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setViewComplaint(res.data);
        // navigate(`/police/viewaccepted/${id}`)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fileFir = async (id) => {
    await axios
      .get(`${baseUrl}file-fir/${id}`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toastSuccess("Fir filed");
        navigate("/police/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCompletedComplaints = async () => {
    await axios
      .get(`${baseUrl}completed-complaints/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCompletedComplaints(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const addNote = async (id, note) => {
    await axios
      .post(
        `${baseUrl}add-note/${id}`,
        {
          note: note,
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toastSuccess("Note added");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [complaintNotes, setComplaintNotes] = useState([]);
  const getNotes = async (id) => {
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

  const contextData = {
    errorMsg,
    signUpPolice,
    signUpError,
    getNewcomplaints,
    newcomplaints,
    getViewComplaint,
    viewComplaint,
    acceptComplaint,
    getAcceptedComplaint,
    viewAcceptedComplaint,
    acceptedSingleComplaint,
    fileFir,
    completedComplaints,
    getCompletedComplaints,
    getViewComplaintModal,
    addNote,
    getNotes,
    complaintNotes,
  };

  return (
    <PoliceContext.Provider value={contextData}>
      {children}
    </PoliceContext.Provider>
  );
};

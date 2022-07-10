import { Backdrop, Button, CircularProgress } from "@mui/material";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { LoginContext } from "../../../context/LoginContext";
import { AuthContext } from "../../../context/UserContext";
import paymentSuccess from '../../../static/gif/paymentsuccess.gif'
import './Payment.css'

function PaymentRazorpay() {
  
  const {baseUrl,complaintId,amount,userProfile,userInfo} = useContext(AuthContext)
  const {user,toastError,toastSuccess} = useContext(LoginContext)
  const [paymentLoader,setPaymentLoader] = useState(false)
  const navigate = useNavigate()

  const paymentFn = async () => {
    await userProfile()
   
  }
  useEffect(() => {
    paymentFn()
  },[])

  useEffect(() => {
    console.log('entered',amount[2]);
    if(amount.length < 1 || amount[2] === null){
      navigate('/payment')

    }
  },[amount])

// this function will handel payment when user submit his/her money
// and it will confim if payment is successfull or not
  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));

      await Axios({
        url: `${baseUrl}payment/success/`,
        method: "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("Everything is OK!");
          console.log(res.data);
          if(res.data.status === "true"){
            toastSuccess("Payment Successful")
            setPaymentLoader(true)
          }else if (res.data.status === "false"){
            toastError("Payment Failed")
            navigate('/payment')
          }
        })
        .catch((err) => {
          console.log(err);
          toastError("Something went wrong!");

        });
    } catch (error) {
      console.log(console.error());
      toastError("Something went wrong!");
    }
  };

  // this will load a script tag which will open up Razorpay payment card to make //transactions
  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const showRazorpay = async () => {
    const res = await loadScript();

    let bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data
    bodyData.append("amount", amount[0].toString());
    bodyData.append("name", user.username);
    bodyData.append("complaint_id", complaintId.toString());

    const data = await Axios({
      url: `${baseUrl}pay/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: bodyData,
    }).then((res) => {
      return res;
    });

    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user

    var options = {
      key_id: process.env.REACT_APP_PUBLIC_KEY, // in react your environment variable must start with REACT_APP_
      key_secret: process.env.REACT_APP_SECRET_KEY,
      amount: data.data.payment.amount,
      currency: "INR",
      name: user.username,
      description: "Test teansaction",
      image: "", // add image url
      order_id: data.data.payment.id,
      handler: function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
        handlePaymentSuccess(response);
      },
      prefill: {
        name: user.username,
        email: userInfo.people?.people.email,
        contact: userInfo.people?.phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <Header/>
<div className="d-flex justify-content-center" style={{ marginTop: "10vh" }}>

    <h2>{paymentLoader ? 'Confirm Payment': 'Payment Success'}</h2>
</div>
{paymentLoader ? (
      <div className="d-flex justify-content-center ">
        <img src={paymentSuccess} onClick={() => {
          navigate('/home')
        }} alt="" className="img-fluid payment_gif" />
      </div>
) :
    <div className="container" >
<div className="success_table mx-5">
<Table className='success_table_view' bordered >

    <tbody>
    <tr>
        <td>Reference Number</td>
        <td className='success_text'>
        {amount[2]}

        </td>
    </tr>
    <tr>
        <td>UserName</td>
        <td className='success_text'>
        {user.username}
        </td>
    </tr>
    <tr>
        <td>Email</td>
        <td className='success_text'>
        {userInfo.people?.people.email}
        </td>
    </tr>
    <tr>
        <td>Amount</td>
        <td className='success_text'>
          {amount[0]}{' ₹'}
        </td>
    </tr>
    </tbody>
</Table>

</div>
<div className="d-flex justify-content-center">
<Button className="me-3" onClick={() => {
  navigate("/payment")
}} variant="outlined" color="error">
  Cancel
</Button>
<Button onClick={showRazorpay} variant="contained" color="success" >
Proceed To Pay
      </Button>
</div>

    </div>
}
      </>
  );
}

export default PaymentRazorpay;
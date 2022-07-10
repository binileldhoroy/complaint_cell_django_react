import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import Header from '../../../components/Header'
import SpinnerLoader from '../../../components/loader/SpinnerLoader'
import { AuthContext } from '../../../context/UserContext'
import PaymentIcon from '@mui/icons-material/Payment';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const MyPayments = () => {

    const {getMyPayments,myPayments,setComplaintId,setAmount,myCompletedPayments,
      getMyCompletedPayments} = useContext(AuthContext)
    const [myPayLoader,setMyPayLoader] = useState(true)
    const navigate = useNavigate()

    const myPayFn = async () => {
        setMyPayLoader(true)
        await getMyPayments()
        await getMyCompletedPayments()
        setMyPayLoader(false)
    }

    useEffect(() => {
        myPayFn()
    },[])


    

    const toPayment = (id,amd,ref) => {
      setComplaintId(id)
      setAmount(() => [amd,id,ref,'true'])
      navigate('/makepayment')
    }
    const [value, setValue] = useState(0);


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
    <div>
        <Header/>
        {myPayLoader ? <SpinnerLoader/> :
        (<div className='container mt-4'>
            <h3>My Payment Request</h3>
            <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Pending Details" {...a11yProps(0)} />
          <Tab label="Completed Details" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel  value={value} index={0}>
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>Case No.</th>
          <th>Lawyer Name</th>
          <th>Complaint</th>
          <th>Station Name</th>
          <th>Accepted Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {myPayments && myPayments.map((item,index) => {
            return (
                <tr key={index}>
                    <td>{item.getcomplaint.complaint.ref_number}</td>
                    <td>
                    {item.lawyerinfo.lawyer.first_name}{''} {item.lawyerinfo.lawyer.last_name}
                    </td>
                    <td>{item.getcomplaint.complaint.complaint_nature}</td>
                    <td>{item.getcomplaint.complaint.police_place}</td>
                    <td>{item.date}</td>
                    <td>{item.amount}</td>
                    <td>
                    <Button variant="contained" onClick={() => toPayment(item.complaint,item.amount,item.getcomplaint.complaint.ref_number)} endIcon={<PaymentIcon/>}>
                    Pay Now
                    </Button>
                    </td>
                </tr>
            )
        })}
      </tbody>
    </Table>

    </TabPanel>
      <TabPanel value={value} index={1}>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Case No.</th>
          <th>Lawyer Name</th>
          <th>Complaint</th>
          <th>Station Name</th>
          <th>Accepted Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {myCompletedPayments && myCompletedPayments.map((item,index) => {
            return (
                <tr key={index}>
                    <td>{item.getcomplaint.complaint.ref_number}</td>
                    <td>
                    {item.lawyerinfo.lawyer.first_name}{''} {item.lawyerinfo.lawyer.last_name}
                    </td>
                    <td>{item.getcomplaint.complaint.complaint_nature}</td>
                    <td>{item.getcomplaint.complaint.police_place}</td>
                    <td>{item.date}</td>
                    <td>{item.amount}</td>
                    <td style={{color:'green'}}>
                    {item.payment_status}
                    </td>
                </tr>
            )
        })}
      </tbody>
    </Table>
      </TabPanel>
    </Box>
        </div>)
        }
    </div>
  )
}

export default MyPayments
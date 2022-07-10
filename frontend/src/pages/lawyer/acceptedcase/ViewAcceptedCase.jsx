import React, { useContext,useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import LawyerHeader from '../../../components/lawyer/LawyerHeader'
import { LawyerContext } from '../../../context/LawyerContext'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



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


const ViewAcceptedCase = () => {
  const {getLawyerAccepedCases,acceptedDetails} = useContext(LawyerContext)
  const [pendingPayment, setPendingPayment] = useState([]);
  const [completedPayment, setCompletedPayment] = useState([]);
  useEffect(() => {
    getLawyerAccepedCases()
  },[])

  useEffect(() => {
    acceptedDetails && setPendingPayment(acceptedDetails.filter(accept => accept.payment_status === 'pending'))
    acceptedDetails && setCompletedPayment(acceptedDetails.filter(accept => accept.payment_status === 'completed'))
  },[acceptedDetails])
  const [value, setValue] = useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
        <LawyerHeader/>
        <div className='container mt-4'>
        <h4>Payment Details</h4>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Pending Details" {...a11yProps(0)} />
          <Tab label="Completed Details" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Case No.</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Payment Status</th>
        </tr>
      </thead>
      <tbody>
        {pendingPayment && pendingPayment.map((pending,index) => {
          return(
            <tr key={index}>
              <td>{pending.getcomplaint.complaint.ref_number}</td>
              <td>{pending.getcomplaint.complaint.people.people.first_name}</td>
              <td>{pending.getcomplaint.complaint.people.people.username}</td>
              <td>{pending.getcomplaint.complaint.people.people.email}</td>
              <td>{pending.amount}</td>
              <td>{pending.date}</td>
              <td>{pending.payment_status}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>

      </TabPanel>
      <TabPanel value={value} index={1}>
      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Case No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Amount</th>
          <th>Payment Status</th>
        </tr>
      </thead>
      <tbody>
      {completedPayment && completedPayment.map((completed,index) => {
          return(
            <tr key={index}>
              <td>{completed.getcomplaint.complaint.ref_number}</td>
              <td>{completed.getcomplaint.complaint.people.people.first_name}</td>
              <td>{completed.getcomplaint.complaint.people.people.username}</td>
              <td>{completed.getcomplaint.complaint.people.people.email}</td>
              <td>{completed.amount}</td>
              <td>{completed.date}</td>
              <td>{completed.payment_status}</td>
            </tr>
          )
        })}
        {completedPayment.length === 0 && <tr><td colSpan='6'>No Data Found</td></tr>}
      </tbody>
    </Table>
 
      </TabPanel>
    </Box>
        </div>
    </div>
  )
}

export default ViewAcceptedCase


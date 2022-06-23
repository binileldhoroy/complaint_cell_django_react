import React, { useContext } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './Success.css'
import { Button, Table } from 'react-bootstrap';
import { AuthContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {

    const navagat = useNavigate()
    const {complaintResponce,setComplaintSuccess} = useContext(AuthContext)
  return (
    <>
        <div className="container mt-2 mb-2">
            <div className="complete">
                <CheckCircleIcon className='done_icone' />
            </div>
            <h2 className='head_text' >Complaint registered successfully</h2>
            <div className="success_table mx-5">

            <Table className='success_table_view' bordered >

                <tbody>
                <tr>
                    <td>Reference Number</td>
                    <td className='success_text'>
                        {complaintResponce && complaintResponce.responce.ref_number}

                    </td>
                </tr>
                <tr>
                    <td>Petitioner Name</td>
                    <td className='success_text'>
                    {complaintResponce.profile.first_name} {complaintResponce.profile.last_name}
                    </td>
                </tr>
                <tr>
                    <td>Registered date</td>
                    <td className='success_text'>
                        {complaintResponce && (complaintResponce.responce.requested_date).slice(0,10) +' '+(complaintResponce.responce.requested_date).slice(11,19)}
                    </td>
                </tr>
                </tbody>
            </Table>

            </div>
            <div className="btn_div">
            <Button className='success_btn' onClick={
                () => {
                    navagat('/home')
                    setComplaintSuccess(false)
                }
            } variant="outline-success">Click here</Button>{'to continue '}
            </div>
        </div>
    </>
  )
}

export default SuccessPage
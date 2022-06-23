import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useEffect } from 'react';
import { AuthContext } from '../../../context/UserContext';
import './LawyerProfile.css'
import swal from 'sweetalert';


const CaseModal = () => {
    const [show, setShow] = useState(false);
    const [caseValue, setCaseValue] = useState('');
    const {getAcceptedCase,acceptedCase} = useContext(AuthContext);
    const [forwardLoader, setForwardLoader] = useState(true);

    const handleClose = () => {
        setShow(false);
        setCaseValue('');
    };
    const handleShow = () => setShow(true);

    const forwardCase = async () => {
        await getAcceptedCase();
        setForwardLoader(false);
    }
    useEffect(() => {
        forwardCase();
    },[])

  return (
    <>
      <Button variant="contained" onClick={handleShow}>
        Forward Case
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    onClick={(e) => setCaseValue(e.target.value)}
                >
                    {acceptedCase && acceptedCase.map((accepted,index)=>(
                           

<FormControlLabel key={index} value={accepted.id} control={<Radio />} label={<>
    <b className='txt_b'>Ref No: </b>{accepted.ref_number} &nbsp;<b className='txt_b'>Complaint Nature: </b> {accepted.complaint_nature} &nbsp;<b className='txt_b'>Status: </b> {accepted.case_status}
</>} />
                        
                    ))}
                </RadioGroup>
                </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Stack direction="row" spacing={2} className="d-flex justify-content-center">
      <Button  variant="contained"
      onClick={() => {
        if(caseValue){
          handleClose();
          forwardCase();
        }else{
          swal("Please select a case to forward");
        }
      }}
      endIcon={<SendIcon />}>
      Forward
      </Button>
    </Stack>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CaseModal
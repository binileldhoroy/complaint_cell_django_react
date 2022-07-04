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
import SpinnerLoader from '../../../components/loader/SpinnerLoader';
import noDataGif from '../../../static/gif/nodata.gif';


const CaseModal = ({lawyerId}) => {
    const [show, setShow] = useState(false);
    const [caseValue, setCaseValue] = useState('');
    const {getAcceptedCase,acceptedCase,forwardToLawyer} = useContext(AuthContext);
    const [forwardLoader, setForwardLoader] = useState(true);
    const [filterCase, setFilteredCase] = useState([]);
    const [isEmpty,setEmpty]= useState(true);

    const handleClose = () => {
        setShow(false);
        setCaseValue('');
    };
    const handleShow = () => setShow(true);

    const forwardCase = async () => {
      setForwardLoader(true);
        await getAcceptedCase();
        setForwardLoader(false);
    }

    useEffect(() => {
      if(show){
        forwardCase();
      }
    },[show])

    useEffect(() => {
      acceptedCase && setFilteredCase(acceptedCase.filter( accept => accept.forwarded === false))
    },[acceptedCase])


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
                    {/* {acceptedCase && acceptedCase.map((accepted,index)=> {
                        if(accepted.forwarded === false){
                          return(
                           
                              <FormControlLabel key={index} value={accepted.id} control={<Radio />} label={<>
                                  <b className='txt_b'>Ref No: </b>{accepted.ref_number} &nbsp;<b className='txt_b'>Complaint Nature: </b> {accepted.complaint_nature} &nbsp;<b className='txt_b'>Status: </b> {accepted.case_status}
                              </>} />
                          )
                        }
                    })} */}
                          
                          {filterCase.map((accepted,index)=> {
          
            

                          return(
                              
                              <FormControlLabel key={index} value={accepted.id} control={<Radio />} label={<>
                                  <b className='txt_b'>Ref No: </b>{accepted.ref_number} &nbsp;<b className='txt_b'>Complaint Nature: </b> {accepted.complaint_nature} &nbsp;<b className='txt_b'>Status: </b> {accepted.case_status}
                              </>} />
                          )
                        
               
})}
                </RadioGroup>
                </FormControl>
                {forwardLoader && <SpinnerLoader/>}
                {!forwardLoader && filterCase.length===0 && <div className='empty_msg'>
                  <img src={noDataGif} alt="gif" />
                  </div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Stack direction="row" spacing={2} className="d-flex justify-content-center">
      <Button  variant="contained"
      onClick={() => {
        if(caseValue){

          swal({
            title: "Are you sure?",
            text: "Are you sure that you want to forward this complaint ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then(async (willDelete) => {
            if (willDelete) {
              forwardToLawyer(caseValue,lawyerId);
              handleClose();
            }})
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
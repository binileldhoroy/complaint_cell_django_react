import React, { useContext, useEffect, useState } from 'react'
import { LawyerContext } from '../../../context/LawyerContext';

import { Button } from '@mui/material'
import { Modal } from 'react-bootstrap'

import VisibilityIcon from '@mui/icons-material/Visibility';
import SpinnerLoader from '../../../components/loader/SpinnerLoader';

const ViewNoteModal = ({id}) => {
    const {complaintNotes,getNotes} = useContext(LawyerContext)
    const [show, setShow] = useState(false);
    const [noteLoader, setNoteLoader] = useState(true);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if(show){
            setNoteLoader(true)
            getNotes(id)
            setNoteLoader(false)
        }   
    }, [show]);
  return (
    <>
      <Button  variant="contained" onClick={handleShow} startIcon={<VisibilityIcon/>}>
          View Notes
      </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Notes On This Case</Modal.Title>
          </Modal.Header>
          {noteLoader ? <SpinnerLoader/> :
          <Modal.Body>

            {complaintNotes && complaintNotes.map((note,index) => (
             <h5 key={index}>Note: {note.note} Date: {(note.created).slice(0,10)}</h5> 
            ))}
            {complaintNotes.length == 0 && <h5>Empty Notes</h5>}
            
          </Modal.Body>
}
        </Modal>
      </>
  )
}

export default ViewNoteModal
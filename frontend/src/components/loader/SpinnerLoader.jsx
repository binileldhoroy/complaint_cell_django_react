import React from 'react'
import { Spinner } from 'react-bootstrap'
import './SpinnerLoader.css'

const SpinnerLoader = () => {
  return (
    <div>
        <Spinner animation="border" role="status" className='spinner_loader' />
    </div>
  )
}

export default SpinnerLoader
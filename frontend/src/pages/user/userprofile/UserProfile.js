import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Avatar from "@mui/material/Avatar";
import { AiOutlineEdit } from "react-icons/ai";
import './UserProfile.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { AuthContext } from "../../../context/UserContext";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormControl } from "react-bootstrap";


const schema = yup.object().shape({
  dob: yup.string().required('This field is required!'),
  gender: yup.string().required('This field is required!'),
  relation_type: yup.string().required('This field is required!'),
  relative: yup.string().required('This field is required!'),
  id_type: yup.string().required('This field is required!'),
  id_number: yup.string().required('This field is required!'),
  house_name: yup.string().required('This field is required!'),
  house_no: yup.string().required('This field is required!'),
  street: yup.string().required('This field is required!'),
  locality: yup.string().required('This field is required!'),
  pincode: yup.string().required('This field is required!'),
  village: yup.string().required('This field is required!'),
  country: yup.string().required('This field is required!'),
  state: yup.string().required('This field is required!'),
  ps_district: yup.string().required('This field is required!'),
  ps_station: yup.string().required('This field is required!'),
});


const UserProfile = () => {

  const {userProfile,userInfo,updateUserProfile} = useContext(AuthContext)

  useEffect(() => {
    userProfile() 
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const [image,setImage] = useState(null)

  

  return (
    <div>
      <Header />

      <div>
        <div className="container mt-4 p-2 profile-container mb-2">
        <h2>Personal Information</h2>
          <Row>
            <Col md={6} className="d-flex justify-content-center">
             <div className="p-1 avater-profile">
              
               <FormControl
              className="crop_image d-none"
              id="upload_image"
              type="file"
              name="crop_image"
              required
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
             
              accept=".jpg,.jpeg,.png,"
            />
            <label for="upload_image">
              <span class="profilepic__icon">
              <Avatar
                alt=""
                src={userInfo.user_image && userInfo.user_image}
                sx={{ width: 200, height: 200 }}
              />
               </span>

</label>



             </div>
            </Col>
            <Col md={6}>
              <Row>
                <Col md={3}>
                  <label htmlFor="floatingInputCustom">First Name</label>
                </Col>
                <Col md={9}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control type="text" disabled readOnly value={(userInfo.people && userInfo.people.first_name) || (userInfo.people && userInfo.people.people.first_name)  } placeholder="First Name" />
                    </Form.Group>
                </Col>

                <Col md={3}>
                  <label htmlFor="floatingInputCustom">Last Name</label>
                </Col>
                <Col md={9}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control type="text" disabled readOnly value={(userInfo.people && userInfo.people.last_name) || (userInfo.people && userInfo.people.people.last_name)} placeholder="Last Name" />
                    </Form.Group>
                </Col>


                <Col md={3}>
                    <label htmlFor="floatingInputCustom">Email ID</label>
                    </Col>
                    <Col md={9}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control type="email" disabled readOnly value={(userInfo.people && userInfo.people.email) || (userInfo.people && userInfo.people.people.email)} placeholder="name@example.com" />
                    </Form.Group>
                    </Col>

                    <Col md={3}>
                    <label htmlFor="floatingInputCustom">Mobile Number</label>
                    </Col>
                    <Col md={9}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control type="text" disabled readOnly value={(userInfo && userInfo.phone) || (userInfo.people && userInfo.people.phone) } placeholder="Mobile Number" />
                    </Form.Group>
                    </Col>

                
              </Row>
            </Col>
          </Row>

<Form onSubmit={handleSubmit(updateUserProfile)}>
          <div className="mt-5">
          <h2>Contact And Relation Information</h2>
          <Row>
              <Col md={6} className="row">
                    <Col md={4}>
                    <label htmlFor="floatingInputCustom">Date of Birth</label>
                    </Col>
                    <Col md={8}>
                    <Form.Group className="mb-3"  controlId="exampleForm.ControlInput1">
                      <Form.Control type="date" defaultValue={userInfo.dob ? userInfo.dob:''} {...register('dob')} />
                    </Form.Group>
                    <p style={{color:'red'}} >{errors.dob?.message}</p>
                    </Col>

                    <Col md={4}>
                    <label htmlFor="floatingInputCustom">Gender</label>
                    </Col>
                    <Col md={8}>
                    <Form.Select {...register('gender')} defaultValue={userInfo.gender ? userInfo.gender:''}  aria-label="Default select example">
                    <option>Select..</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                  </Form.Select>
                  <p style={{color:'red'}} >{errors.gender?.message}</p>

                    </Col>
              </Col>

              <Col md={6} className="row">

              <Col md={4}>
                    <label htmlFor="floatingInputCustom">Relation Type</label>
              </Col>
              <Col md={8}>
              <Form.Select {...register('relation_type')} defaultValue={userInfo.relative_type ? userInfo.relative_type:''} aria-label="Default select example">
                    <option>Select..</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardin">Guardin</option>
                    <option value="Husband">Husband</option>
                    <option value="Guardin">Wife</option>
                  </Form.Select>
                  <p style={{color:'red'}} >{errors.relation_type?.message}</p>
              </Col>

              <Col md={4}>
                    <label htmlFor="floatingInputCustom">Relative Name</label>
              </Col>
              <Col md={8}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control type="text" defaultValue={userInfo.relative_name ? userInfo.relative_name:''} {...register('relative')} placeholder="Relative Name" />
                    </Form.Group>
                    <p style={{color:'red'}} >{errors.relative?.message}</p>
              </Col>
              </Col>
          </Row>
          </div>


          <div className="mt-5">
          <h2>Identification Information</h2>
          <Row>
              <Col md={6} className="row">
                    <Col md={4}>
                    <label htmlFor="floatingInputCustom">ID Type</label>
                    </Col>
                    <Col md={8}>
                    <Form.Select {...register('id_type')} defaultValue={userInfo.proof_type ? userInfo.proof_type:''} aria-label="Default select example">
                    <option>Select..</option>
                    <option value="AADHAR CARD">AADHAR CARD</option>
                    <option value="Income Tax(PAN) Card">Income Tax PAN Card</option>
                    <option value="Voter Card">Voter Card</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Passport">Passport</option>
                    <option value="Ration Card">Ration Card</option>
                  </Form.Select>
                  <p style={{color:'red'}} >{errors.id_type?.message}</p>
                    </Col>
              </Col>

              <Col md={6} className="row">

              <Col md={4}>
                    <label htmlFor="floatingInputCustom">ID Number</label>
              </Col>
              <Col md={8}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control type="text" {...register('id_number')} defaultValue={userInfo.proof_number ? userInfo.proof_number:''} placeholder="ID Number" />
                    </Form.Group>
                    <p style={{color:'red'}} >{errors.id_number?.message}</p>
              </Col>
              </Col>
          </Row>
          </div>



          <div className="mt-5">
          <h2>Permanent Address</h2>
          <Row>
              <Col md={6} className="row">
                    <Col md={4}>
                    <label htmlFor="floatingInputCustom">House Name</label>
                    </Col>
                    <Col md={8}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control type="text" defaultValue={userInfo.house_name ? userInfo.house_name:''} {...register('house_name')} placeholder="House Name" />
                    </Form.Group>
                    <p style={{color:'red'}} >{errors.house_name?.message}</p>
                    </Col>

                    <Col md={4}>
                    <label htmlFor="floatingInputCustom">House No</label>
                    </Col>
                    <Col md={8}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control type="text" defaultValue={userInfo.house_number ? userInfo.house_number:''} {...register('house_no')} placeholder="House No" />
                    </Form.Group>
                    <p style={{color:'red'}} >{errors.house_no?.message}</p>
                    </Col>


                    <Col md={4}>
                    <label htmlFor="floatingInputCustom">Street</label>
                    </Col>
                    <Col md={8}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control type="text" defaultValue={userInfo.street ? userInfo.street:''} {...register('street')} placeholder="Street" />
                    </Form.Group>
                    <p style={{color:'red'}} >{errors.street?.message}</p>
                    </Col>


                    <Col md={4}>
                    <label htmlFor="floatingInputCustom">Locality</label>
                    </Col>
                    <Col md={8}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control type="text" defaultValue={userInfo.locality ? userInfo.locality:''} {...register('locality')} placeholder="Locality" />
                    </Form.Group>
                    <p style={{color:'red'}} >{errors.locality?.message}</p>
                    </Col>


                    <Col md={4}>
                    <label htmlFor="floatingInputCustom">Pin Code</label>
                    </Col>
                    <Col md={8}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control type="text" defaultValue={userInfo.pin_code ? userInfo.pin_code:''} {...register('pincode')} placeholder="Pin Code" />
                    </Form.Group>
                    <p style={{color:'red'}} >{errors.pincode?.message}</p>
                    </Col>

              </Col>

              <Col md={6} className="row">

              <Col md={4}>
                    <label htmlFor="floatingInputCustom">Village/Town/City</label>
              </Col>
              <Col md={8}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control type="text" defaultValue={userInfo.village ? userInfo.village:''} {...register('village')} placeholder="Village/Town/City" />
                    </Form.Group>
                    <p style={{color:'red'}} >{errors.village?.message}</p>
              </Col>

              <Col md={4}>
                    <label htmlFor="floatingInputCustom">Country</label>
              </Col>
              <Col md={8}>
              <Form.Group className="mb-3"  controlId="exampleForm.ControlInput1">
                      <Form.Control type="text" defaultValue={userInfo.country ? userInfo.country:''} {...register('country')} placeholder="Country" />
                    </Form.Group>
                    <p style={{color:'red'}} >{errors.country?.message}</p>
              </Col>


              <Col md={4}>
                    <label htmlFor="floatingInputCustom">State</label>
              </Col>
              <Col md={8}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control type="text" defaultValue={userInfo.state ? userInfo.state:''} {...register('state')} placeholder="State" />
                    </Form.Group>
                    <p style={{color:'red'}} >{errors.state?.message}</p>
              </Col>

              <Col md={4}>
                    <label htmlFor="floatingInputCustom">Police District</label>
              </Col>
              <Col md={8}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control type="text" defaultValue={userInfo.police_district ? userInfo.police_district:''} {...register('ps_district')} placeholder="Police District" />
                    </Form.Group>
                    <p style={{color:'red'}} >{errors.ps_district?.message}</p>
              </Col>

              <Col md={4}>
                    <label htmlFor="floatingInputCustom">Police Station</label>
              </Col>
              <Col md={8}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control type="text" defaultValue={userInfo.police_station ? userInfo.police_station:''} {...register('ps_station')} placeholder="Police Station" />
                    </Form.Group>
                    <p style={{color:'red'}} >{errors.ps_station?.message}</p>
              </Col>


              </Col>
          </Row>
          </div>
          {userInfo.pinfo_complete ? '' :
          <Stack direction="row" spacing={2} className="d-flex justify-content-center">
      <Button type="reset" variant="outlined" startIcon={<CloseIcon />}>
        Clear
      </Button>
      <Button type="submit"  variant="contained" endIcon={<DoneIcon />}>
        Submit
      </Button>
    </Stack>
}
    </Form>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;

import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Button from "@mui/material/Button";
import Header from "../../../components/Header";
import { Avatar, CardActions, Skeleton, Stack } from "@mui/material";
import "./ViewLawyers.css";
import { AuthContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

const ViewLawyers = () => {
  const { getLawyersList, lawyersList } = useContext(AuthContext);
  const [listLoader, setListLoader] = useState(true);

  const navigate = useNavigate();

  const getList = async () => {
    await getLawyersList();
    setListLoader(false);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Lawyer List</h2>
        <Card className="main_card ">
          <Card.Body>
            <div className="complaint_card m-4">
              <Row xs={1} md={2} s>
                {listLoader ? (
                  <>
                    <Stack spacing={1}>
                      <div className="d-flex">
                        <Skeleton
                          className="mx-1"
                          variant="circular"
                          width={40}
                          height={40}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={210}
                          height={100}
                        />
                      </div>

                      <Skeleton variant="text" width={257} />
                      <Skeleton variant="text" width={150} />
                    </Stack>

                    <Stack spacing={1}>
                      <div className="d-flex">
                        <Skeleton
                          className="mx-1"
                          variant="circular"
                          width={40}
                          height={40}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={210}
                          height={100}
                        />
                      </div>

                      <Skeleton variant="text" width={257} />
                      <Skeleton variant="text" width={150} />
                    </Stack>
                  </>
                ) : (
                  <>
                    {lawyersList.on_district &&
                      lawyersList.on_district.map((lawyers, index) => {
                        return (
                          <Col md={6} className="my-3" key={index}>
                            <Card>
                              <Row>
                                <Col md={4}>
                                  <div className="mx-2 mt-4 d-flex justify-content-center">
                                    <Avatar
                                      alt="Aemy Sharp"
                                      src={lawyers && lawyers.lawyer_image}
                                      sx={{ width: 66, height: 66 }}
                                    />
                                  </div>
                                  <div className="d-flex justify-content-center profile_btn">
                                    <CardActions>
                                      <Button
                                        onClick={() => {
                                          navigate(
                                            `/lawyerprofile/${lawyers.lawyer.id}`
                                          );
                                        }}
                                        size="small"
                                      >
                                        View Profile
                                      </Button>
                                    </CardActions>
                                  </div>
                                </Col>
                                <Col md={8}>
                                  <Card.Body>
                                    <Card.Title>
                                     Adv. {lawyers.lawyer.first_name}{" "}
                                      {lawyers.lawyer.last_name}{" "}
                                    </Card.Title>
                                    <Card.Text style={{ color: "black" }}>
                                      <Row>
                                        <Col md={12} className=" ms-2">
                                          <label className="label_name">
                                            Practice Area{" "}
                                          </label>
                                          : <label>ddsydthdrt </label>
                                        </Col>

                                        <Col md={12} className=" ms-2">
                                          <label className="label_name">
                                            City
                                          </label>
                                          : <label>ddsydthdrt</label>
                                        </Col>

                                        <Col md={12} className=" ms-2">
                                          <label className="label_name">
                                            Practicing Since
                                          </label>
                                          : <label>ddsydthdrt</label>
                                        </Col>
                                      </Row>
                                    </Card.Text>
                                  </Card.Body>
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        );
                      })}

                    {lawyersList.non_district &&
                      lawyersList.non_district.map((lawyers, index) => {
                        return (
                          <Col md={6} className="my-3" key={index}>
                            <Card>
                              <Row>
                                <Col md={4}>
                                  <div className="mx-2 mt-4 d-flex justify-content-center">
                                    <Avatar
                                      alt="Aemy Sharp"
                                      src={lawyers && lawyers.lawyer_image}
                                      sx={{ width: 66, height: 66 }}
                                    />
                                  </div>
                                  <div className="d-flex justify-content-center profile_btn">
                                    <CardActions>
                                      <Button
                                        onClick={() => {
                                          navigate(
                                            `/lawyerprofile/${lawyers.lawyer.id}`
                                          );
                                        }}
                                        size="small"
                                      >
                                        View Profile
                                      </Button>
                                    </CardActions>
                                  </div>
                                </Col>
                                <Col md={8}>
                                  <Card.Body>
                                    <Card.Title>
                                      Adv. {lawyers.lawyer.first_name}{" "}
                                      {lawyers.lawyer.last_name}{" "}
                                    </Card.Title>
                                    <Card.Text style={{ color: "black" }}>
                                      <Row>
                                        <Col md={12} className=" ms-2">
                                          <label className="label_name">
                                            Practice Area{" "}
                                          </label>
                                          : <label>ddsydthdrt </label>
                                        </Col>

                                        <Col md={12} className=" ms-2">
                                          <label className="label_name">
                                            City
                                          </label>
                                          : <label>ddsydthdrt</label>
                                        </Col>

                                        <Col md={12} className=" ms-2">
                                          <label className="label_name">
                                            Practicing Since
                                          </label>
                                          : <label>ddsydthdrt</label>
                                        </Col>
                                      </Row>
                                    </Card.Text>
                                  </Card.Body>
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        );
                      })}
                  </>
                )}
              </Row>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ViewLawyers;

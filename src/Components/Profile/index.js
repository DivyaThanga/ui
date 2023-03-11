import React, { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Card,
  Grid,
  Typography,
  IconButton,
  Badge,
  Tooltip,
} from "@mui/material";

import {
  studentsData,
  facultyProfiles,
  editStudentDataApiCall,
  editFacultyProfiles,
} from "../../Apicall";
import Loader from "../Loader";
import { AddPhotoAlternate, Save } from "@mui/icons-material";

export default function Profile() {
  const [load, setLoad] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [studentProfile, setStudentProfile] = useState([]);
  const [facultyProfile, setFacultyProfile] = useState([]);
  const [image, setImage] = useState(null);

  const tokenData = JSON.parse(localStorage.getItem("tokens"));
  const header = { headers: { Authorization: `Bearer ${tokenData.access}` } };

  const fetchStudentProfile = () => {
    setLoad(true);
    studentsData(
      header,
      (response) => {
        setStudentProfile(response.data);
        setLoad(false);
      },
      (error) => console.log(error)
    );
  };

  const fetchFacultyProfile = () => {
    setLoad(true);
    facultyProfiles(
      header,
      (response) => {
        setFacultyProfile(response.data);
        setLoad(false);
      },
      (error) => console.log(error)
    );
  };

  const editStudentProfile = () => {
    let studentId = studentProfile[0]?.id;
    const header = {
      headers: {
        Authorization: `Bearer ${tokenData.access}`,
        "Content-Type": "multipart/form-data",
      },
    };
    let form_data = new FormData();
    form_data.append("image", image, image.name);
    editStudentDataApiCall(
      studentId,
      form_data,
      header,
      (response) => {
        fetchStudentProfile();
        setImage(null);
      },
      (error) => console.log(error)
    );
  };

  const editFacultyProfile = () => {
    let facultyId = facultyProfile[0]?.id;
    const header = {
      headers: {
        Authorization: `Bearer ${tokenData.access}`,
        "Content-Type": "multipart/form-data",
      },
    };
    let form_data = new FormData();
    form_data.append("image", image, image.name);
    editFacultyProfiles(
      facultyId,
      form_data,
      header,
      (response) => {
        fetchFacultyProfile();
        setImage(null);
      },
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let role = JSON.parse(localStorage.getItem("accessToken"));
      setUserRole(role && role?.role);
    }, 100);
    return () => clearInterval(interval);
  }, [userRole]);

  useEffect(() => {
    if (userRole && userRole === "faculty") {
      fetchFacultyProfile();
    } else if (userRole && userRole === "student") {
      fetchStudentProfile();
    }
  }, [userRole]);

  return (
    <div className="tableContent">
      <Loader load={load} />
      {facultyProfile?.length === 1 ? (
        <>
          {facultyProfile?.length !== 0 && (
            <Card
              sx={{
                margin: "5%",
                ml: "27%",
                height: "500px",
                width: "700px",
                borderRadius: "10%",
                border: "ridge",
              }}
            >
              <center>
                <Box sx={{ width: "100%", mt: "10%", ml: "10%" }}>
                  {facultyProfile?.map((detail) => {
                    return (
                      <>
                        <center>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <Tooltip title="Upload Profile">
                                <IconButton
                                  component="label"
                                  sx={{
                                    mr: "300%",
                                    backgroundColor: "skyblue",
                                  }}
                                >
                                  <AddPhotoAlternate />
                                  <input
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    name="file"
                                    onChange={(e) =>
                                      setImage(e.target.files[0])
                                    }
                                    hidden
                                  />
                                </IconButton>
                              </Tooltip>
                            }
                          >
                            <Avatar
                              src={detail?.image}
                              alt="no preview available"
                              sx={{
                                height: "100px",
                                width: "100px",
                                ml: "-65%",
                              }}
                            />
                          </Badge>
                          &nbsp; &nbsp;
                          {image !== null && (
                            <Tooltip title="Save">
                              <IconButton
                                component="label"
                                sx={{
                                  mt: "10%",
                                  ml: "-9%",
                                  backgroundColor: "skyblue",
                                }}
                                onClick={() => editFacultyProfile()}
                              >
                                <Save />
                              </IconButton>
                            </Tooltip>
                          )}
                        </center>

                        <Grid container rowSpacing={3} sx={{ mt: "3%" }}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{ padding: "1%", textAlign: "justify" }}
                            >
                              <b>Name</b> : {detail.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{ padding: "1%", textAlign: "justify" }}
                            >
                              <b>Faculty id </b>: {detail.fac_id}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{ padding: "1%", textAlign: "justify" }}
                            >
                              <b> DoB </b>: {detail.date_of_birth}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{ padding: "1%", textAlign: "justify" }}
                            >
                              <b> Blood Group </b>: {detail.blood_group}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{ padding: "1%", textAlign: "justify" }}
                            >
                              <b> Email </b>: {detail.user.email}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{ padding: "1%", textAlign: "justify" }}
                            >
                              <b> Mobile </b>: {detail.mobile}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{ padding: "1%", textAlign: "justify" }}
                            >
                              <b>Address </b>: {detail.address}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{ padding: "1%", textAlign: "justify" }}
                            >
                              <b> Gender </b>: {detail.gender}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              sx={{ padding: "1%", textAlign: "justify" }}
                            >
                              <b> Joined year </b>: {detail.joined_year}
                            </Typography>
                          </Grid>
                        </Grid>
                      </>
                    );
                  })}
                </Box>
              </center>
            </Card>
          )}
        </>
      ) : (
        <>
          {studentProfile?.length !== 0 && (
            <center>
              <Card
                sx={{
                  margin: "5%",
                  width: "500px",
                  borderRadius: "10%",
                  border: "ridge",
                  align: "center",
                }}
              >
                <Box sx={{ width: "100%", mt: "5%", ml: "7%", mb: "5%" }}>
                  {studentProfile?.map((detail) => {
                    return (
                      <>
                        <center>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <Tooltip title="Upload Profile">
                                <IconButton
                                  component="label"
                                  sx={{ mr: "80%", backgroundColor: "skyblue" }}
                                >
                                  <AddPhotoAlternate />
                                  <input
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    name="file"
                                    onChange={(e) =>
                                      setImage(e.target.files[0])
                                    }
                                    hidden
                                  />
                                </IconButton>
                              </Tooltip>
                            }
                          >
                            <Avatar
                              src={detail?.image?.full_size}
                              alt="no preview available"
                              sx={{
                                height: "100px",
                                width: "100px",
                                ml: "-20%",
                              }}
                            />
                          </Badge>
                          &nbsp; &nbsp;
                          {image !== null && (
                            <Tooltip title="Save">
                              <IconButton
                                component="label"
                                sx={{
                                  mt: "15%",
                                  ml: "-4%",
                                  backgroundColor: "skyblue",
                                }}
                                onClick={() => editStudentProfile()}
                              >
                                <Save />
                              </IconButton>
                            </Tooltip>
                          )}
                        </center>
                        <Grid container rowSpacing={3} sx={{ mt: "3%" }}>
                          <Grid item xs={6}>
                            <Typography
                              sx={{ padding: "1%", textAlign: "justify" }}
                            >
                              <b>Name </b>: {detail.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{ padding: "1%", textAlign: "justify" }}
                            >
                              <b>Student id</b> : {detail.student_id}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{ padding: "1%", textAlign: "justify" }}
                            >
                              <b>DoB</b> : {detail.date_of_birth}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{ padding: "1%", textAlign: "justify" }}
                            >
                              <b>Blood Group</b> : {detail.blood_group}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{ padding: "1%", textAlign: "justify" }}
                            >
                              <b>Email</b>:{detail.email}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{ padding: "1%", textAlign: "justify" }}
                            >
                              <b>Address </b>: {detail.address}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{ padding: "1%", textAlign: "justify" }}
                            >
                              <b> Gender</b> : {detail.gender}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{ padding: "1%", textAlign: "justify" }}
                            >
                              <b>Joined year</b> : {detail.joined_year}
                            </Typography>
                          </Grid>
                        </Grid>
                      </>
                    );
                  })}
                </Box>
              </Card>
            </center>
          )}
        </>
      )}
    </div>
  );
}

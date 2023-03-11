import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Fab,
  InputAdornment,
  Card,
  Grid,
  IconButton,
  Toolbar,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FaceIcon from "@mui/icons-material/Face";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import HomeIcon from "@mui/icons-material/Home";

import { addStudentApiCall, classesLists } from "../../../Apicall";
import ModalComponent from "../../../Components/Modal";

const bloodGroupDetails = ["AB+", "AB-", "A+", "A-", "O+", "O-", "B+", "B-"];
export default function AddStudents() {
  const [detail, setDetail] = useState({
    username: "",
    name: "",
    password: "",
    class_name: "",
    dob: "",
    blood_group: "",
    email: "",
    mobile: "",
    address: "",
    gender: "",
    roll_no: "",
    joined_year: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [classLists, setClassLists] = useState([]);
  const [postError, setPostError] = useState(false);
  const [view, setView] = useState(false);
  const [mandatoryMsg, setMandatoryMsg] = useState(false);
  const [buttonView, setButtonView] = useState(false);

  const inpRef = useRef({});
  const navigateTo = useNavigate();

  const tokenData = JSON.parse(localStorage.getItem("tokens"));

  let header = {
    headers: { Authorization: `Bearer ${tokenData.access}` },
  };

  const fetchDepartmentList = () => {
    classesLists(
      header,
      (response) => setClassLists(response.data),
      (error) => console.log(error)
    );
  };

  const handleChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
    if (
      e.target.name === "department" ||
      e.target.name === "department_division"
    ) {
      setDetail({ ...detail, [e.target.name]: parseInt(e.target.value) });
    }
    if (e.target.value !== "") {
      setMandatoryMsg(false);
    }
  };

  const className = (e) => {
    setDetail({ ...detail, class_name: e.target.value });
    if (e.target.value !== "") {
      setMandatoryMsg(false);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    navigateTo("/studentlist");
  };

  const formValidation = (event) => {
    event.preventDefault();
    if (detail.username === "") {
      inpRef.current.username.focus();
      setMandatoryMsg(true);
    } else if (detail.password === "") {
      inpRef.current.password.focus();
      setMandatoryMsg(true);
    } else if (detail.name === "") {
      inpRef.current.name.focus();
      setMandatoryMsg(true);
    } else if (detail.dob === "") {
      inpRef.current.dob.focus();
      setMandatoryMsg(true);
    } else if (detail.gender === "") {
      inpRef.current.gender.focus();
      setMandatoryMsg(true);
    } else if (detail.class_name === "") {
      inpRef.current.class_name.focus();
      setMandatoryMsg(true);
    } else if (detail.roll_no === "") {
      inpRef.current.roll_no.focus();
      setMandatoryMsg(true);
    } else if (detail.blood_group === "") {
      inpRef.current.blood_group.focus();
      setMandatoryMsg(true);
    } else if (detail.email === "") {
      inpRef.current.email.focus();
      setMandatoryMsg(true);
    } else if (detail.mobile === "") {
      inpRef.current.mobile.focus();
      setMandatoryMsg(true);
    } else if (detail.joined_year === "") {
      inpRef.current.joined_year.focus();
      setMandatoryMsg(true);
    } else if (detail.address === "") {
      inpRef.current.address.focus();
      setMandatoryMsg(true);
    } else {
      setButtonView(true);
      const filterClasses = classLists
        .filter((el) => el.class_name === detail.class_name)
        .map((el) => el.id);
      const data = {
        user: {
          username: detail.username,
          first_name: "",
          last_name: "",
          email: detail.email,
          password: detail.password,
          is_student: true,
        },
        name: detail.name,
        class_name: filterClasses[0],
        gender: detail.gender,
        mobile: detail.mobile,
        blood_group: detail.blood_group,
        date_of_birth: detail.dob,
        address: detail.address,
        roll_no: detail.roll_no,
        joined_year: detail.joined_year,
      };
      addStudentApiCall(
        data,
        header,
        (response) => {
          setModalOpen(true);
          setPostError({
            username: "",
            email: "",
            blood_group: "",
            roll_no: "",
          });
          setDetail({
            username: "",
            name: "",
            password: "",
            department: "",
            class_name: "",
            semester: null,
            dob: "",
            blood_group: "",
            email: "",
            mobile: "",
            address: "",
            gender: "",
            roll_no: "",
            joined_year: "",
          });
        },
        (error) => {
          if (error.response.status === 400) {
            setPostError({
              ...postError,
              username:
                error.response.data.user.username !== ""
                  ? error.response.data.user.username
                  : "",
              email:
                error.response.data.user.email !== ""
                  ? error.response.data.user.email
                  : "",
              blood_group:
                error.response.data.blood_group !== ""
                  ? error.response.data.blood_group
                  : "",
              roll_no:
                error.response.data.roll_no !== ""
                  ? error.response.data.roll_no
                  : "",
              mobile:
                error.response.data.blood_group !== ""
                  ? error.response.data.mobile
                  : "",
            });
            setButtonView(false);
          }
        }
      );
    }
  };

  useEffect(() => {
    fetchDepartmentList();
  }, []);

  return (
    <div style={{ marginTop: "-45%" }}>
      <Card
        sx={{
          width: "1500px",
          border: "ridge",
          borderRadius: "20px",
          marginLeft: "300px",
        }}
      >
        <center>
          <form onSubmit={formValidation} encType="multipart/data">
            <div sx={{ display: "flex", float: "left" }}>
              <Grid
                container
                rowSpacing={4}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6} sx={{ marginTop: "3%" }}>
                  <TextField
                    sx={{ width: "700px" }}
                    variant="outlined"
                    type="text"
                    label="Username"
                    name="username"
                    value={detail.username}
                    inputRef={(ref) => (inpRef.current.username = ref)}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <PersonOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div style={{ marginRight: "55%" }}>
                    {postError.username !== "" && (
                      <Typography color="error">
                        {postError.username}
                      </Typography>
                    )}
                  </div>
                </Grid>
                <Grid item xs={6} sx={{ marginTop: "3%" }}>
                  <TextField
                    sx={{ width: "700px" }}
                    variant="outlined"
                    type={view ? "text" : "password"}
                    label="Password"
                    name="password"
                    value={detail.password}
                    inputRef={(ref) => (inpRef.current.password = ref)}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setView(!view)}>
                            {view ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    sx={{ width: "700px" }}
                    variant="outlined"
                    type="text"
                    label="Name"
                    name="name"
                    value={detail.name}
                    inputRef={(ref) => (inpRef.current.name = ref)}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <FaceIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    sx={{ width: "700px" }}
                    variant="outlined"
                    type="date"
                    name="dob"
                    value={detail.dob}
                    inputRef={(ref) => (inpRef.current.dob = ref)}
                    label="DOB"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControl sx={{ width: "320px", textAlign: "justify" }}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={detail.gender}
                      name="gender"
                      label="Gender"
                      onChange={handleChange}
                      inputRef={(ref) => (inpRef.current.gender = ref)}
                    >
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="others">Others</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl sx={{ width: "320px", textAlign: "justify" }}>
                    <InputLabel>Class</InputLabel>
                    <Select
                      value={detail.class_name}
                      label="Class"
                      name="class_name"
                      inputRef={(ref) => (inpRef.current.class_name = ref)}
                      onChange={className}
                    >
                      {classLists?.map((el) => (
                        <MenuItem key={el.class_name} value={el.class_name}>
                          {el.class_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    sx={{ width: "320px" }}
                    variant="outlined"
                    type="text"
                    name="roll_no"
                    value={detail.roll_no}
                    inputRef={(ref) => (inpRef.current.roll_no = ref)}
                    label="Roll No"
                    onChange={handleChange}
                  />
                  <div style={{ marginRight: "35%" }}>
                    {postError.roll_no !== "" && (
                      <Typography color="error">{postError.roll_no}</Typography>
                    )}
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <FormControl sx={{ width: "320px", textAlign: "justify" }}>
                    <InputLabel>Blood Group</InputLabel>
                    <Select
                      value={detail.blood_group}
                      label="Blood Group"
                      name="blood_group"
                      inputRef={(ref) => (inpRef.current.blood_group = ref)}
                      onChange={handleChange}
                    >
                      {bloodGroupDetails?.map((el) => (
                        <MenuItem key={el} value={el}>
                          {el}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    sx={{ width: "700px" }}
                    variant="outlined"
                    type="email"
                    name="email"
                    value={detail.email}
                    inputRef={(ref) => (inpRef.current.email = ref)}
                    label="Email"
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div style={{ marginRight: "65%" }}>
                    {postError.email !== "" && (
                      <Typography color="error">{postError.email}</Typography>
                    )}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    sx={{ width: "700px" }}
                    variant="outlined"
                    type="text"
                    name="mobile"
                    value={detail.mobile}
                    inputRef={(ref) => (inpRef.current.mobile = ref)}
                    label="Mobile"
                    onChange={handleChange}
                    InputProps={{
                      inputProps: { maxlength: 10 },
                      endAdornment: (
                        <InputAdornment>
                          <CallIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div style={{ marginRight: "70%" }}>
                    {postError.mobile !== "" && (
                      <Typography color="error">{postError.mobile}</Typography>
                    )}
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    sx={{ width: "700px" }}
                    variant="outlined"
                    type="date"
                    name="joined_year"
                    value={detail.joined_year}
                    inputRef={(ref) => (inpRef.current.joined_year = ref)}
                    label="Joined Date"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    sx={{ width: "700px" }}
                    variant="outlined"
                    type="text"
                    name="address"
                    value={detail.address}
                    inputRef={(ref) => (inpRef.current.address = ref)}
                    label="Address"
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <HomeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {mandatoryMsg && (
                  <Toolbar sx={{ marginLeft: "43%", color: "red" }}>
                    <p style={{ fontSize: "20px" }}>*</p>
                    All the fields are Mandatory
                  </Toolbar>
                )}
                <Grid item xs={20} sx={{ marginTop: "-15px" }}>
                  <Fab
                    type="submit"
                    variant="extended"
                    sx={{
                      width: "10%",
                      textTransform: "none",
                      mb: "1%",
                      bgcolor: "#232E48",
                      color: "white",
                      fontSize: "18px",
                    }}
                    className="btn"
                    disabled={buttonView}
                  >
                    Submit
                  </Fab>
                </Grid>
              </Grid>
            </div>
          </form>
        </center>
      </Card>

      <ModalComponent
        modalOpen={modalOpen}
        handleClose={handleClose}
        modalValue={
          <>
            <Typography align="center">
              <b>Register Successfully</b>
            </Typography>
            <br />
            <center>
              <Fab
                sx={{
                  textTransform: "none",
                  bgcolor: "#232E48",
                  color: "white",
                }}
                variant="extended"
                className="btn"
                onClick={() => navigateTo("/studentlist")}
              >
                close
              </Fab>
            </center>
          </>
        }
      />
    </div>
  );
}

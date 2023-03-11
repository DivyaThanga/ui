import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Avatar,
  Card,
  Grid,
  Typography,
  Toolbar,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Fab,
  TableContainer,
  InputAdornment,
  TextField,
  Divider,
} from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import CallIcon from "@mui/icons-material/Call";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ManIcon from "@mui/icons-material/Man";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import SchoolIcon from "@mui/icons-material/School";
import { Home, Refresh, Search } from "@mui/icons-material";

import {
  studentDetails,
  studentAttendanceListApiCall,
  studentAttendanceHistoryApiCall,
  subjectListApicall,
  studentLeaveDataApiCall,
} from "../../../Apicall";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import Loader from "../../../Components/Loader";

export default function Studentprofile() {
  const [studentProfile, setStudentProfile] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const { id } = useParams();

  const tokenData = JSON.parse(localStorage.getItem("tokens"));
  const header = { headers: { Authorization: `Bearer ${tokenData.access}` } };

  const getStudentProfile = () => {
    setLoad(true);
    studentDetails(
      id,
      header,
      (response) => {
        setStudentProfile(response.data);
        setLoad(false);
      },
      (error) => {
        console.log(error);
      }
    );

    studentAttendanceHistoryApiCall(
      id,
      header,
      (response) => setAttendanceStatus(response.data),
      (error) => console.log(error)
    );

    subjectListApicall(
      header,
      (response) => setSubjectList(response.data),
      (error) => console.log(error)
    );
    studentLeaveDataApiCall(
      id,
      header,
      (response) => {
        setLeaveStatus(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handlechange = (e) => {
    setFilterDate(e.target.value);
  };

  const handleSubjectName = (e) => {
    setSubjectName(e.target.value);
    const filterSubjects = subjectList
      .filter((el) => el.subject_name === e.target.value)
      .map((el) => el.id);
    console.log(filterSubjects);
    setSubjectId(filterSubjects[0]);
  };

  const handleFilter = () => {
    studentAttendanceListApiCall(
      filterDate,
      subjectId,
      id,
      header,
      (response) => setAttendanceStatus(response.data),
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    getStudentProfile();
  }, []);

  return (
    <div className="tableContent">
      <Loader load={load} />
      {studentProfile.length !== 0 && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ marginLeft: "100px", mt: "5%" }}>
              <Card
                sx={{
                  width: "600px",
                  border: "ridge",
                  marginBottom: "120px",
                  borderRadius: "20px",
                  marginLeft: "40px",
                  marginTop: "10px",
                }}
              >
                <center>
                  <h3
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      marginTop: "20px",
                    }}
                  >
                    {studentProfile?.name}
                  </h3>
                  <h4 sx={{ textAlign: "center", fontWeight: "bold" }}>
                    {studentProfile?.class_name?.department?.title} Department
                  </h4>
                  <Avatar
                    src={studentProfile?.image?.full_size}
                    alt="no preview available"
                    sx={{ height: "75px", width: "75px", marginTop: "30px" }}
                  />
                  <Toolbar
                    sx={{
                      padding: "1%",
                      ml: "35%",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    <CallIcon style={{ color: "green" }} />
                    &nbsp;{studentProfile?.parent.phone}
                  </Toolbar>
                </center>
                <Divider />
                <Grid
                  container
                  spacing={2}
                  sx={{ mt: "3%", ml: "4%", mb: "5%" }}
                >
                  <Grid item xs={6}>
                    <TextField
                      value={studentProfile?.date_of_birth}
                      variant="standard"
                      label=" Date of Birth"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <DateRangeIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      value={studentProfile?.blood_group}
                      variant="standard"
                      label=" Blood group"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <BloodtypeIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      value={studentProfile?.gender}
                      variant="standard"
                      label="Gender"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <ManIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      value={studentProfile?.address}
                      variant="standard"
                      label="Address"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <Home />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      value={studentProfile?.parent.phone}
                      variant="standard"
                      label="Parent's Mobile"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <CallIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      value={studentProfile?.roll_no}
                      variant="standard"
                      label="Roll no"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      value={studentProfile?.semester}
                      variant="standard"
                      label="Semester"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <SchoolIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      value={studentProfile?.joined_year}
                      variant="standard"
                      label="Joined Year"
                      tabChange
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <DateRangeIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid item={2}>
              <div
                sx={{
                  marginTop: "5%",
                }}
              >
                <Grid item xs={2} sx={{ ml: "30px", mt: "15%" }}>
                  <Accordion sx={{ width: "600px" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        <b>Leave Status</b>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ textAlign: "justify" }}>
                        <Toolbar>
                          <div style={{ fontWeight: "bold" }}>Total :</div>
                          <div>18</div>&nbsp;&nbsp;
                          <div style={{ fontWeight: "bold" }}>Used :</div>
                          <div>
                            {
                              leaveStatus?.filter(
                                (detail) => detail.status === "approved"
                              ).length
                            }
                          </div>
                        </Toolbar>
                      </Typography>
                      {leaveStatus.length !== 0 && (
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">
                                  Applied Date
                                </TableCell>
                                <TableCell align="center">Status</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {leaveStatus?.map((detail) => {
                                return (
                                  <TableRow>
                                    <TableCell align="center">
                                      {detail.applied_date}
                                    </TableCell>
                                    <TableCell align="center">
                                      {detail.status === "approved" && (
                                        <DoneIcon sx={{ color: "green" }} />
                                      )}
                                      {detail.status === "pending" && (
                                        <PendingActionsIcon
                                          sx={{ color: "blue" }}
                                        />
                                      )}
                                      {detail.status === "rejected" && (
                                        <CloseIcon sx={{ color: "red" }} />
                                      )}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  sx={{ mt: "3px", ml: "10px", mb: "20px" }}
                >
                  <Grid item xs={3}>
                    <center>
                      <Accordion sx={{ width: "600px" }}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>
                            <b>Attendance</b>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Toolbar sx={{ marginTop: "10px" }}>
                            <IconButton sx={{ marginLeft: "90%" }}>
                              <FilterListIcon
                                className="filterIcon"
                                onClick={() => setFilterOpen(!filterOpen)}
                              />
                            </IconButton>

                            {filterOpen && (
                              <div style={{ marginLeft: "-550px" }}>
                                <FormControl
                                  style={{
                                    width: "100px",
                                  }}
                                >
                                  <InputLabel>Subject</InputLabel>
                                  <Select
                                    value={subjectName}
                                    label="Subject"
                                    name="subject_name"
                                    onChange={handleSubjectName}
                                  >
                                    {subjectList?.map((el) => (
                                      <MenuItem
                                        key={el.subject_name}
                                        value={el.subject_name}
                                      >
                                        {el.subject_name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                &nbsp;&nbsp;
                                <input
                                  type="date"
                                  name="date"
                                  value={filterDate}
                                  onChange={handlechange}
                                  style={{ padding: "17px" }}
                                />
                                &nbsp;&nbsp;
                                <Fab
                                  sx={{ bgcolor: "#232E48", color: "white" }}
                                  variant="circular"
                                  size="small"
                                  onClick={handleFilter}
                                  className="btn"
                                >
                                  <Search />
                                </Fab>
                                &nbsp;&nbsp;
                                <Fab
                                  variant="circular"
                                  size="small"
                                  sx={{
                                    textTransform: "none",
                                    bgcolor: "#232E48",
                                    color: "white",
                                  }}
                                  className="btn"
                                  onClick={() => {
                                    setFilterDate("");
                                    setSubjectName("");
                                    setSubjectId("");
                                  }}
                                >
                                  <Refresh />
                                </Fab>
                              </div>
                            )}
                          </Toolbar>

                          {filterDate !== "" && (
                            <Typography
                              sx={{
                                marginRight: "65%",
                                marginTop: "15px",
                                marginBottom: "2%",
                              }}
                            >
                              <b>Date</b> : {filterDate}
                            </Typography>
                          )}
                          {attendanceStatus.length !== 0 ? (
                            <Table
                              sx={{ maxWidth: "1000px", marginTop: "15px" }}
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell align="center">Subject</TableCell>
                                  <TableCell align="center">Time</TableCell>
                                  <TableCell align="center">
                                    Attendance
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {attendanceStatus.map((detail) => {
                                  return (
                                    <TableRow>
                                      <TableCell align="center">
                                        {detail.subject_name}
                                      </TableCell>
                                      <TableCell align="center">
                                        {detail.time_slot}
                                      </TableCell>
                                      <TableCell align="center">
                                        {detail.is_present === true ? (
                                          <DoneIcon sx={{ color: "green" }} />
                                        ) : (
                                          <CloseIcon sx={{ color: "red" }} />
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          ) : (
                            <p>
                              <b>No results found</b>
                            </p>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </center>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}

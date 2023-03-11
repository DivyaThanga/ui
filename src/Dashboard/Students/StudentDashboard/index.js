import React, { useState, useEffect } from "react";

import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Fab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Toolbar,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  studentLeaveDetailApiCall,
  studentsData,
  studentPortalAttendanceListApiCall,
} from "../../../Apicall";
import {
  studentAttendanceDetailApiCall,
  subjectListApicall,
} from "../../../Apicall";

import Loader from "../../../Components/Loader";
import { Refresh, Search } from "@mui/icons-material";

export default function StudentDashboard() {
  const [load, setLoad] = useState(false);
  const [leaveStatus, setLeaveStatus] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [subjectId, setSubjectId] = useState("");

  const [attendanceStatus, setAttendanceStatus] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [id, setId] = useState([]);

  const [className, setClassName] = useState("");
  const [semester_Name, setSemesterName] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [formView, setFormView] = useState(false);

  const tokenData = JSON.parse(localStorage.getItem("tokens"));

  let header = {
    headers: { Authorization: `Bearer ${tokenData.access}` },
  };

  const fetchStudentLeaveDetail = () => {
    setLoad(true);
    studentLeaveDetailApiCall(
      header,
      (response) => {
        setLeaveStatus(response.data);
        setLoad(false);
      },
      (error) => {
        console.log(error);
      }
    );

    studentsData(
      header,
      (response) => {
        setId(response.data[0].id);
        setClassName(response.data[0].classname);
        setSemesterName(response.data[0].semester);
      },
      (error) => {
        console.log(error);
      }
    );

    subjectListApicall(
      header,
      (response) => setSubjectList(response.data),
      (error) => console.log(error)
    );
  };

  const fetchStudentAttendanceDetail = () => {
    setLoad(true);
    studentAttendanceDetailApiCall(
      header,
      (response) => {
        setAttendanceStatus(response.data);
        setLoad(false);
      },
      (error) => console.log(error)
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
    studentPortalAttendanceListApiCall(
      filterDate,
      subjectId,
      header,
      (response) => setAttendanceStatus(response.data),
      (error) => console.log(error)
    );
  };

  const attendaceList = attendanceStatus.filter((el) => el.student === id);

  useEffect(() => {
    fetchStudentLeaveDetail();
    fetchStudentAttendanceDetail();
  }, []);

  return (
    <div className="tableContent">
      <Loader load={load} />
      {leaveStatus.length !== 0 && (
        <>
          {formView ? (
            <></>
          ) : (
            <>
              <center>
                <Accordion sx={{ width: "800px", marginTop: "50px" }}>
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
                    <Toolbar>
                      <Typography>
                        <b>Used</b> :&nbsp;
                        {leaveStatus.filter(
                          (detail) => detail.status === "pending"
                        ).length < 10
                          ? `0${
                              leaveStatus.filter(
                                (detail) => detail.status === "pending"
                              ).length
                            }`
                          : leaveStatus.filter(
                              (detail) => detail.status === "pending"
                            ).length}
                      </Typography>
                      <Typography sx={{ marginLeft: "10%" }}>
                        <b>Free</b> : 19
                      </Typography>
                    </Toolbar>
                  </AccordionDetails>
                </Accordion>
                <br />
                <br />
                <Accordion sx={{ width: "800px" }}>
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
                    <TableContainer sx={{ mt: "-1%" }}>
                      <div style={{ textAlign: "justify" }}>
                        <Typography>
                          <b>Semester</b> :{semester_Name}
                        </Typography>
                        <Typography>
                          <b>Department</b> :{className}
                        </Typography>
                        <Typography>
                          <b>Total Classes</b> :08
                        </Typography>
                      </div>
                      <Toolbar sx={{ marginTop: "20px" }}>
                        <IconButton sx={{ marginLeft: "90%" }}>
                          <FilterListIcon
                            className="filterIcon"
                            onClick={() => setFilterOpen(!filterOpen)}
                          />
                        </IconButton>

                        {filterOpen && (
                          <div style={{ marginLeft: "-730px" }}>
                            <FormControl
                              sx={{
                                width: "200px",
                                borderRadius: "20px",
                              }}
                            >
                              <InputLabel>Subject</InputLabel>
                              <Select
                                InputLabelProps={{ shrink: true }}
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
                              style={{
                                padding: "15px",
                                width: "200px",
                              }}
                            />
                            &nbsp;&nbsp;
                            <Fab
                              variant="circular"
                              size="small"
                              sx={{
                                align: "center",
                                textTransform: "none",
                                bgcolor: "#232E48",
                                color: "white",
                              }}
                              className="btn"
                              onClick={handleFilter}
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

                      <br />
                      {filterDate && (
                        <Typography sx={{ marginLeft: "-80%" }}>
                          <b> Date</b> : {filterDate}
                        </Typography>
                      )}
                      <br />
                      {attendaceList.length !== 0 ? (
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">Subject</TableCell>
                              <TableCell align="center">Time</TableCell>
                              <TableCell align="center">Attendance</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {attendaceList.map((detail) => {
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
                        <>
                          {load === false && (
                            <Typography>
                              <b>No results found</b>
                            </Typography>
                          )}
                        </>
                      )}
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>

                <br />
                <br />
              </center>
            </>
          )}
        </>
      )}
    </div>
  );
}
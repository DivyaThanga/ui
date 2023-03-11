import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Switch,
  Typography,
  Toolbar,
  IconButton,
  Fab,
} from "@mui/material";

import {
  attendanceEditApiCall,
  markedAttendanceApiCall,
} from "../../../Apicall";
import Loader from "../../../Components/Loader";

const tableHeaders = ["Roll No", "Student", "Attendance"];

export default function Markattendance() {
  const [load, setLoad] = useState(false);
  const [details, setDetails] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [markedAttendances, setMarkedAttendances] = useState([]);
  const [slot, setSlot] = useState([]);

  const navigateTo = useNavigate();

  const currentDate = new Date().toISOString().slice(0, 10);

  const tokenData = JSON.parse(localStorage.getItem("tokens"));
  const header = { headers: { Authorization: `Bearer ${tokenData.access}` } };

  const getMarkedAttendance = () => {
    setLoad(true);
    markedAttendanceApiCall(
      slot[0]?.timeslot?.id,
      slot[0]?.subject?.id,
      slot[0]?.faculty?.id,
      currentDate,
      header,
      (response) => {
        setMarkedAttendances(response.data);
        setLoad(false);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getStudentData = () => {
    if (
      JSON.parse(localStorage.getItem("markedAttendances")) === null &&
      JSON.parse(localStorage.getItem("markedAttendances")) === ""
    ) {
      setLoad(true);
    }
    attendanceEditApiCall(
      slot[0]?.class_name?.id,
      header,
      (response) => {
        setDetails(response.data);
        setLoad(false);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const studentProfile = (id) => {
    navigateTo(`/studentprofile/${id}`);
  };

  const handlePresent = (event, roll_no) => {
    const obj = studentData.map((el) => {
      if (el.roll_no === roll_no) {
        el["is_present"] = event.target.checked;
        return el;
      } else {
        console.log("el", el);
        return el;
      }
    });
    setStudentData(obj);
    localStorage.setItem("markedAttendances", JSON.stringify(obj));
  };

  const handlePreview = () => {
    localStorage.setItem("markedAttendances", JSON.stringify(studentData));
    navigateTo(`/attendancePage/${slot[0]?.class_name?.id}/preview`);
  };

  const addFields = (index, attendance) => {
    let temp = [...details];
    temp[index].is_present = attendance;
    temp[index].student = temp[index].id;
    temp[index].subject = slot[0]?.subject?.id;
    temp[index].semester = temp[index].semester_id;
    temp[index].timeslot = slot[0]?.timeslot?.id;
    temp[index].class_name = slot[0]?.class_name?.id;
    setStudentData(temp);
  };

  useEffect(() => {
    setSlot(JSON.parse(localStorage.getItem("currentTimeslot")));
    if (JSON.parse(localStorage.getItem("markedAttendances")) !== null) {
      setStudentData(JSON.parse(localStorage.getItem("markedAttendances")));
    }
  }, []);

  useEffect(() => {
    if (slot.length !== 0) {
      getMarkedAttendance();
      getStudentData();
    }
  }, [slot]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("markedAttendances")) === null) {
      details.map((el, index) => {
        addFields(index, false);
      });
    }
  }, [details]);

  return (
    <div className="tableContent">
      {JSON.parse(localStorage.getItem("markedAttendances")) === null && (
        <Loader load={load} />
      )}
      {markedAttendances.length === 0 && (
        <>
          {studentData.length !== 0 && (
            <TableContainer component={Paper}>
              <Table
                sx={{ width: "50%", marginTop: "50px" }}
                align="center"
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    {tableHeaders.map((header) => {
                      return <TableCell align="center">{header}</TableCell>;
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentData.map((rowValues, index) => (
                    <TableRow
                      key={index + 1}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">{rowValues.roll_no}</TableCell>
                      <TableCell align="center">
                        <Toolbar sx={{ ml: "30%" }}>
                          <IconButton
                            onClick={() => studentProfile(rowValues.id)}
                          >
                            <Avatar src={rowValues.image?.full_size} />
                          </IconButton>
                          <Typography
                            sx={{ cursor: "pointer" }}
                            onClick={() => studentProfile(rowValues.id)}
                          >
                            {rowValues.name}
                          </Typography>
                        </Toolbar>
                      </TableCell>
                      <TableCell align="center">
                        <Switch
                          name={rowValues.name}
                          checked={rowValues.is_present}
                          onChange={(event) =>
                            handlePresent(event, rowValues.roll_no)
                          }
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Fab
                onClick={handlePreview}
                variant="extended"
                sx={{
                  ml: "48%",
                  textTransform: "none",
                  mt: "1%",
                  mb: "1%",
                  bgcolor: "#232E48",
                  color: "white",
                }}
                className="btn"
              >
                Preview
              </Fab>
            </TableContainer>
          )}
        </>
      )}
      {markedAttendances.length !== 0 && (
        <TableContainer component={Paper}>
          <Table
            sx={{
              height: "100%",
              width: "50%",
              marginTop: "30px",
              mb: "20px",
            }}
            align="center"
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => {
                  return <TableCell align="center">{header}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {markedAttendances.map((rowValues, index) => (
                <TableRow
                  key={index + 1}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    {rowValues.student_roll_no}
                  </TableCell>
                  <TableCell align="center">
                    <Toolbar sx={{ ml: "25%" }}>
                      <IconButton
                        onClick={() => studentProfile(rowValues.student)}
                      >
                        <Avatar src={rowValues.student_image} />
                      </IconButton>
                      <Typography
                        sx={{ ml: "3%", cursor: "pointer" }}
                        onClick={() => studentProfile(rowValues.student)}
                      >
                        {rowValues.student_name}
                      </Typography>
                    </Toolbar>
                  </TableCell>
                  <TableCell align="center">
                    <Switch
                      name={rowValues.student_name}
                      checked={rowValues.is_present}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
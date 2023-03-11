import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Fab,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import FactCheckIcon from "@mui/icons-material/FactCheck";

import { facultyTimeTableAPiCall } from "../../../Apicall";
import Loader from "../../../Components/Loader";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const tableHeaders = [
  "Time",
  "Subject",
  "Department",
  "Semester",
  "Mark Attendance",
];

export default function TimeTable() {
  const [timeTable, setTimeTable] = useState([]);
  const [load, setLoad] = useState(false);

  const navigateTo = useNavigate();

  const currentDate = new Date();
  const toDay = currentDate.getDay();

  const tokenData = JSON.parse(localStorage.getItem("tokens"));
  const header = { headers: { Authorization: `Bearer ${tokenData.access}` } };

  const fetchTimetable = () => {
    setLoad(true);
    facultyTimeTableAPiCall(
      toDay,
      header,
      (response) => {
        setTimeTable(response.data);
        setLoad(false);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const openAttendance = (id) => {
    let currentSlot = timeTable.filter((slots) => slots.id === id);
    localStorage.setItem("currentTimeslot", JSON.stringify(currentSlot));
    navigateTo(`/attendancePage/${id}`);
  };

  const myTimetable = () => {
    navigateTo("/mytimetable");
  };

  useEffect(() => {
    fetchTimetable();
    localStorage.removeItem("currentTimeslot");
    localStorage.setItem("markedAttendances", null);
  }, []);

  return (
    <div className="tableContent">
      <Loader load={load} />
      {timeTable.length !== 0 && load === false && (
        <>
          <Fab
            sx={{
              ml: "90%",
              textTransform: "none",
              mb: "-4%",
              bgcolor: "#232E48",
              color: "white",
            }}
            className="btn"
            variant="extended"
            onClick={myTimetable}
          >
            Time Table
          </Fab>
          <h1 align="center" sx={{ fontWeight: "bold" }}>
            Today's Classes
          </h1>
          <br />
          <Typography>
            <Toolbar sx={{ mt: "-2%" }}>
              <Typography sx={{ fontWeight: "bold" }}>Day : </Typography>&nbsp;
              <Typography>
                {Date().slice(4, 15)} &nbsp;<b>,</b> &nbsp;
                {timeTable
                  .filter((el, index) => index === 0)
                  .map((el) => days[el.day])}
              </Typography>
            </Toolbar>
          </Typography>
          <Table sx={{ mb: "3%" }} align="center">
            <TableHead>
              <TableRow>
                {tableHeaders.map((headers) => {
                  return <TableCell align="center">{headers}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {timeTable.map((classes, index) => {
                return (
                  <TableRow key={index + 1}>
                    <TableCell align="center">
                      {`${classes.timeslot?.start_time}`}
                    </TableCell>
                    <TableCell align="center">
                      {classes.subject.subject_name}
                    </TableCell>
                    <TableCell align="center">
                      {classes.class_name.class_name}
                    </TableCell>
                    <TableCell align="center">
                      {classes.semester_name}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => openAttendance(classes.id)}>
                        {classes?.attendance_mark === true ? (
                          <FactCheckIcon sx={{ color: "#7851a9" }} />
                        ) : (
                          <FactCheckIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}

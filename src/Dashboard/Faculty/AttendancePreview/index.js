import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Fab,
  Avatar,
  Typography,
  TableCell,
  TableBody,
  Table,
  TableRow,
  Toolbar,
  Box,
  Card,
  TableHead,
} from "@mui/material";

import ModalComponent from "../../../Components/Modal";
import { attendancePostApiCall } from "../../../Apicall";

export default function AttendancePreview() {
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonView, setButtonView] = useState(false);
  const [studentDetail, setStudentDetail] = useState(
    JSON.parse(localStorage.getItem("markedAttendances"))
  );

  const navigateTo = useNavigate();

  const tokenData = JSON.parse(localStorage.getItem("tokens"));
  const header = { headers: { Authorization: `Bearer ${tokenData.access}` } };

  const submitAttendance = () => {
    setModalOpen(true);
  };

  const post = () => {
    setButtonView(true);
    attendancePostApiCall(
      studentDetail,
      header,
      (response) => {
        setModalOpen(false);
        navigateTo("/");
      },
      (error) => {
        setButtonView(false);
        console.log(error);
      }
    );
  };

  const handleClose = () => {
    setModalOpen(false);
    navigateTo("/");
  };

  return (
    <div className="tableContent">
      <Box sx={{ mt: "40px" }}>
        <center>
          <Card
            sx={{
              mb: "3%",
              width: "50%",
              border: "ridge",
              borderRadius: "30px",
            }}
          >
            <Typography sx={{ ml: "80%", marginTop: "-3%" }}>
              {Date().slice(4, 15)}
            </Typography>
            <Typography sx={{ ml: "80%", fontWeight: "bold" }}>
              Absentees :
              {
                studentDetail.filter(
                  (absentees) => absentees.is_present === false
                ).length
              }
            </Typography>
            {studentDetail.filter(
              (presentees) => presentees.is_present === true
            ).length !== 0 ? (
              <Table sx={{ height: "100%", width: "50%", marginTop: "50px" }}>
                <TableHead>
                  <TableRow align="center">
                    <TableCell>Student</TableCell>
                    <TableCell>Roll No</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{
                        color: "green",
                        fontSize: "18px",
                        textShadow: "3px 3px 3px #ababab",
                      }}
                      colSpan={2}
                    >
                      Presentees
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentDetail
                    .filter((presentees) => presentees.is_present === true)
                    .map((students, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell align="center">
                            <Toolbar>
                              <Avatar src={students.image?.full_size} onClick={()=>navigateTo(`/studentprofile/${students.id}`)}/>
                              <Typography sx={{ ml: "5%" }} onClick={()=>navigateTo(`/studentprofile/${students.id}`)}>
                                {students.name}
                              </Typography>
                            </Toolbar>
                          </TableCell>
                          <TableCell align="center">
                            {students.roll_no}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            ) : (
              <></>
            )}

            {studentDetail.filter((absentees) => absentees.is_present === false)
              .length !== 0 ? (
              <Table
                sx={{ height: "100%", width: "50%", marginTop: "50px" }}
                align="center"
              >
                <TableHead>
                  {studentDetail.filter((detail) => detail.is_present === true)
                    .length === 0 && (
                    <TableRow align="center">
                      <TableCell>Student</TableCell>
                      <TableCell>Roll No</TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{
                        color: "red",
                        fontSize: "18px",
                        textShadow: "3px 3px 3px #ababab",
                      }}
                      colSpan={2}
                    >
                      Absentees
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentDetail
                    .filter((absentees) => absentees.is_present === false)
                    .map((students, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell align="center">
                            <Toolbar>
                              <Avatar src={students.image?.full_size} onClick={()=>navigateTo(`/studentprofile/${students.id}`)}/>
                              <Typography sx={{ ml: "5%" }} onClick={()=>navigateTo(`/studentprofile/${students.id}`)}>
                                {students.name}
                              </Typography>
                            </Toolbar>
                          </TableCell>
                          <TableCell align="center">
                            {students.roll_no}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            ) : (
              <></>
            )}
            <br />
            <Fab
              onClick={submitAttendance}
              variant="extended"
              sx={{
                textTransform: "none",
                mt: "1%",
                mb: "1%",
                bgcolor: "#232E48",
                color: "white",
              }}
              className="btn"
            >
              Submit
            </Fab>
            <ModalComponent
              modalOpen={modalOpen}
              handleClose={() => handleClose()}
              modalValue={
                <>
                  <p align="center">
                    <b>Are you sure</b>
                  </p>
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
                      onClick={post}
                      disabled={buttonView}
                    >
                      yes
                    </Fab>
                    &nbsp; &nbsp;
                    <Fab
                      sx={{
                        textTransform: "none",
                        bgcolor: "#232E48",
                        color: "white",
                      }}
                      variant="extended"
                      className="btn"
                      onClick={() => setModalOpen(false)}
                      disabled={buttonView}
                    >
                      No
                    </Fab>
                  </center>
                </>
              }
            />
          </Card>
        </center>
      </Box>
    </div>
  );
}
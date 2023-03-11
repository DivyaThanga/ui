import React, { useState, useEffect } from "react";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Fab,
  Toolbar,
} from "@mui/material";
import { ExpandMoreOutlined } from "@mui/icons-material";
import { Refresh, Search } from "@mui/icons-material";
import { format } from "date-fns";

import {
  attendanceStatusApiCall,
  subjectListApicall,
  classesLists,
} from "../../../Apicall";
import Loader from "../../../Components/Loader";

export default function AttendanceStatus() {
  const [load, setLoad] = useState(false);
  const [loader, setLoader] = useState(false);
  const [classLists, setClassLists] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [subjectId, setSubjectId] = useState([]);
  const [classId, setClassId] = useState([]);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpanded1] = useState(false);

  const tokenData = JSON.parse(localStorage.getItem("tokens"));
  const header = { headers: { Authorization: `Bearer ${tokenData.access}` } };

  const getCurrentMarkedAttendance = () => {
    setLoad(true);
    classesLists(
      header,
      (response) => {
        setClassLists(response.data);
      },
      (error) => console.log(error)
    );

    subjectListApicall(
      header,
      (response) => {
        setSubjectList(response.data);
        setLoad(false);
      },
      (error) => {
        console.log(error);
        setLoad(false);
      }
    );
  };

  const handleSubjectName = (e) => {
    setSubjectName(e.target.value);
    const filterSubjects = subjectList
      .filter((el) => el.subject_name === e.target.value)
      .map((el) => el.id);
    setSubjectId(filterSubjects[0]);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleFilter = () => {
    setLoader(true);
    attendanceStatusApiCall(
      date,
      classId,
      subjectId,
      header,
      (response) => {
        setAttendanceData(response.data);
        setLoader(false);
      },
      (error) => {
        console.log(error);
        setLoader(false);
      }
    );
  };

  const handleAccordinChange = (class_name) => (event, isExpanded) => {
    setLoader(true);
    setExpanded(isExpanded ? class_name : false);

    const filterClasses = classLists
      .filter((el) => el.class_name === class_name)
      .map((el) => el.id);
    setClassId(filterClasses[0]);

    const currentDate = format(new Date(), "yyyy-MM-dd");
    setDate(currentDate);

    attendanceStatusApiCall(
      currentDate,
      filterClasses[0],
      subjectId,
      header,
      (response) => {
        setAttendanceData(response.data);
        setLoader(false);
      },
      (error) => {
        console.log(error);
        setLoader(false);
      }
    );
  };

  const handleAccordinChange1 = (subject_name) => (event, isExpanded) => {
    setLoader(true);
    setExpanded1(isExpanded ? subject_name : false);
  };
  console.log(
    "attendanceData ",
    attendanceData
      .filter(
        (el) =>
          el.subject_name === "General Principles of economics" &&
          el.is_present === false
      )
      .map((ele) => ele.student_name)
  );
  useEffect(() => {
    getCurrentMarkedAttendance();
  }, []);

  return (
    <div className="tableContent">
      <Loader load={load} />
      {load === false && (
        <>
          <center>
            <h1>Departments</h1>
          </center>
          <Toolbar sx={{ marginLeft: "70%" }}>
            <input
              type="date"
              name="date"
              value={date}
              onChange={handleDateChange}
              style={{
                padding: "15px",
                minWidth: "85px",
              }}
            />
            <Fab
              variant="circular"
              size="small"
              onClick={handleFilter}
              sx={{
                padding: "20px",
                textTransform: "none",
                bgcolor: "#232E48",
                ml: "3%",
                color: "white",
              }}
              className="btn"
            >
              <Search />
            </Fab>
            &nbsp;
            <Fab
              variant="circular"
              size="small"
              sx={{
                textTransform: "none",
                bgcolor: "#232E48",
                color: "white",
                ml: "1%",
              }}
              className="btn"
              onClick={() => {
                setDate("");
                setSubjectName("");
                setSubjectId("");
              }}
            >
              <Refresh />
            </Fab>
          </Toolbar>
          {classLists?.length !== 0 && (
            <>
              {classLists.map((el) => {
                return (
                  <div style={{ padding: "10px" }}>
                    <center>
                      <Accordion
                        expanded={expanded === el.class_name}
                        onChange={handleAccordinChange(el.class_name)}
                        sx={{
                          width: "800px",
                          marginTop: "10px",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreOutlined />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          className="accordion"
                        >
                          <b>{el.class_name}</b>
                        </AccordionSummary>
                        <br />
                        <AccordionDetails>
                          {subjectList?.map((el) => (
                            <Accordion
                              expanded={expanded1 === el.subject_name}
                              onChange={handleAccordinChange1(el.subject_name)}
                              sx={{ width: "700px" }}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreOutlined />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className="accordion"
                              >
                                <b
                                  style={{ width: "70%", textAlign: "justify" }}
                                >
                                  {el.subject_name}
                                </b>
                                &nbsp;&nbsp;&nbsp;
                                <b>Present</b>
                                &nbsp;&nbsp;
                                {
                                  attendanceData
                                    .filter(
                                      (ele, index) =>
                                        ele.subject_name === el.subject_name
                                    )
                                    .filter(
                                      (status) => status.is_present === true
                                    ).length
                                }
                                &nbsp; &nbsp;&nbsp;&nbsp;
                                <b>Absent</b> &nbsp;&nbsp;
                                {
                                  attendanceData
                                    .filter(
                                      (ele, index) =>
                                        ele.subject_name === el.subject_name
                                    )
                                    .filter(
                                      (status) => status.is_present === false
                                    ).length
                                }
                              </AccordionSummary>
                              <AccordionDetails>
                                {attendanceData
                                  .filter(
                                    (ele) =>
                                      ele.subject_name === el.subject_name
                                  )
                                  .filter(
                                    (status) => status.is_present === false
                                  ).length !== 0 ? (
                                  <>
                                    <Table>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell colSpan={3} align="center">
                                            Absentees
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell align="center">
                                            Roll No
                                          </TableCell>
                                          <TableCell align="center">
                                            Name
                                          </TableCell>
                                          <TableCell align="center">
                                            Hour
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {attendanceData
                                          .filter(
                                            (ele) =>
                                              ele.subject_name ===
                                                el.subject_name &&
                                              ele.is_present === false
                                          )
                                          .map((stu) => {
                                            return (
                                              <TableRow>
                                                <TableCell align="center">
                                                  {stu.student_roll_no}
                                                </TableCell>
                                                <TableCell align="center">
                                                  {stu.student_name}
                                                </TableCell>
                                                <TableCell align="center">
                                                  {stu.timeslot}
                                                </TableCell>
                                              </TableRow>
                                            );
                                          })}
                                      </TableBody>
                                    </Table>
                                  </>
                                ) : (
                                  <b>No absentees today</b>
                                )}
                              </AccordionDetails>
                            </Accordion>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    </center>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
}

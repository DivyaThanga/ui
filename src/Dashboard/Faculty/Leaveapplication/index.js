import React, { useRef, useState, useEffect } from "react";

import {
  Avatar,
  Fab,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

// import TablePaginations from "../../../Components/Tablepagination";
import { facultyLeaveApproveApiCall } from "../../../Apicall";
import { facultyLeaveApproval } from "../../../Apicall";
import ModalComponent from "../../../Components/Modal";
import Loader from "../../../Components/Loader";
import { useNavigate } from "react-router-dom";

export default function LeaveApplication() {
  const [studentData, setStudentData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  // const [pages, setPages] = useState(1);
  // const [pageIndex, setPageIndex] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  const [remark, setRemark] = useState("");
  const [remarkError, setRemarkError] = useState(false);
  const [id, setId] = useState("");
  const [load, setLoad] = useState(false);
  const [remarkView, setRemarkView] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [details, setDetails] = useState({});
  const [formView, setFormView] = useState(false);

  const navigateTo = useNavigate();

  const handleRemark = useRef();

  const tokenData = JSON.parse(localStorage.getItem("tokens"));
  const header = { headers: { Authorization: `Bearer ${tokenData.access}` } };

  const fetchFacultyApprove = () => {
    setLoad(true);
    facultyLeaveApproveApiCall(
      header,
      (response) => {
        setStudentData(response.data);
        setFilterData(
          response.data.filter((detail) => detail.status === "pending")
        );
        setLoad(false);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleAccept = (e, id, details, index) => {
    e.preventDefault();
    setRemarkView(false);
    let updatedObjects = studentData.map((student) => {
      if (student.id === id) {
        student["status"] = "approved";
        return student;
      } else {
        return student;
      }
    });
    setStudentData(updatedObjects);

    let agreed = studentData.map((student) => {
      if (student.id === id) {
        student["status"] = "approved";
        return student;
      } else {
        return student;
      }
    });

    let data = agreed.filter((el) => el.id === id);
    facultyLeaveApproval(
      id,
      data[0],
      header,
      (response) => {
        fetchFacultyApprove();
        setModalOpen(true);
        setErrorMsg(true);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleClick = (detail, id) => {
    navigateTo(`/leaveapplication/${id}`);
  };

  const handleReject = (e, id, details) => {
    e.preventDefault();
    setRemarkView(true);
    let updatedObjects = filterData.map((student) => {
      if (student.id === id) {
        student["status"] = "rejected";
        return student;
      } else {
        return student;
      }
    });
    setFilterData(updatedObjects);
  };

  const captureRemark = (e) => {
    e.preventDefault();
    setRemark(e.target.value);
    if (e.target.name === "Remark" && e.target.value !== "") {
      setRemarkError(false);
    }
  };

  const postRemark = (event, id, details) => {
    setLoad(true);
    event.preventDefault();
    if (remark === "") {
      setRemarkError(true);
      handleRemark.focus();
    } else {
      let updatedObjects = filterData.map((student) => {
        if (student.id === id) {
          student["status"] = "rejected";
          return student;
        } else {
          return student;
        }
      });
      setFilterData(updatedObjects);

      let remarked = filterData.map((student) => {
        if (student.id === id) {
          student["remark"] = remark;
          return student;
        } else {
          return student;
        }
      });

      let data = remarked.filter((el) => el.id === id);
      facultyLeaveApproval(
        id,
        data[0],
        header,
        (response) => {
          fetchFacultyApprove();
          setRemarkView(false);
          setErrorMsg(true);
          setLoad(false);
          setModalOpen(true);
        },
        (error) => {
          console.log(error);
        }
      );
      setRemark("");
    }
  };

  const handleStudentProfile = (id) => {
    navigateTo(`/studentprofile/${id}`);
  };

  useEffect(() => {
    fetchFacultyApprove();
  }, []);

  // useEffect(() => {
  //   setPages(1);
  //   setPageIndex(0);
  // }, [rowsPerPage]);

  return (
    <div className="tableContent">
      <Loader load={load} />
      <br />
      {load === false && (
        <Fab
          sx={{
            ml: "90%",
            textTransform: "none",
            mb: "1%",
            bgcolor: "#232E48",
            color: "white",
          }}
          className="btn"
          variant="extended"
          onClick={() => navigateTo("/leavehistory")}
        >
          History
        </Fab>
      )}
      {filterData.length !== 0 && load === false ? (
        <>
          <center>
            <TableContainer sx={{ maxWidth: "1200px" }}>
              <Table sx={{ mt: "20px", mb: "20px" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">No</TableCell>
                    <TableCell align="center">Student</TableCell>
                    <TableCell align="center">Applied Date</TableCell>
                    <TableCell align="center">Status</TableCell>
                    {remarkView && (
                      <TableCell align="center">Remarks</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterData
                    // .slice(
                    //   pageIndex * rowsPerPage,
                    //   pageIndex * rowsPerPage + rowsPerPage
                    // )
                    .map((details, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">
                            <Toolbar sx={{ ml: "30%" }}>
                              <Avatar
                                src={details.image?.full_size}
                                onClick={() => handleStudentProfile(details.student_id)}
                                sx={{ cursor: "pointer" }}
                              />
                              <Typography
                                sx={{ ml: "3%", cursor: "pointer" }}
                                onClick={() => handleStudentProfile(details.student_id)}
                              >
                                {details.student_name}
                              </Typography>
                            </Toolbar>
                          </TableCell>
                          <TableCell
                            align="center"
                            onClick={() => handleClick(details, details.id)}
                          >
                            {details.applied_date}
                          </TableCell>
                          <TableCell align="center">
                            {details.status === "pending" && (
                              <>
                                <IconButton
                                  name={details.id}
                                  onClick={(e) =>
                                    handleAccept(e, details.id, details, index)
                                  }
                                >
                                  <DoneIcon fontSize="large" color="success" />
                                </IconButton>
                                <IconButton
                                  name={details.id}
                                  onClick={(e) =>
                                    handleReject(e, details.id, details)
                                  }
                                >
                                  <CloseIcon fontSize="large" color="error" />
                                </IconButton>
                              </>
                            )}
                            {details.status === "approved" && (
                              <IconButton
                                name={details.id}
                                onClick={(e) =>
                                  handleAccept(e, details.id, details, index)
                                }
                              >
                                <DoneIcon fontSize="large" color="success" />
                              </IconButton>
                            )}
                            {details.status === "rejected" && (
                              <IconButton
                                sx={{ ml: "-3%" }}
                                name={details.id}
                                onClick={(e) =>
                                  handleReject(e, details.id, details)
                                }
                              >
                                <CloseIcon fontSize="large" color="error" />
                              </IconButton>
                            )}
                          </TableCell>
                          {remarkView && (
                            <TableCell align="center">
                              {details.status === "rejected" &&
                              details.remark === null ? (
                                <>
                                  <form
                                    onSubmit={(event) =>
                                      postRemark(event, details.id, details)
                                    }
                                  >
                                    <TextField
                                      multiline
                                      onChange={captureRemark}
                                      name="Remark"
                                      inputRef={handleRemark}
                                    />
                                    {remarkError ? (
                                      <Typography color="error">
                                        Please enter the remarks
                                      </Typography>
                                    ) : (
                                      <></>
                                    )}
                                    <IconButton sx={{ mt: "3%" }} type="submit">
                                      <SendIcon />
                                    </IconButton>
                                  </form>
                                </>
                              ) : (
                                ""
                              )}
                              {details.remark !== "" && details.remark}
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
              {/* <TablePaginations
          data={studentsDetails}
          pages={pages}
          rowsPerpage={rowsPerPage}
          pageIndex={pageIndex}
          setPages={setPages}
          setPageIndex={setPageIndex}
          setRowsPerPage={setRowsPerPage}
        /> */}
            </TableContainer>
          </center>
        </>
      ) : (
        <>
          {load === false && (
            <Typography align="center">
              <b>No pending request for you</b>
            </Typography>
          )}
        </>
      )}
      <ModalComponent
        modalOpen={modalOpen}
        modalValue={
          <>
            {errorMsg && (
              <>
                <Typography align="center">
                  You responded to the leave request
                </Typography>

                <center>
                  <Fab
                    variant="extended"
                    onClick={() => setModalOpen(false)}
                    sx={{
                      align: "center",
                      textTransform: "none",
                      mt: "2%",
                      bgcolor: "#232E48",
                      color: "white",
                    }}
                    className="btn"
                  >
                    Close
                  </Fab>
                </center>
              </>
            )}
          </>
        }
      />
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  Toolbar,
  Typography,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import {
  studentsProfiles,
  deleteStudents,
  facultyProfiles,
  facultyClassView,
} from "../../../Apicall";
import ModalComponent from "../../../Components/Modal";
import TablePaginations from "../../../Components/Tablepagination";
import Loader from "../../../Components/Loader";

const tableHeaders = ["Roll No", "Student", "Reg No", "Actions"];

export default function Student() {
  const [load, setLoad] = useState(false);
  const [facultyProfile, setFacultyProfile] = useState([]);
  const [facultyClass, setFacultyClass] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [id, setId] = useState("");
  const [classId, setClassId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [pages, setPages] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [buttonView, setButtonView] = useState(false);

  const navigateTo = useNavigate();

  const tokenData = JSON.parse(localStorage.getItem("tokens"));
  const header = { headers: { Authorization: `Bearer ${tokenData.access}` } };

  const studentProfile = (id) => {
    navigateTo(`/studentprofile/${id}`);
  };

  const addStudent = () => {
    navigateTo("/addStudent");
  };

  const fetchFacultyDetail = () => {
    setLoad(true);
    facultyProfiles(
      header,
      (response) => {
        setFacultyProfile(response.data);
        setId(response.data[0].id);
      },
      (error) => console.log(error)
    );
  };

  const fetchFacultysClass = () => {
    facultyClassView(
      id,
      header,
      (response) => {
        setFacultyClass(response.data);
        setClassId(response.data[0].id);
      },
      (error) => console.log(error)
    );
  };

  const getStudentList = () => {
    setLoad(true);
    studentsProfiles(
      id,
      header,
      (response) => {
        setStudentData(response.data);
        setLoad(false);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleDelete = (e, id) => {
    setStudentId(id);
    setModalOpen(true);
  };

  const deleteStudent = () => {
    setButtonView(true);
    deleteStudents(
      studentId,
      header,
      (response) => {
        setModalOpen(false);
        getStudentList();
      },
      (error) => {
        setButtonView(false);
        console.log(error);
      }
    );
  };

  useEffect(() => {
    fetchFacultyDetail();
  }, []);

  useEffect(() => {
    if (facultyProfile.length !== 0) {
      fetchFacultysClass();
    }
  }, [facultyProfile]);

  useEffect(() => {
    if (facultyClass.length !== 0) {
      getStudentList();
    }
  }, [facultyClass]);

  useEffect(() => {
    setPages(1);
    setPageIndex(0);
  }, [rowsPerPage]);

  return (
    <div className="tableContent">
      <Loader load={load} />
      {studentData.length !== 0 && load === false && (
        <TableContainer>
          <PersonAddIcon
            className="personIcon"
            sx={{ width: "3%", height: "3%" }}
            onClick={() => addStudent()}
          />

          <Table>
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => {
                  return <TableCell align="center">{header}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {studentData
                .slice(
                  pageIndex * rowsPerPage,
                  pageIndex * rowsPerPage + rowsPerPage
                )
                .map((details, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{details.roll_no}</TableCell>
                      <TableCell align="center">
                        <Toolbar sx={{ ml: "38%" }}>
                          <Avatar
                            src={details.image?.full_size}
                            onClick={() => studentProfile(details.id)}
                            sx={{ cursor: "pointer" }}
                          />

                          <Typography
                            sx={{
                              ml: "3%",
                              textTransform: "capitalize",
                              cursor: "pointer",
                            }}
                            onClick={() => studentProfile(details.id)}
                          >
                            {details.name}
                          </Typography>
                        </Toolbar>
                      </TableCell>
                      <TableCell align="center">{details.student_id}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={(e) => handleDelete(e, details.id)}
                        >
                          <DeleteForeverIcon sx={{ color: "red" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePaginations
            data={studentData}
            pages={pages}
            rowsPerpage={rowsPerPage}
            pageIndex={pageIndex}
            setPages={setPages}
            setPageIndex={setPageIndex}
            setRowsPerPage={setRowsPerPage}
          />
        </TableContainer>
      )}
      <ModalComponent
        modalOpen={modalOpen}
        modalValue={
          <center>
            <h3>
              <b>Are you sure?</b>
            </h3>
            <br />
            <Fab
              variant="extended"
              onClick={deleteStudent}
              sx={{
                align: "center",
                textTransform: "none",
                bgcolor: "#232E48",
                color: "white",
              }}
              disabled={buttonView}
              className="btn"
            >
              Yes
            </Fab>
            <Fab
              variant="extended"
              onClick={() => setModalOpen(false)}
              sx={{
                align: "center",
                textTransform: "none",
                ml: "2%",
                bgcolor: "#232E48",
                color: "white",
              }}
              disabled={buttonView}
              className="btn"
            >
              No
            </Fab>
          </center>
        }
      />
    </div>
  );
}

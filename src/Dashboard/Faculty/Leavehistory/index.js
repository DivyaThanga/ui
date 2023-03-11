import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Close from "@mui/icons-material/Close";
import Done from "@mui/icons-material/Done";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  Toolbar,
} from "@mui/material";

import { facultyLeaveApproveApiCall } from "../../../Apicall";
import Loader from "../../../Components/Loader";

const tableHeaders = ["No", "Student", "Applied Date", "Status"];

export default function LeaveHistory() {
  const [studentData, setStudentData] = useState([]);
  const [load, setLoad] = useState(false);

  const navigateTo = useNavigate();

  const tokenData = JSON.parse(localStorage.getItem("tokens"));
  const header = { headers: { Authorization: `Bearer ${tokenData.access}` } };

  const fetchFacultyApprove = () => {
    setLoad(true);
    facultyLeaveApproveApiCall(
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

  const handleStudentProfile = (id) => {
    navigateTo(`/studentprofile/${id}`);
  };

  useEffect(() => {
    fetchFacultyApprove();
  }, []);

  return (
    <div className="tableContent">
      <Loader load={load} />
      {studentData.length !== 0 ? (
        <center>
          <TableContainer sx={{ maxWidth: "1200px" }}>
            <Table sx={{ mt: "20px", mb: "20px" }}>
              <TableHead>
                <TableRow>
                  {tableHeaders.map((header) => {
                    return <TableCell align="center">{header}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {studentData.map((details, index) => {
                  return (
                    <TableRow>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">
                        <Toolbar sx={{ ml: "30%" }}>
                          <Avatar
                            src={details.image?.full_size}
                            sx={{ cursor: "pointer" }}
                            onClick={() =>
                              handleStudentProfile(details.student_id)
                            }
                          />
                          <Typography
                            sx={{ ml: "3%", cursor: "pointer" }}
                            onClick={() =>
                              handleStudentProfile(details.student_id)
                            }
                          >
                            {details.student_name}
                          </Typography>
                        </Toolbar>
                      </TableCell>
                      <TableCell align="center">
                        {details.applied_date}
                      </TableCell>
                      <TableCell align="center">
                        {details.status === "approved" ? (
                          <Done color="success" />
                        ) : (
                          <Close color="error" />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </center>
      ) : (
        load === false && (
          <center>
            <Typography sx={{ marginTop: "5%", marginBottom: "5%" }}>
              <b>No results found</b>
            </Typography>
          </center>
        )
      )}
    </div>
  );
}
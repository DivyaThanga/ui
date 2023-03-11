import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { TextField } from "@mui/material";

import { facultyLeaveApproveApiCall } from "../../../Apicall";
import Loader from "../../../Components/Loader";

export default function ParticularLeaveDetail() {
  const [studentData, setStudentData] = useState([]);
  const [load, setLoad] = useState(false);

  const { id } = useParams();

  const tokenData = JSON.parse(localStorage.getItem("tokens"));
  const header = { headers: { Authorization: `Bearer ${tokenData.access}` } };

  const fetchFacultyApprove = () => {
    setLoad(true);
    facultyLeaveApproveApiCall(
      header,
      (response) => {
        setStudentData(response.data.filter((detail) => detail.id === id));
        console.log(response.data.filter((detail) => detail.id === id));
        setLoad(false);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    fetchFacultyApprove();
  }, []);

  return (
    <div className="tableContent">
      <Loader load={load} />
      {studentData.length !== 0 &&
        studentData.map((detail) => {
          return (
            <>
              <center>
                <TextField value={detail.from_date}></TextField> &nbsp; &nbsp;
                <TextField value={detail.to_date}></TextField>
                <br />
                <br />
                <TextField value={detail.reason}></TextField> &nbsp; &nbsp;
                <TextField value={detail.type}></TextField>
              </center>
            </>
          );
        })}
    </div>
  );
}
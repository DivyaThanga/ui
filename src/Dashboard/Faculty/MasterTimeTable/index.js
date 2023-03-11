import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { facultyMasterTimeTableAPiCall } from "../../../Apicall";
import Loader from "../../../Components/Loader";

const timeslots = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export default function MasterTimetable() {
  const [timeTable, setTimeTable] = useState([]);
  const [load, setLoad] = useState(false);

  const tokenData = JSON.parse(localStorage.getItem("tokens"));
  const header = { headers: { Authorization: `Bearer ${tokenData.access}` } };

  const fetchTimetable = () => {
    setLoad(true);
    facultyMasterTimeTableAPiCall(
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

  useEffect(() => {
    fetchTimetable();
  }, []);

  return (
    <div className="tableContent">
      <Loader load={load} />
      {timeTable.length !== 0 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell rowSpan={3} align="center">
                  Day
                </TableCell>
                {timeslots.map((slots) => {
                  return <TableCell align="center">{slots}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <b>Monday</b>
                </TableCell>
                {timeTable
                  .filter((el) => el.day === "1")
                  .map((ele) => {
                    return (
                      <TableCell align="center">
                        {ele.subject.subject_name}
                      </TableCell>
                    );
                  })}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <b>Tuesday</b>
                </TableCell>
                {timeTable
                  .filter((el) => el.day === "2")
                  .map((ele) => {
                    return (
                      <TableCell align="center">
                        {ele.subject.subject_name}
                      </TableCell>
                    );
                  })}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <b>Wednesday</b>
                </TableCell>
                {timeTable
                  .filter((el) => el.day === "3")
                  .map((ele) => {
                    return (
                      <TableCell align="center">
                        {ele.subject.subject_name}
                      </TableCell>
                    );
                  })}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <b>Thursday</b>
                </TableCell>
                {timeTable
                  .filter((el) => el.day === "4")
                  .map((ele) => {
                    return (
                      <TableCell align="center">
                        {ele.subject.subject_name}
                      </TableCell>
                    );
                  })}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <b>Friday</b>
                </TableCell>
                {timeTable
                  .filter((el) => el.day === "5")
                  .map((ele) => {
                    return (
                      <TableCell align="center">
                        {ele.subject.subject_name}
                      </TableCell>
                    );
                  })}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <b>Saturday</b>
                </TableCell>
                {timeTable
                  .filter((el) => el.day === "6")
                  .map((ele) => {
                    return (
                      <TableCell align="center">
                        {ele.subject.subject_name}
                      </TableCell>
                    );
                  })}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

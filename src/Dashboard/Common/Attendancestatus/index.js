import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import TablePaginations from "../../../Components/Tablepagination";

const studentsDetails = [
  {
    id: 1,
    name: "George",
    registerid: 863311,
    avatar: "https://reqres.in/img/faces/1-image.jpg",
    contact: 9788906757,
    time: "11.00 - 12.00",
    attendance: "Present",
  },
  {
    id: 2,
    name: "Janet",
    registerid: 863312,
    avatar: "https://reqres.in/img/faces/2-image.jpg",
    contact: 9788906757,
    time: "11.00 - 12.00",
    attendance: "Present",
  },
  {
    id: 3,
    name: "Emma",
    registerid: 863313,
    avatar: "https://reqres.in/img/faces/3-image.jpg",
    contact: 9788906757,
    time: "11.00 - 12.00",
    attendance: "Present",
  },
  {
    id: 4,
    name: "Yuraj",
    registerid: 863314,
    avatar: "https://reqres.in/img/faces/4-image.jpg",
    contact: 9788906757,
    time: "11.00 - 12.00",
    attendance: "Absent",
  },
  {
    id: 5,
    name: "Charles",
    registerid: 863315,
    avatar: "https://reqres.in/img/faces/5-image.jpg",
    contact: 9788906757,
    time: "11.00 - 12.00",
    attendance: "Absent",
  },
  {
    id: 6,
    name: "Tracey",
    registerid: 863316,
    avatar: "https://reqres.in/img/faces/6-image.jpg",
    contact: 9788906757,
    time: "11.00 - 12.00",
    attendance: "Present",
  },
  {
    id: 7,
    name: "Jully",
    registerid: 863317,
    avatar: "https://reqres.in/img/faces/12-image.jpg",
    contact: 9788906757,
    time: "11.00 - 12.00",
    attendance: "Present",
  },
  {
    id: 8,
    name: "Bravo",
    registerid: 863318,
    avatar: "https://reqres.in/img/faces/11-image.jpg",
    contact: 9788906757,
    time: "11.00 - 12.00",
    attendance: "Absent",
  },
  {
    id: 9,
    name: "Smith",
    registerid: 863319,
    avatar: "https://reqres.in/img/faces/10-image.jpg",
    contact: 9788906757,
    time: "11.00 - 12.00",
    attendance: "Present",
  },
  {
    id: 10,
    name: "Decock",
    registerid: 863320,
    avatar: "https://reqres.in/img/faces/9-image.jpg",
    contact: 9788906757,
    time: "11.00 - 12.00",
    attendance: "Present",
  },
];

export default function AttendanceStatus() {
  const [pages, setPages] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setPages(1);
    setPageIndex(0);
  }, [rowsPerPage]);

  return (
    <div className="tableContent">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Students</TableCell>
              <TableCell>Roll No :</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Register No</TableCell>
              <TableCell>Contact No</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Attendance</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsDetails
              .slice(
                pageIndex * rowsPerPage,
                pageIndex * rowsPerPage + rowsPerPage
              )
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Avatar src={row.avatar} />
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.registerid}</TableCell>
                  <TableCell>{row.contact}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  {row.attendance === "Present" ? (
                    <TableCell style={{ color: "green" }}>
                      {row.attendance}
                    </TableCell>
                  ) : (
                    <TableCell style={{ color: "red" }}>
                      {row.attendance}
                    </TableCell>
                  )}
                  <TableCell>
                    <MoreVertIcon />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* This component is imported for table pagination  */}
        <TablePaginations
          data={studentsDetails}
          pages={pages}
          rowsPerpage={rowsPerPage}
          pageIndex={pageIndex}
          setPages={setPages}
          setPageIndex={setPageIndex}
          setRowsPerPage={setRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

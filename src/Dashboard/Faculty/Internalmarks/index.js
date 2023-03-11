import React, { useEffect, useState } from "react";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import TablePaginations from "../../../Components/Tablepagination";

const studentsDetails = [
  {
    id: 1,
    name: "George",
    registerid: 863311,
    avatar: "https://reqres.in/img/faces/1-image.jpg",
    tamil: 80,
    english: 87,
    maths: 90,
    science: 96,
    social: 80,
  },
  {
    id: 2,
    name: "Janet",
    registerid: 863312,
    avatar: "https://reqres.in/img/faces/2-image.jpg",
    tamil: 80,
    english: 87,
    maths: 90,
    science: 96,
    social: 80,
  },
  {
    id: 3,
    name: "Emma",
    registerid: 863313,
    avatar: "https://reqres.in/img/faces/3-image.jpg",
    tamil: 80,
    english: 87,
    maths: 90,
    science: 96,
    social: 80,
  },
  {
    id: 4,
    name: "Yuraj",
    registerid: 863314,
    avatar: "https://reqres.in/img/faces/4-image.jpg",
    tamil: 80,
    english: 87,
    maths: 90,
    science: 96,
    social: 80,
  },
  {
    id: 5,
    name: "Charles",
    registerid: 863315,
    avatar: "https://reqres.in/img/faces/5-image.jpg",
    tamil: 80,
    english: 87,
    maths: 90,
    science: 96,
    social: 80,
  },
  {
    id: 6,
    name: "Tracey",
    registerid: 863316,
    avatar: "https://reqres.in/img/faces/6-image.jpg",
    tamil: 80,
    english: 87,
    maths: 90,
    science: 96,
    social: 80,
  },
  {
    id: 7,
    name: "Jully",
    registerid: 863317,
    avatar: "https://reqres.in/img/faces/12-image.jpg",
    tamil: 80,
    english: 87,
    maths: 90,
    science: 96,
    social: 80,
  },
  {
    id: 8,
    name: "Bravo",
    registerid: 863318,
    avatar: "https://reqres.in/img/faces/11-image.jpg",
    tamil: 80,
    english: 87,
    maths: 90,
    science: 96,
    social: 80,
  },
  {
    id: 9,
    name: "Smith",
    registerid: 863319,
    avatar: "https://reqres.in/img/faces/10-image.jpg",
    tamil: 80,
    english: 87,
    maths: 90,
    science: 96,
    social: 80,
  },
  {
    id: 10,
    name: "Decock",
    registerid: 863320,
    avatar: "https://reqres.in/img/faces/9-image.jpg",
    tamil: 80,
    english: 87,
    maths: 90,
    science: 96,
    social: 80,
  },
];

export default function InternalMarks() {
  const [pages, setPages] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setPages(1);
    setPageIndex(0);
  }, [rowsPerPage]);

  return (
    <div className="tableContent">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Students</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Register Id</TableCell>
              <TableCell>Tamil</TableCell>
              <TableCell>English</TableCell>
              <TableCell>Maths</TableCell>
              <TableCell>Science</TableCell>
              <TableCell>Social</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsDetails
              .slice(
                pageIndex * rowsPerPage,
                pageIndex * rowsPerPage + rowsPerPage
              )
              .map((student) => {
                return (
                  <TableRow key={student.name}>
                    <TableCell>
                      <Avatar src={student.avatar} alt="pic" />
                    </TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.registerid}</TableCell>
                    <TableCell>{student.tamil}</TableCell>
                    <TableCell>{student.english}</TableCell>
                    <TableCell>{student.maths}</TableCell>
                    <TableCell>{student.science}</TableCell>
                    <TableCell>{student.social}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
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

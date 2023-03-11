import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import TablePaginations from "../../../Components/Tablepagination";

const holidays = [
  {
    no: 1,
    date: "26/01/2023",
    holidayDescription: "Republic Day",
  },
  {
    no: 2,
    date: "15/08/2023",
    holidayDescription: "Independance Day",
  },
  {
    no: 3,
    date: "02/10/2023",
    holidayDescription: "Gandhi Jeyandhi",
  },
  {
    no: 4,
    date: "25/12/2023",
    holidayDescription: "Christmas",
  },
  {
    no: 5,
    date: "01/01/2023",
    holidayDescription: "New Year",
  },
  {
    no: 6,
    date: "14/04/2023",
    holidayDescription: "Tamil New Year",
  },
  {
    no: 7,
    date: "14/01/2023",
    holidayDescription: "Pongal",
  },
  {
    no: 8,
    date: "31/08/2023",
    holidayDescription: "Ganesh Chaturthi",
  },
  {
    no: 9,
    date: "10/11/2023",
    holidayDescription: "Diwali",
  },
  {
    no: 10,
    date: "07/04/2023",
    holidayDescription: "Good Friday",
  },
];

export default function Holidays() {
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
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Holiday Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holidays
              .slice(
                pageIndex * rowsPerPage,
                pageIndex * rowsPerPage + rowsPerPage
              )
              .map((holiday) => {
                return (
                  <TableRow key={holiday.no}>
                    <TableCell align="center">{holiday.no}</TableCell>
                    <TableCell align="center">{holiday.date}</TableCell>
                    <TableCell align="center">
                      {holiday.holidayDescription}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {/* This component is imported for table pagination */}
        <TablePaginations
          data={holidays}
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

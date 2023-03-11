import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import TablePaginations from "../../../Components/Tablepagination";
import ModalComponent from "../../../Components/Modal";

const announcements = [
  {
    no: 1,
    date: "26/01/2023",
    Description: "Republic Day",
  },
  {
    no: 2,
    date: "15/08/2023",
    Description: "Independance Day",
  },
  {
    no: 3,
    date: "02/10/2023",
    Description: "Gandhi Jeyandhi",
  },
  {
    no: 4,
    date: "25/12/2023",
    Description: "Christmas",
  },
  {
    no: 5,
    date: "01/01/2023",
    Description: "New Year",
  },
  {
    no: 6,
    date: "14/04/2023",
    Description: "Tamil New Year",
  },
  {
    no: 7,
    date: "14/01/2023",
    Description: "Pongal",
  },
  {
    no: 8,
    date: "31/08/2023",
    Description: "Ganesh Chaturthi",
  },
  {
    no: 9,
    date: "10/11/2023",
    Description: "Diwali",
  },
  {
    no: 10,
    date: "07/04/2023",
    Description: "Good Friday",
  },
];
export default function Announcements() {
  const [modalOpen, setModalOpen] = useState(false);
  const [pages, setPages] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    setPages(1);
    setPageIndex(0);
  }, [rowsPerPage]);

  return (
    <div className="tableContent">
      <TableContainer>
        <Table border={2}>
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Announcements Description</TableCell>
              <TableCell align="center">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {announcements
              .slice(
                pageIndex * rowsPerPage,
                pageIndex * rowsPerPage + rowsPerPage
              )
              .map((announcement) => {
                return (
                  <TableRow key={announcement.no}>
                    <TableCell align="center">{announcement.no}</TableCell>
                    <TableCell align="center">{announcement.date}</TableCell>
                    <TableCell align="center">
                      {announcement.Description}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        sx={{ textTransform: "none" }}
                        onClick={handleOpen}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePaginations
          data={announcements}
          pages={pages}
          rowsPerpage={rowsPerPage}
          pageIndex={pageIndex}
          setPages={setPages}
          setPageIndex={setPageIndex}
          setRowsPerPage={setRowsPerPage}
        />
      </TableContainer>
      <ModalComponent
        modalOpen={modalOpen}
        handleClose={handleClose}
        modalValue={<p>All the announcements are made by institution</p>}
      />
    </div>
  );
}

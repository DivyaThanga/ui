import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  TableContainer,
} from "@mui/material";

import ModalComponent from "../../../Components/Modal";
import TablePaginations from "../../../Components/Tablepagination";

const events = [
  {
    no: 1,
    date: "23/09/2023",
    events_Description: "Techsis",
  },
  {
    no: 2,
    date: "23/09/2023",
    events_Description: "Techsis",
  },
  {
    no: 3,
    date: "23/09/2023",
    events_Description: "Techsis",
  },
  {
    no: 4,
    date: "23/09/2023",
    events_Description: "Techsis",
  },
  {
    no: 5,
    date: "23/09/2023",
    events_Description: "Techsis",
  },
  {
    no: 6,
    date: "23/09/2023",
    events_Description: "Techsis",
  },
  {
    no: 7,
    date: "23/09/2023",
    events_Description: "Techsis",
  },
  {
    no: 8,
    date: "23/09/2023",
    events_Description: "Techsis",
  },
  {
    no: 9,
    date: "23/09/2023",
    events_Description: "Techsis",
  },
  {
    no: 10,
    date: "23/09/2023",
    events_Description: "Techsis",
  },
];

export default function Events() {
  const [modalOpen, setModalOpen] = useState(false);
  const [pages, setPages] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleClick = () => {
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
              <TableCell align="center">Event Description</TableCell>
              <TableCell align="center">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events
              .slice(
                pageIndex * rowsPerPage,
                pageIndex * rowsPerPage + rowsPerPage
              )
              .map((event) => {
                return (
                  <TableRow key={event.no}>
                    <TableCell align="center">{event.no}</TableCell>
                    <TableCell align="center">{event.date}</TableCell>
                    <TableCell align="center">
                      {event.events_Description}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        sx={{ textTransform: "none" }}
                        onClick={handleClick}
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
          data={events}
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
        modalValue={
          <>
            <center>
              <Typography variant="h6">Techincal Events :</Typography>
              <br />
              <Typography>debugging</Typography>
              <br />
              <Typography>Quiz</Typography>
              <br />
              <Typography>Paper Presentation</Typography>
              <br />
              <Typography>Web Designing</Typography>
              <br />
              <br />
              <Typography variant="h6">Non Techincal Events :</Typography>
              <br />
              <Typography>As you like it</Typography>
              <br />
              <Typography>Tressure Hunt</Typography>
              <br />
            </center>
          </>
        }
      />
    </div>
  );
}

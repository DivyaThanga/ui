import React, { useEffect, useState } from "react";
import {
  Button,
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Avatar,
  Typography,
  TextField,
} from "@mui/material";

import ModalComponent from "../../../Components/Modal";
import TablePaginations from "../../../Components/Tablepagination";

const studentsDetails = [
  {
    id: 1,
    name: "George",
    registerid: 863311,
    avatar: "https://reqres.in/img/faces/1-image.jpg",
    contact: 9788906757,
    parents_no: "7898675647",
  },
  {
    id: 2,
    name: "Janet",
    registerid: 863312,
    avatar: "https://reqres.in/img/faces/2-image.jpg",
    contact: 9788906757,
    parents_no: "7898675647",
  },
  {
    id: 3,
    name: "Emma",
    registerid: 863313,
    avatar: "https://reqres.in/img/faces/3-image.jpg",
    contact: 9788906757,
    parents_no: "7898675647",
  },
  {
    id: 4,
    name: "Yuraj",
    registerid: 863314,
    avatar: "https://reqres.in/img/faces/4-image.jpg",
    contact: 9788906757,
    parents_no: "7898675647",
  },
  {
    id: 5,
    name: "Charles",
    registerid: 863315,
    avatar: "https://reqres.in/img/faces/5-image.jpg",
    contact: 9788906757,
    parents_no: "7898675647",
  },
  {
    id: 6,
    name: "Tracey",
    registerid: 863316,
    avatar: "https://reqres.in/img/faces/6-image.jpg",
    contact: 9788906757,
    parents_no: "7898675647",
  },
  {
    id: 7,
    name: "Jully",
    registerid: 863317,
    avatar: "https://reqres.in/img/faces/12-image.jpg",
    contact: 9788906757,
    parents_no: "7898675647",
  },
  {
    id: 8,
    name: "Bravo",
    registerid: 863318,
    avatar: "https://reqres.in/img/faces/11-image.jpg",
    contact: 9788906757,
    parents_no: "7898675647",
  },
  {
    id: 9,
    name: "Smith",
    registerid: 863319,
    avatar: "https://reqres.in/img/faces/10-image.jpg",
    contact: 9788906757,
    parents_no: "7898675647",
  },
  {
    id: 10,
    name: "Decock",
    registerid: 863320,
    avatar: "https://reqres.in/img/faces/9-image.jpg",
    contact: 9788906757,
    parents_no: "7898675647",
  },
];
export default function Message() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [pages, setPages] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpen = (name) => {
    setModalOpen(true);
    setName(name);
  };

  const handleClose = () => setModalOpen(false);

  const handleMessage = () => {
    setMessage("");
    setModalOpen(false);
  };

  useEffect(() => {
    setPages(1);
    setPageIndex(0);
  }, [rowsPerPage]);

  const messageFields = studentsDetails
    .filter((el) => el.name === name)
    .map((el) => (
      <>
        <Avatar src={el.avatar} alt="" />
        <br />
        <br />
        <Typography>Name : {el.name}</Typography>
        <br />
        <br />
        <Typography>Contact Number : {el.contact}</Typography>
        <br />
        <br />
        <Typography>Parents Number : </Typography>
        <TextField
          name="parents_number"
          variant="outlined"
          lable="Parents Number"
          value={el.parents_no}
          disabled
        />
        <br />
        <br />
        <Typography>Message : </Typography>
        <TextField
          name="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <br />
        <br />
        <Button onClick={handleMessage} sx={{ textTransform: "none" }}>
          Send
        </Button>
      </>
    ));

  return (
    <div className="tableContent">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Students</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Reg Number</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Parents Number </TableCell>
              <TableCell>Send Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsDetails
              .slice(
                pageIndex * rowsPerPage,
                pageIndex * rowsPerPage + rowsPerPage
              )
              .map((details, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Avatar src={details.avatar} />
                    </TableCell>
                    <TableCell>{details.name}</TableCell>
                    <TableCell>{details.registerid}</TableCell>
                    <TableCell>{details.contact}</TableCell>
                    <TableCell>{details.parents_no}</TableCell>
                    <TableCell>
                      <Button
                        sx={{ textTransform: "none" }}
                        onClick={() => handleOpen(details.name)}
                      >
                        Message
                      </Button>
                    </TableCell>
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
      <ModalComponent
        modalOpen={modalOpen}
        handleClose={handleClose}
        modalValue={messageFields}
      />
    </div>
  );
}

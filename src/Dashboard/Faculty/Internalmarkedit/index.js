import React, { useState } from "react";
import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import ResponsiveSelect from "../../../Components/Select";

const studentsDetails = [
  {
    id: 1,
    name: "George",
    registerid: 863311,
    avatar: "https://reqres.in/img/faces/1-image.jpg",
    class: "second",
    semester: "First",
  },
  {
    id: 2,
    name: "Janet",
    registerid: 863312,
    avatar: "https://reqres.in/img/faces/2-image.jpg",
    semester: "First",
    class: "second",
    internal: "First",
  },
  {
    id: 3,
    name: "Emma",
    registerid: 863313,
    avatar: "https://reqres.in/img/faces/3-image.jpg",
    semester: "First",
    class: "second",
    internal: "First",
  },
  {
    id: 4,
    name: "Yuraj",
    registerid: 863314,
    avatar: "https://reqres.in/img/faces/4-image.jpg",
    semester: "First",
    class: "second",
    internal: "First",
  },
  {
    id: 5,
    name: "Charles",
    registerid: 863315,
    avatar: "https://reqres.in/img/faces/5-image.jpg",
    semester: "First",
    class: "second",
    internal: "First",
  },
  {
    id: 6,
    name: "Tracey",
    registerid: 863316,
    avatar: "https://reqres.in/img/faces/6-image.jpg",
    semester: "First",
    class: "second",
    internal: "First",
  },
  {
    id: 7,
    name: "Jully",
    registerid: 863317,
    avatar: "https://reqres.in/img/faces/12-image.jpg",
    semester: "First",
    class: "second",
    internal: "First",
  },
  {
    id: 8,
    name: "Bravo",
    registerid: 863318,
    avatar: "https://reqres.in/img/faces/11-image.jpg",
    semester: "First",
    class: "second",
    internal: "First",
  },
  {
    id: 9,
    name: "Smith",
    registerid: 863319,
    avatar: "https://reqres.in/img/faces/10-image.jpg",
    semester: "First",
    class: "second",
    internal: "First",
  },
  {
    id: 10,
    name: "Decock",
    registerid: 863320,
    avatar: "https://reqres.in/img/faces/9-image.jpg",
    semester: "First",
    class: "second",
    internal: "First",
  },
];

const internalOption = ["First Internal", "Second Internal", "Third Internal"];
export default function InternalmarkEdit({ name, handleClose }) {
  const [value, setValue] = useState({
    tamil: 0,
    english: 0,
    maths: 0,
    science: 0,
    social: 0,
  });
  const [edit, setEdit] = useState(false);
  const [internal, setInternal] = useState("");

  const handleAdd = () => {
    setEdit(true);
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    console.log(value);
    handleClose();
  };

  return (
    <>
      <TableContainer>
        <ResponsiveSelect
          options={internalOption}
          selectValue={internal}
          inputLables={"Select Internal"}
          setSelectValue={setInternal}
        />
        <Table sx={{ border: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell rowSpan={2} align="center">
                Student
              </TableCell>
              <TableCell rowSpan={2} align="center">
                Name
              </TableCell>
              <TableCell rowSpan={2} align="center">
                Register ID
              </TableCell>
              <TableCell rowSpan={2} align="center">
                Class
              </TableCell>
              <TableCell colSpan={1} align="center">
                Subject
              </TableCell>
              <TableCell rowSpan={2} align="center">
                Add
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Tamil</TableCell>
              {/* <TableCell align="center">English</TableCell>
              <TableCell align="center">Maths</TableCell>
              <TableCell align="center">Science</TableCell>
              <TableCell align="center">Social</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsDetails
              .filter((detail) => detail.name === name)
              .map((detail) => (
                <TableRow key={detail.name}>
                  <TableCell align="center">
                    <Avatar src={detail.avatar} alt="pic" />
                  </TableCell>
                  <TableCell align="center">{detail.name}</TableCell>
                  <TableCell align="center">{detail.registerid}</TableCell>
                  <TableCell align="center">{detail.class}</TableCell>
                  <TableCell align="center">
                    {edit ? (
                      <input
                        name="tamil"
                        value={value.tamil}
                        onChange={handleChange}
                      />
                    ) : (
                      value.tamil
                    )}
                  </TableCell>
                  {/*<TableCell align="center">
                    {edit ? (
                      <input
                        name="english"
                        value={value.english}
                        onChange={handleChange}
                      />
                    ) : (
                      value.english
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {edit ? (
                      <input
                        name="maths"
                        value={value.maths}
                        onChange={handleChange}
                      />
                    ) : (
                      value.maths
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {edit ? (
                      <input
                        name="science"
                        value={value.science}
                        onChange={handleChange}
                      />
                    ) : (
                      value.science
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {edit ? (
                      <input
                        name="social"
                        value={value.social}
                        onChange={handleChange}
                      />
                    ) : (
                      value.social
                    )}
                    </TableCell>*/}
                  <TableCell align="center">
                    {edit ? (
                      <Button
                        onClick={handleUpdate}
                        sx={{ textTransform: "none" }}
                      >
                        Update
                      </Button>
                    ) : (
                      <Button
                        onClick={handleAdd}
                        sx={{ textTransform: "none" }}
                      >
                        Add
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

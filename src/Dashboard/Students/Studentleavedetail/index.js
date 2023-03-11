import React, { useState, useRef, useEffect } from "react";

import {
  Box,
  Card,
  TextField,
  Grid,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Fab,
  TableContainer,
} from "@mui/material";
import { Info, PendingActionsOutlined } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";

import { studentLeaveFormApiCall } from "../../../Apicall";
import { studentLeaveDetailApiCall } from "../../../Apicall";
import { deleteLeaveRequestApiCall } from "../../../Apicall";
import { editLeaveRequestApiCall } from "../../../Apicall";

import ModalComponent from "../../../Components/Modal";
import Loader from "../../../Components/Loader";
import { useNavigate } from "react-router-dom";

export default function StudentLeaveForm() {
  const [load, setLoad] = useState(false);
  const [id, setId] = useState(null);
  const [leaveStatus, setLeaveStatus] = useState([]);
  const [filterArr, setFilterArr] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonView, setButtonView] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");

  const tableHeaders = [
    "No",
    "Date",
    "Type",
    "Reason",
    "Days",
    "Status",
    "Remark",
    "Actions",
  ];
  const status = ["approved", "rejected"];

  const navigateTo = useNavigate();

  const tokenData = JSON.parse(localStorage.getItem("tokens"));

  let header = {
    headers: { Authorization: `Bearer ${tokenData.access}` },
  };

  const handleClick = () => {
    navigateTo(`/applyleave/form`);
  };

  const fetchStudentLeaveDetail = () => {
    setLoad(true);
    studentLeaveDetailApiCall(
      header,
      (response) => {
        setLeaveStatus(response.data);
        setFilterArr(
          response.data?.filter((detail) => detail.status === "pending")
        );
        setLoad(false);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleEdit = (detail, id) => {
    navigateTo(`/applyleave/${id}`);
    localStorage.setItem("editForm", JSON.stringify(detail));
    localStorage.setItem("view",false)
  };

  const handleRemove = (id) => {
    setId(id);
    setButtonView(false);
    setModalOpen(true);
    setDeleteMsg(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setDeleteMsg(false);
  };

  const handleClose1 = () => {
    setDeleteMsg(false);
    setModalOpen(false);
  };

  const handleFilter = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleDelete = () => {
    setModalOpen(false);
    setLoad(true);
    setButtonView(true);
    deleteLeaveRequestApiCall(
      id,
      header,
      (response) => {
        setLoad(false);
        setModalOpen(false);
        setDeleteMsg(false);
        fetchStudentLeaveDetail();
      },
      (error) => {
        setButtonView(false);
        console.log(error);
      }
    );
  };

  useEffect(() => {
    fetchStudentLeaveDetail();
  }, []);

  useEffect(() => {
    setFilterArr(leaveStatus.filter((el) => el.status === filterStatus));
  }, [filterStatus]);

  return (
    <div className="tableContent">
      <Loader load={load} />
      {load === false && (
        <>
          <Fab
            variant="extended"
            onClick={handleClick}
            sx={{
              ml: "65%",
              textTransform: "none",
              mt: "5%",
              mb: "2%",
              bgcolor: "#232E48",
              color: "white",
            }}
            className="btn"
          >
            Apply Leave
            <AddIcon sx={{ width: "50px", height: "30px" }} />
          </Fab>

          <br />
          <br />
          {leaveStatus?.length !== 0 ? (
            <>
              <FormControl
                style={{
                  minWidth: "200px",
                  borderRadius: "50px",
                  marginLeft: "80%",
                  marginTop: "-6.4%",
                }}
              >
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  name="status"
                  onChange={handleFilter}
                  label="status"
                >
                  {status.map((el) => {
                    return (
                      <MenuItem
                        key={el}
                        value={el}
                        sx={{ textTransform: "capitalize" }}
                      >
                        {el}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <br />

              {filterArr.length !== 0 ? (
                <center>
                  <TableContainer sx={{ maxWidth: "1200px", mb: "3%" }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">No</TableCell>
                          <TableCell align="center">Date</TableCell>
                          <TableCell align="center">Type</TableCell>
                          <TableCell align="center">Days</TableCell>
                          <TableCell align="center">Status</TableCell>
                          {filterStatus !== "approved" &&
                            filterStatus === "rejected" && (
                              <TableCell align="center">Remark</TableCell>
                            )}
                          {filterStatus === "" && (
                            <TableCell align="center">Actions</TableCell>
                          )}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filterArr?.map((detail, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align="center">{index + 1}</TableCell>
                              <TableCell
                                align="center"
                                onClick={() => {
                                  navigateTo(`/applyleave/${detail.id}`);
                                  localStorage.setItem(
                                    "editForm",
                                    JSON.stringify(detail)
                                  );
                                  localStorage.setItem("view",true)
                                }}
                              >
                                {`${detail.from_date} - ${detail.to_date}`}
                              </TableCell>
                              <TableCell align="center">
                                {detail.type === "fullday"
                                  ? "Full day"
                                  : "Half day"}
                              </TableCell>
                              <TableCell align="center">
                                {detail.no_of_days < 10 &&
                                detail.type !== "halfday"
                                  ? `0${detail.no_of_days}`
                                  : detail.no_of_days}
                              </TableCell>
                              <TableCell align="center">
                                {detail.status === "approved" ? (
                                  <DoneIcon sx={{ color: "green" }} />
                                ) : detail.status === "rejected" &&
                                  detail.status !== "approved" ? (
                                  <CloseIcon sx={{ color: "red" }} />
                                ) : (
                                  <PendingActionsOutlined
                                    sx={{ color: "black" }}
                                  />
                                )}
                              </TableCell>
                              {filterStatus !== "approved" &&
                                filterStatus === "rejected" && (
                                  <TableCell
                                    align="center"
                                    sx={{ textTransform: "capitalize" }}
                                  >
                                    <Info
                                      onClick={() => {
                                        setModalOpen(true);
                                        setStudentId(detail.id);
                                      }}
                                      sx={{ cursor: "pointer" }}
                                    />
                                  </TableCell>
                                )}
                              {detail.status === "pending" && (
                                <TableCell align="center">
                                  {detail?.status !== "approved" &&
                                    detail?.status !== "rejected" && (
                                      <>
                                        <IconButton
                                          onClick={() =>
                                            handleEdit(detail, detail.id)
                                          }
                                        >
                                          <BorderColorOutlinedIcon
                                            sx={{ color: "green" }}
                                          />
                                        </IconButton>
                                        <IconButton
                                          onClick={() =>
                                            handleRemove(detail.id)
                                          }
                                        >
                                          <DeleteForeverIcon
                                            sx={{ color: "red" }}
                                          />
                                        </IconButton>
                                      </>
                                    )}
                                </TableCell>
                              )}
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </center>
              ) : (
                <Typography align="center">
                  <b>No data's available</b>
                </Typography>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      )}
      <ModalComponent
        modalOpen={modalOpen}
        handleClose={() => setModalOpen(false)}
        modalValue={
          <>
            {deleteMsg === true ? (
              <center>
                <p>
                  <b>Are you sure </b>
                </p>
                <br />
                <Fab
                  variant="extended"
                  onClick={handleDelete}
                  sx={{
                    align: "center",
                    textTransform: "none",
                    bgcolor: "#232E48",
                    color: "white",
                  }}
                  disabled={buttonView}
                  className="btn"
                >
                  Yes
                </Fab>
                <Fab
                  variant="extended"
                  onClick={handleClose1}
                  sx={{
                    align: "center",
                    textTransform: "none",
                    ml: "2%",
                    bgcolor: "#232E48",
                    color: "white",
                  }}
                  disabled={buttonView}
                  className="btn"
                >
                  No
                </Fab>
              </center>
            ) : (
              filterArr
                ?.filter((el) => el.id === studentId)
                .map((el) => {
                  return (
                    <>
                      <center>
                        <Typography>{el.remark}</Typography>
                        <Fab
                          variant="extended"
                          onClick={handleClose}
                          sx={{
                            align: "center",
                            textTransform: "none",
                            mt: "2%",
                            bgcolor: "#232E48",
                            color: "white",
                          }}
                          className="btn"
                        >
                          Close
                        </Fab>
                      </center>
                    </>
                  );
                })
            )}
          </>
        }
      />
    </div>
  );
}
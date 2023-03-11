import React, { useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Card,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  Fab,
} from "@mui/material";

import { editLeaveRequestApiCall } from "../../../Apicall";

import Loader from "../../../Components/Loader";

import ModalComponent from "../../../Components/Modal";

const selectOptions = ["full day", "half day"];

export default function Studentform() {
  const [leaveData, setLeaveData] = useState({
    from_date: "",
    to_date: "",
    reason: "",
    type: "full day",
  });
  const [minView, setMinView] = useState(true);
  const [load, setLoad] = useState(false);
  const [buttonView, setButtonView] = useState(false);
  const [duplicateError, setDuplicateError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [error, setError] = useState({
    startDate: false,
    endDate: false,
    type: false,
    reason: false,
  });

  const navigateTo = useNavigate();

  const { id } = useParams();

  const inpRef = useRef({});

  const tokenData = JSON.parse(localStorage.getItem("tokens"));

  let header = {
    headers: { Authorization: `Bearer ${tokenData.access}` },
  };

  const handlechange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
    if (
      (e.target.name === "from_date" && e.target.value !== "") ||
      (e.target.name === "to_date" && e.target.value !== "") ||
      (e.target.name === "reason" && e.target.value !== "")
    ) {
      setMinView(false);
      setError({
        startDate: false,
        endDate: false,
        reason: false,
        type: false,
      });
    }
  };

  const applyLeave = (event) => {
    event.preventDefault();
    if (leaveData.from_date === "") {
      inpRef.current.from_date.focus();
      setError({ startDate: true });
    } else if (leaveData.to_date === "") {
      inpRef.current.to_date.focus();
      setError({ endDate: true });
    } else if (leaveData.reason === "") {
      inpRef.current.reason.focus();
      setError({ reason: true });
    } else {
      setLoad(true);
      setButtonView(true);
      const data = {
        from_date: leaveData.from_date,
        to_date: leaveData.to_date,
        type: leaveData.type === "full day" ? "fullday" : "halfday",
        reason: leaveData.reason,
        status: "pending",
      };
      editLeaveRequestApiCall(
        id,
        data,
        header,
        (response) => {
          setModalOpen(true);
          setLoad(false);
        },
        (error) => {
          setButtonView(false);
          console.log(error);
        }
      );
      event.target.reset(
        setLeaveData({
          from_date: "",
          to_date: "",
          reason: "",
          type: "full day",
        })
      );
    }
  };

  useEffect(() => {
    const editData = JSON.parse(localStorage.getItem("editForm"));
    setLeaveData({
      from_date: editData.from_date,
      to_date: editData.to_date,
      reason: editData.reason,
      type: editData.type === "fullday" ? "full day" : "half day",
    });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("view") === "true") {
      setButtonView(true);
    }
    else {
      setButtonView(false)
    }
  }, [localStorage.getItem("view")]);

  return (
    <div className="tableContent">
      <Loader load={load} />
      {load === false && (
        <Card
          sx={{
            height: "600px",
            width: "600px",
            ml: "500px",
            mt: "2%",
            mb: "2%",
            border: "ridge",
            borderRadius: "30px",
          }}
        >
          <form onSubmit={applyLeave}>
            <Box sx={{ width: "100%", ml: "70px", align: "center" }}>
              <Grid container rowSpacing={5} sx={{ mt: "3px" }}>
                <Grid item xs={6}>
                  <label style={{ fontWeight: "bold" }}>From Date:</label>
                  <br />
                  <br />
                  {minView ? (
                    <input
                      type="date"
                      name="from_date"
                      value={leaveData.from_date}
                      ref={(ref) => (inpRef.current.from_date = ref)}
                      onChange={handlechange}
                      min={new Date().toISOString().split("T")[0]}
                      style={{
                        padding: "10px",
                        minWidth: "150px",
                        borderRadius: "10px",
                      }}
                    />
                  ) : (
                    <input
                      type="date"
                      name="from_date"
                      value={leaveData.from_date}
                      ref={(ref) => (inpRef.current.from_date = ref)}
                      onChange={handlechange}
                      min={new Date().toISOString().split("T")[0]}
                      max={leaveData.to_date}
                      style={{
                        padding: "10px",
                        minWidth: "150px",
                        borderRadius: "10px",
                      }}
                    />
                  )}
                  <br />
                  <br />
                  {error.startDate ? (
                    <Typography color="error">plese select date</Typography>
                  ) : (
                    <></>
                  )}
                </Grid>

                <Grid item xs={6}>
                  <label style={{ fontWeight: "bold" }}>To Date:</label>
                  <br />
                  <br />
                  {minView ? (
                    <input
                      type="date"
                      name="to_date"
                      value={leaveData.to_date}
                      ref={(ref) => (inpRef.current.to_date = ref)}
                      onChange={handlechange}
                      min={new Date().toISOString().split("T")[0]}
                      style={{
                        padding: "10px",
                        minWidth: "150px",
                        borderRadius: "10px",
                      }}
                    />
                  ) : (
                    <input
                      type="date"
                      name="to_date"
                      value={leaveData.to_date}
                      ref={(ref) => (inpRef.current.to_date = ref)}
                      onChange={handlechange}
                      min={leaveData.from_date}
                      style={{
                        padding: "10px",
                        minWidth: "150px",
                        borderRadius: "10px",
                      }}
                    />
                  )}
                  <br />
                  <br />
                  {error.endDate ? (
                    <Typography color="error">Please select date</Typography>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
              <br />
              <br />
              {(leaveData.from_date && leaveData.to_date) !== "" &&
              leaveData.from_date === leaveData.to_date ? (
                <FormControl style={{ minWidth: "235px" }}>
                  <label>
                    <b>Type</b>:
                  </label>
                  <br />
                  <Select
                    name="type"
                    value={leaveData.type}
                    inputRef={(ref) => (inpRef.current.type = ref)}
                    onChange={handlechange}
                  >
                    {selectOptions.map((el) => (
                      <MenuItem key={el} value={el}>
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <></>
              )}
              <br />
              <br />
              <label style={{ fontWeight: "bold" }}>Reason:</label>
              <br />
              <br />
              <TextField
                sx={{ width: "450px", borderRadius: "30px" }}
                name="reason"
                value={leaveData.reason}
                inputRef={(ref) => (inpRef.current.reason = ref)}
                label="purpose of leave"
                multiline
                rows={4}
                onChange={handlechange}
              />
              <br />
              <br />
              {error.reason ? (
                <Typography color="error">Please enter the reason</Typography>
              ) : (
                <></>
              )}
              <br />
              <br />
              <Fab
                variant="extended"
                sx={{
                  ml: "30%",
                  textTransform: "none",
                  mt: "-3%",
                  bgcolor: "#232E48",
                  color: "white",
                }}
                className="btn"
                type="submit"
                disabled={buttonView}
              >
                Apply
              </Fab>
              <br />
              <br />
              <center>
                {duplicateError && (
                  <Typography
                    color="error"
                    style={{ marginLeft: "-160px", fontWeight: "bold" }}
                  >
                    Date already exist
                  </Typography>
                )}
              </center>
            </Box>
          </form>
        </Card>
      )}
      <ModalComponent
        modalOpen={modalOpen}
        handleClose={() => navigateTo("/applyleave")}
        modalValue={
          <div>
            <Typography align="center">
              <b>Updated successfully</b>
            </Typography>
            <center>
              <Fab
                variant="extended"
                onClick={() => navigateTo("/applyleave")}
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
          </div>
        }
      />
    </div>
  );
}
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import {
  Button,
  Card,
  TextField,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { loginApiCall } from "../Apicall";
import logoImg from "../assets/images/stlcportal.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState(false);
  const [inputValues, setInputValues] = useState({
    userid: "",
    password: "",
  });

  const navigate = useNavigate();
  const inputElement1 = useRef({});

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const formValidation = () => {
    if (inputValues.userid === "") {
      inputElement1.current.userid.focus();
    } else if (inputValues.password === "") {
      inputElement1.current.password.focus();
    }
  };

  const handleLogin = () => {
    const data = {
      username: inputValues.userid,
      password: inputValues.password,
    };
    setIsLoading(true);
    loginApiCall(
      data,
      (response) => {
        localStorage.setItem("tokens", JSON.stringify(response.data));
        let tokenData = JSON.parse(localStorage.getItem("tokens"));
        let docodeAccessToken = jwtDecode(tokenData.access);
        localStorage.setItem("accessToken", JSON.stringify(docodeAccessToken));
        navigate("/");
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValues.userid && inputValues.password) {
      handleLogin();
    } else {
      formValidation();
    }
  };

  return (
    <>
      <center className="loginDiv">
        <Box>
          <Card
            sx={{
              pt: "2%",
              height: "40%",
              width: "30%",
              borderRadius: "10%",
              pb: "2%",
              mt: "10%",
            }}
          >
            <img src={logoImg} alt="Logo" />
            <Typography
              sx={{ pt: "10%", fontSize: "20px", fontWeight: "bolder" }}
            >
              LOGIN
            </Typography>
            <br />
            <form onSubmit={handleSubmit}>
              <TextField
                sx={{ width: "250px" }}
                variant="outlined"
                type="text"
                placeholder="Staff Id/User Name"
                name="userid"
                value={inputValues.userid}
                onChange={handleChange}
                inputRef={(ref) => (inputElement1.current.userid = ref)}
                required
              />
              <br />
              <br />
              <br />

              <TextField
                sx={{ width: "250px" }}
                variant="outlined"
                type={view ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={inputValues.password}
                onChange={handleChange}
                inputRef={(ref) => (inputElement1.current.password = ref)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setView(!view)}>
                        {view ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <br />

              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{ textTransform: "none" }}
              >
                {isLoading ? "Logging In..." : "Login"}
              </Button>
            </form>
          </Card>
        </Box>
      </center>
    </>
  );
}

// import { CircularProgress } from "@mui/material";
import React from "react";
import ReactLoading from "react-loading";

export default function Loader({ load }) {
  return (
    <>
      {load ? (
        <center>
          <ReactLoading type="spinningBubbles" height="3%" width="3%" color="black" align="center"  />
        </center>
      ) : (
        // <ReactLoading type="bars" height="5%" width="5%" color="black" />
        " "
      )}
    </>
  );
}

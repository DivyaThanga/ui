import React from "react";
import { Navigate } from "react-router-dom";

export default function LoginPrivateRouter({ childrenComponent }) {
  const token = JSON.parse(localStorage.getItem("tokens"));

  return <div>{token === null ? childrenComponent : <Navigate to="/" />}</div>;
}

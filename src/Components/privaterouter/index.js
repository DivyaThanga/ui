import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRouter({ childrenComponent }) {
  const token = JSON.parse(localStorage.getItem("tokens"));

  return <div>{token ? childrenComponent : <Navigate to="/login" />}</div>;
}

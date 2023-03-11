import React from "react";
import { useNavigate } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Logout } from "../../Apicall";

export default function MenuItems({
  anchorEl,
  handleMenuClose,
  setModalOpen,
  menu,
}) {
  const navigate = useNavigate();

  const handleClick = (value) => {
    switch (value) {
      case "Remarks":
        setModalOpen(true);
        break;
      case "Profile":
        navigate("/profilepage");
        break;
      case "Logout":
        navigate("/login");
        Logout();
        break;
      default:
        setModalOpen(false);
        break;
    }
    handleMenuClose();
  };

  return (
    <div>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {menu.map((el) => (
          <MenuItem onClick={() => handleClick(el)}>{el}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}

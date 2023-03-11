import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import DescriptionIcon from "@mui/icons-material/Description";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import PeopleIcon from "@mui/icons-material/People";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Avatar, IconButton } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";

import logoImg from "../../assets/images/stlcportal.png";
import MenuItems from "../MenuItem";
// import ModalComponent from "../Modal";

import { studentsData, facultyProfiles } from "../../Apicall";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const drawerWidth = 240;
const sideMenuFaculty = [
  "Time Table",
  "Leave Requests",
  "Student List",
  "Attendance",
];
const sideStudentMenu = ["Dashboard", "Apply Leave"];

export default function ResponsiveSideBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menu, setMenu] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [studentProfile, setStudentProfile] = useState([]);
  const [facultyProfile, setFacultyProfile] = useState([]);
  const [active, setActive] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const role = JSON.parse(localStorage.getItem("accessToken"));

  const tokenData = JSON.parse(localStorage?.getItem("tokens"));
  const header = { headers: { Authorization: `Bearer ${tokenData?.access}` } };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const fetchStudentProfile = () => {
    studentsData(
      header,
      (response) => {
        setStudentProfile(response.data[0].image?.full_size);
      },
      (error) => console.log(error)
    );
  };

  const fetchFacultyProfile = () => {
    facultyProfiles(
      header,
      (response) => {
        setFacultyProfile(response.data[0]?.image);
      },
      (error) => console.log(error)
    );
  };

  const getMenuIcon = (i) => {
    switch (i) {
      case 0:
        return <TagOutlinedIcon sx={{ color: "white", fontWeight: "bold" }} />;
      case 1:
        return <DescriptionIcon sx={{ color: "white", fontWeight: "bold" }} />;
      case 2:
        return <PeopleIcon sx={{ color: "white", fontWeight: "bold" }} />;
      case 3:
        return <ArticleIcon sx={{ color: "white", fontWeight: "bold" }} />;
      // case 4:
      //   return <InfoOutlinedIcon sx={{ color: "white" }} />;
      // case 5:
      //   return <TagOutlinedIcon sx={{ color: "white" }} />;
      // case 6:
      //   return <EmailOutlinedIcon sx={{ color: "white" }} />;
      // case 7:
      //   return <LightModeOutlinedIcon sx={{ color: "white" }} />;
      // case 8:
      //   return <PeopleAltOutlinedIcon sx={{ color: "white" }} />;
      default:
        break;
    }
  };

  const setCurrentTab = () => {
    const pathName = location.pathname;
    switch (pathName) {
      case "/":
        setActive(userRole === "student" ? "Dashboard" : "Time Table");
        break;
      case "/leaveapplication":
        setActive("Leave Requests");
        break;
      case "/studentlist":
        setActive("Student List");
        break;
      case "/attendancestatus":
        setActive("Attendance");
        break;
      case "/applyleave":
        setActive("Apply Leave");
        break;
      default:
        setActive(" ");
        break;
    }
  };

  const handleNavigation = (page) => {
    switch (page) {
      case "Time Table":
        navigate("/");
        break;
      case "Leave Requests":
        navigate("/leaveapplication");
        break;
      case "Dashboard":
        navigate("/");
        break;
      case "Apply Leave":
        navigate("/applyleave");
        break;
      case "Student List":
        navigate("/studentlist");
        break;
      case "Attendance":
        navigate("/attendancestatus");
        break;
      // case "Announcements":
      //   navigate("/announcements");
      //   break;
      // case "Message":
      //   navigate("/message");
      //   break;
      // case "Holidays":
      //   navigate("/holidays");
      //   break;
      // case "Students":
      //   navigate("/student");
      //   break;
      default:
        break;
    }
  };

  const mainMenu = () => {
    if (role?.role === "faculty") {
      setMenu(sideMenuFaculty);
    } else if (role?.role === "student") {
      setMenu(sideStudentMenu);
    }
  };

  useEffect(() => {
    mainMenu();
    setCurrentTab();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      let role = JSON.parse(localStorage.getItem("accessToken"));
      setUserRole(role && role?.role);
    }, 100);
    return () => clearInterval(interval);
  }, [userRole]);

  useEffect(() => {
    if (userRole && userRole === "faculty") {
      fetchFacultyProfile();
    } else if (userRole && userRole === "student") {
      fetchStudentProfile();
    }
  }, [userRole]);

  const drawer = (
    <div className="Drawer">
      <div className="logoIcon">
        <img src={logoImg} alt="logo" />
      </div>
      <List>
        {menu.map((page, index) => (
          <ListItem
            style={{ backgroundColor: active === page ? "#0c111c" : "#232E48" }}
            key={page}
            disablePadding
            onClick={() => handleNavigation(page)}
          >
            <ListItemButton
              sx={{ backgroundColor: active === page ? "#0c111c" : "" }}
            >
              <ListItemIcon>{getMenuIcon(index)}</ListItemIcon>
              <ListItemText
                primary={page}
                sx={{ color: "white", fontWeight: "bold" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      {location.pathname === "/login" || role === null ? (
        <> </>
      ) : (
        <>
          <Box sx={{ display: "flex", height: "98vh" }}>
            <AppBar
              position="absolute"
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                backgroundColor: "white",
              }}
            >
              <Toolbar>
                <IconButton
                  sx={{ marginLeft: "calc(100% - 70px)" }}
                  onClick={handleMenuClick}
                >
                  {userRole && userRole === "faculty" && (
                    <Avatar src={facultyProfile} />
                  )}
                  {userRole && userRole === "student" && (
                    <Avatar src={studentProfile} />
                  )}
                </IconButton>

                <MenuItems
                  anchorEl={anchorEl}
                  handleMenuClose={handleMenuClose}
                  menu={["Profile", "Logout"]}
                />
              </Toolbar>
            </AppBar>
            {location.pathname !== "/" && (
              <div>
                <IconButton
                  onClick={() => navigate(-1)}
                  sx={{ marginLeft: "250px", marginTop: "80px" }}
                >
                  <ArrowBackIcon className="arrowbackIcon" />
                </IconButton>
              </div>
            )}
            <Box
              sx={{
                width: { sm: drawerWidth },
                backgroundColor: "#232E48",
                position: "fixed",
                height: "100%",
              }}
            >
              {drawer}
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

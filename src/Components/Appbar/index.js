import React from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
// import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

// import Modalcomponent from "../Modal";

// const classOption = ["first", "second", "third", "fourth", "fifth"];
// const subjectOption = ["Tamil", "English", "Maths", "Science", "Social"];
// const internalOption = ["First Internal", "Second Internal", "Third Internal"];
// const semesterOption = [
//   "First Semester",
//   "Second Semester",
//   "Third Semester",
//   "Fourth Semester",
// ];
export default function ResponsiveAppBar() {
  // const [calendarValue, setCalenderValue] = React.useState(null);
  // const [semester, setSemester] = useState("");
  // const [selectValue, setSelectValue] = useState("");
  // const [subject, setSubject] = useState("");
  // const [internal, setInternal] = useState("");
  // const [calendarStatus, setCalendarStatus] = useState(false);
  // const [selectSubjectStatus, setSelectSubjectStatus] = useState(false);
  // const [selectSemesterStatus, setSelectSemesterStatus] = useState(false);
  // const [selectClassStatus, setSelectClassStatus] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);

  const location = useLocation();

  // const handleOpen = () => setModalOpen(true);

  // const handleClose = () => setModalOpen(false);

  // useEffect(() => {
  //   switch (location.pathname) {
  //     case "/":
  //       setCalendarStatus(true);
  //       setSelectSubjectStatus(true);
  //       setSelectSemesterStatus(true);
  //       setSelectClassStatus(true);
  //       break;
  //     case "/leaveapplication":
  //       setCalendarStatus(true);
  //       setSelectSubjectStatus(false);
  //       setSelectSemesterStatus(false);
  //       setSelectClassStatus(true);
  //       break;
  //     case "/student":
  //       setCalendarStatus(false);
  //       setSelectSubjectStatus(true);
  //       setSelectSemesterStatus(true);
  //       setSelectClassStatus(true);
  //       break;
  //     case "/events":
  //       setCalendarStatus(false);
  //       setSelectSubjectStatus(false);
  //       setSelectSemesterStatus(false);
  //       setSelectClassStatus(false);
  //       break;
  //     case "/announcements":
  //       setCalendarStatus(false);
  //       setSelectSubjectStatus(false);
  //       setSelectSemesterStatus(false);
  //       setSelectClassStatus(false);
  //       break;
  //     case "/internalmarks":
  //       setCalendarStatus(false);
  //       setSelectSubjectStatus(false);
  //       setSelectSemesterStatus(true);
  //       setSelectClassStatus(true);
  //       break;
  //     case "/message":
  //       setSelectSubjectStatus(false);
  //       setCalendarStatus(false);
  //       setSelectSemesterStatus(true);
  //       setSelectClassStatus(true);
  //       break;
  //     case "/timetable":
  //       setCalendarStatus(false);
  //       setSelectSubjectStatus(false);
  //       setSelectSemesterStatus(false);
  //       setSelectClassStatus(false);
  //       break;
  //     case "/holidays":
  //       setCalendarStatus(false);
  //       setSelectSubjectStatus(false);
  //       setSelectSemesterStatus(false);
  //       setSelectClassStatus(false);
  //       break;
  //   }
  // }, [location.pathname]);

  return (
    <>
      {location.pathname === "/timetable" ||
      location.pathname === "/attendancePage" ||
      location.pathname === "/applyleave" ||
      location.pathname === "/leaveapplication" ||
      location.pathname === "/login" ? (
        <> </>
      ) : (
        <Box
          sx={{
            width: "calc(100% - 280px)",
            marginLeft: "260px",
            position: "absolute",
            top: "80px",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
          }}
        >
          <AppBar position="static" sx={{ backgroundColor: "white" }}>
            <Toolbar>
              <Avatar src="https://www.bayleybulletin.com/wp-content/uploads/2016/08/Ashlynn-Fayth-Smith-900.jpg" />
              <Typography sx={{ color: "black" }}>
                K S Harshini
                <br />
                ID : 8361927
              </Typography>
              {/* <Grid sx={{ marginLeft: "10px" }}>
                {selectClassStatus && (
                  <ResponsiveSelect
                    options={classOption}
                    selectValue={selectValue}
                    inputLables={"Select Class"}
                    setSelectValue={setSelectValue}
                  />
                )}
              </Grid>
              {selectSemesterStatus && (
                <ResponsiveSelect
                  options={semesterOption}
                  selectValue={semester}
                  inputLables={"Select Semester"}
                  setSelectValue={setSemester}
                />
              )}
              {location.pathname === "/internalmarks" && (
                <ResponsiveSelect
                  options={internalOption}
                  selectValue={internal}
                  inputLables={"Select Internal"}
                  setSelectValue={setInternal}
                />
              )}
              {calendarStatus === true ? (
                <ResponsiveCalendar
                  calendarValue={calendarValue}
                  setCalenderValue={setCalenderValue}
                />
              ) : (
                ""
              )}
              {selectSubjectStatus && (
                <ResponsiveSelect
                  options={subjectOption}
                  selectValue={subject}
                  inputLables={"Select Subject"}
                  setSelectValue={setSubject}
                />
              )}
              <IconButton onClick={handleOpen}>
                <PersonAddAlt1Icon />
              </IconButton>
              <Modalcomponent
                modalOpen={modalOpen}
                handleClose={handleClose}
                modalValue={<AddStudents handleClose={handleClose} />}
              /> */}
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </>
  );
}

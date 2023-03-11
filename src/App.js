import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import PrivateRouter from "./Components/privaterouter";
import Login from "./Authendication/LoginScreen";
import ResponsiveSideBar from "./Components/Sidebar";
import lazyLoading from "./Components/Lazyloading";
import LoginPrivateRouter from "./Components/LoginPrivateRouter.js";

const LazyTimeTable = React.lazy(() => import("./Dashboard/Faculty/Timetable"));

const LazyLeaveForm = React.lazy(() =>
  import("./Dashboard/Students/Studentleavedetail")
);

const LazyMarkattendance = React.lazy(() =>
  import("./Dashboard/Faculty/Attendanceedit")
);

const LazyLeaveApplication = React.lazy(() =>
  import("./Dashboard/Faculty/Leaveapplication")
);

const LazyAddStudents = React.lazy(() =>
  import("./Dashboard/Faculty/Addstudents")
);

const LazyStudent = React.lazy(() => import("./Dashboard/Faculty/Student"));

const LazyStudentprofile = React.lazy(() =>
  import("./Dashboard/Faculty/Studentprofile")
);

const LazyMasterTimetable = React.lazy(() =>
  import("./Dashboard/Faculty/MasterTimeTable")
);

const LazyAttendanceStatus = React.lazy(() =>
  import("./Dashboard/Faculty/Attendancestatus")
);

const LazyProfilePage = React.lazy(() => import("./Components/Profile"));

const LazyStudentDashboard = React.lazy(() =>
  import("./Dashboard/Students/StudentDashboard")
);

const LazyLeaveHistory = React.lazy(() =>
  import("./Dashboard/Faculty/Leavehistory")
);

const LazyParticularLeaveDetail = React.lazy(() =>
  import("./Dashboard/Faculty/Particularleavedetail")
);

const LazyAttendancePreview = React.lazy(() =>
  import("./Dashboard/Faculty/AttendancePreview")
);

const LazyStudentform = React.lazy(() =>
  import("./Dashboard/Students/Studentleaveform")
);

const LazyStudentEditLeave = React.lazy(() =>
  import("./Dashboard/Students/Studenteditleave")
);

function App() {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      let role = JSON.parse(localStorage.getItem("accessToken"));
      setUserRole(role && role?.role);
    }, 100);
    return () => clearInterval(interval);
  }, [userRole]);

  return (
    <div>
      <Router>
        <ResponsiveSideBar />
        <Routes>
          <Route
            path="/login"
            element={<LoginPrivateRouter childrenComponent={<Login />} />}
          />
          {userRole === "" ||
            (userRole === null && (
              <Route path="/" element={<Navigate to="/login" />} />
            ))}
          {userRole === "faculty" && (
            <Route
              path="/"
              element={
                <PrivateRouter childrenComponent={lazyLoading(LazyTimeTable)} />
              }
            />
          )}
          {userRole === "student" && (
            <Route
              path="/"
              element={
                <PrivateRouter
                  childrenComponent={lazyLoading(LazyStudentDashboard)}
                />
              }
            />
          )}

          <Route
            path="/leaveapplication"
            element={
              <PrivateRouter
                childrenComponent={lazyLoading(LazyLeaveApplication)}
              />
            }
          />
          <Route
            path="/leaveapplication/:id"
            element={
              <PrivateRouter
                childrenComponent={lazyLoading(LazyParticularLeaveDetail)}
              />
            }
          />
          <Route
            path="/leavehistory"
            element={
              <PrivateRouter
                childrenComponent={lazyLoading(LazyLeaveHistory)}
              />
            }
          />
          <Route
            path="/attendancePage/:id"
            element={
              <PrivateRouter
                childrenComponent={lazyLoading(LazyMarkattendance)}
              />
            }
          />
          <Route
            path="/attendancePage/:id/preview"
            element={
              <PrivateRouter
                childrenComponent={lazyLoading(LazyAttendancePreview)}
              />
            }
          />
          <Route
            path="/studentlist"
            element={
              <PrivateRouter childrenComponent={lazyLoading(LazyStudent)} />
            }
          />
          <Route
            path="/addStudent"
            element={
              <PrivateRouter childrenComponent={lazyLoading(LazyAddStudents)} />
            }
          />
          <Route
            path="/studentprofile/:id"
            element={
              <PrivateRouter
                childrenComponent={lazyLoading(LazyStudentprofile)}
              />
            }
          />
          <Route
            path="/mytimetable"
            element={
              <PrivateRouter
                childrenComponent={lazyLoading(LazyMasterTimetable)}
              />
            }
          />
          <Route
            path="/attendancestatus"
            element={
              <PrivateRouter
                childrenComponent={lazyLoading(LazyAttendanceStatus)}
              />
            }
          />
          <Route
            path="/profilepage"
            element={
              <PrivateRouter childrenComponent={lazyLoading(LazyProfilePage)} />
            }
          />
          <Route
            path="/applyleave"
            element={
              <PrivateRouter childrenComponent={lazyLoading(LazyLeaveForm)} />
            }
          />
          <Route
            path="/applyleave/form"
            element={
              <PrivateRouter childrenComponent={lazyLoading(LazyStudentform)} />
            }
          />
          <Route
            path="/applyleave/:id"
            element={
              <PrivateRouter
                childrenComponent={lazyLoading(LazyStudentEditLeave)}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
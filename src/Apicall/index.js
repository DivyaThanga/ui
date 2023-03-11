import HTTP from "../Utils/Baseurl";

// Login & Logout api calls
export function loginApiCall(data, callback, errorcallback) {
  HTTP.post("users/token/", data)
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

export function Logout() {
  // HTTP.post("users/logout/", refreshToken).then((res)=>{
  //   console.log(res);
  // }).catch((err)=>{
  //   console.log("err",err);
  // });
  localStorage.clear("tokens");
  localStorage.clear("accessToken");
}

// Profile page api calls
export function facultyProfiles(config, callback, errorcallback) {
  HTTP.get("faculty/faculty/", config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

export function studentsProfiles(id, config, callback, errorcallback) {
  HTTP.get(`student/students/?class_name__faculty=${id}`, config)
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

// It fetches individual students details, api call
export function studentDetails(id, config, callback, errorcallback) {
  HTTP.get(`student/students/${id}`, config)
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

//Faculty Api Calls
export function facultyClassView(id, config, callback, errorcallback) {
  HTTP.get(`faculty/class-view/?faculty=${id}`, config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

//Faculty can update their own profile
export function editFacultyProfiles(id, data, config, callback, errorcallback) {
  HTTP.patch(`faculty/faculty/${id}/`, data, config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

// Faculty Timetable api calls
export function facultyTimeTableAPiCall(day, config, callback, errorcallback) {
  HTTP.get(`faculty/timetable/?day=${day}`, config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

export function facultyMasterTimeTableAPiCall(config, callback, errorcallback) {
  HTTP.get("faculty/timetable/", config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

export function TimeTableAPiCall(id, config, callback, errorcallback) {
  HTTP.get(`faculty/timetable/${id}`, config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

// Faculty leave requests handling which are applied by students, api calls
export function facultyLeaveApproveApiCall(config, callback, errorcallback) {
  HTTP.get("student/leave-request/", config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

export function facultyLeaveApproval(
  id,
  data,
  config,
  callback,
  errorcallback
) {
  HTTP.patch(`student/leave-request/${id}/`, data, config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

// Add student by faculty, api call
export function addStudentApiCall(data, config, callback, errorcallback) {
  HTTP.post("student/students/", data, config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

// Delete student by faculty, api call
export function deleteStudents(id, config, callback, errorcallback) {
  HTTP.delete(`student/students/${id}`, config)
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

// Attendance functionalities api calls handled by faculties
export function attendanceEditApiCall(id, config, callback, errorcallback) {
  HTTP.get(`student/students/?class_name=${id}`, config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

export function attendancePostApiCall(data, config, callback, errorcallback) {
  HTTP.post("student/attendance/", data, config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

export function markedAttendanceApiCall(
  timeslot,
  subject,
  faculty,
  date,
  config,
  callback,
  errorcallback
) {
  HTTP.get(
    `student/attendance/?timeslot=${timeslot}&subject=${subject}&faculty=${faculty}&date=${date}`,
    config
  )
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

export function attendanceStatusApiCall(
  date,
  classId,
  subjectId,
  config,
  callback,
  errorcallback
) {
  HTTP.get(
    `student/attendance/?timeslot=&subject=${subjectId}&faculty=&date=${date}&student=&class_name=${classId}`,
    config
  )
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

export function attendanceHistoryApiCall(config, callback, errorcallback) {
  HTTP.get(`student/attendance/`, config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

// Students api call
export function studentsData(config, callback, errorcallback) {
  HTTP.get("student/students/", config)
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

// Students leave request handling, api calls
export function studentLeaveFormApiCall(data, config, callback, errorcallback) {
  HTTP.post("student/leave-request/", data, config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

export function studentLeaveDetailApiCall(config, callback, errorcallback) {
  HTTP.get("student/leave-request/", config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

export function studentLeaveDataApiCall(id, config, callback, errorcallback) {
  HTTP.get(`student/leave-request/?student=${id}`, config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

export function deleteLeaveRequestApiCall(id, config, callback, errorcallback) {
  HTTP.delete(`student/leave-request/${id}`, config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

export function editLeaveRequestApiCall(
  id,
  data,
  config,
  callback,
  errorcallback
) {
  HTTP.put(`student/leave-request/${id}/`, data, config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

// Student edit their profile details, api call
export function editStudentDataApiCall(
  id,
  data,
  config,
  callback,
  errorcallback
) {
  HTTP.patch(`student/students/${id}/`, data, config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

// Individual students attendance status api call
export function studentAttendanceHistoryApiCall(
  id,
  config,
  callback,
  errorcallback
) {
  HTTP.get(`student/attendance/?student=${id}`, config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

export function studentAttendanceListApiCall(
  date,
  subjectId,
  id,
  config,
  callback,
  errorcallback
) {
  HTTP.get(
    `student/attendance/?date=${date}&subject=${subjectId}&student=${id}`,
    config
  )
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

export function studentPortalAttendanceListApiCall(
  date,
  subjectId,
  config,
  callback,
  errorcallback
) {
  HTTP.get(`student/attendance/?date=${date}&subject=${subjectId}`, config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

export function subjectListApicall(config, callback, errorcallback) {
  HTTP.get("academic/subject/", config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((error) => {
      if (errorcallback != null) {
        errorcallback(error);
      }
    });
}

export function studentAttendanceDetailApiCall(
  config,
  callback,
  errorcallback
) {
  HTTP.get(`student/attendance/`, config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

// Classes list api call
export function classesLists(config, callback, errorcallback) {
  HTTP.get("faculty/class-view/", config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

// Departments related api calls
export function departmentListApiCall(config, callback, errorcallback) {
  HTTP.get("academic/department/", config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

export function departmentDivisionListApiCall(config, callback, errorcallback) {
  HTTP.get("academic/department-division/", config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

// Academic semester api calls
export function semesterListApiCall(config, callback, errorcallback) {
  HTTP.get("academic/semester/", config)
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

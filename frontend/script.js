
const API = "http://localhost:3003";

console.log("script.js loaded");

function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => { throw err; });
      }
      return res.json();
    })
    .then(data => {
      console.log("Login response:", data);

      // Save user
      localStorage.setItem("user", JSON.stringify(data));

      // Redirect
      window.location.href = "dashboard.html";
    })
    .catch(err => {
      alert(err.message || "Login failed");
    });
}




console.log("script.js loaded"); 

// const API = "http://localhost:3000";

function signup() {
  console.log("signup function called"); // DEBUG

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password, role })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Signup response:", data);
    alert("Signup successful");
    window.location.href = "login.html";
  })
  .catch(err => {
    console.error(err);
    alert("Backend not connected");
  });
}

// const API = "http://localhost:3000";
function addStudent() {
  const user = JSON.parse(localStorage.getItem("user"));
  const sname = document.getElementById("sname").value;
  const semail = document.getElementById("semail").value;
  const spassword = document.getElementById("spassword").value;

  fetch(`${API}/users/add-student`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "role": user.role,
      "user-id": user.id
    },
    body: JSON.stringify({
      name: sname,
      email: semail,
      password: spassword,
      role: "student"
    })
  })
  .then(res => res.json())
  .then(data => alert(`Student Added with ID: ${user.id}. Use this ID to mark attendance.`))
  .catch(err => alert("Error adding student"));
}

function markAttendance() {
  const user = JSON.parse(localStorage.getItem("user"));
  const studentId = document.getElementById("studentId").value;
  const status = document.getElementById("status").value.toLowerCase();

  fetch(`${API}/attendance/mark`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "role": user.role,
      "user-id": user.id
    },
    body: JSON.stringify({
      studentId: parseInt(studentId),
      date: new Date().toISOString().slice(0,10),
      status: status
    })
  })
  .then(res => res.json())
  .then(data => alert("Attendance Marked"));
}

function viewAttendance() {
  const user = JSON.parse(localStorage.getItem("user"));

  fetch(`${API}/attendance`, {
    headers: {
      "role": user.role,
      "user-id": user.id
    }
  })
  .then(res => res.json())
  .then(data => {
    displayAttendanceTable(data);
  })
  .catch(err => {
    document.getElementById("output").innerText = "Error: " + err.message;
  });
}

function viewAllAttendance() {
  const user = JSON.parse(localStorage.getItem("user"));

  fetch(`${API}/attendance/all`, {
    headers: {
      "role": user.role,
      "user-id": user.id
    }
  })
  .then(res => res.json())
  .then(data => {
    displayAttendanceTable(data);
  })
  .catch(err => {
    document.getElementById("output").innerText = "Error: " + err.message;
  });
}

function displayAttendanceTable(data) {
  const table = document.getElementById("attendanceTable");
  const tbody = document.getElementById("attendanceTableBody");
  const output = document.getElementById("output");

  // Clear previous content
  tbody.innerHTML = "";
  output.innerText = "";

  if (data.length === 0) {
    output.innerText = "No attendance records found.";
    table.style.display = "none";
    return;
  }

  // Populate table
  data.forEach(record => {
    const row = tbody.insertRow();
    row.insertCell(0).innerText = record.studentId;
    row.insertCell(1).innerText = record.date;
    row.insertCell(2).innerText = record.status;
  });

  table.style.display = "table";
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

function initDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("welcomeMessage").innerText = `Welcome, ${user.email} (${user.role}) - ID: ${user.id}`;

  document.getElementById("addStudentSection").style.display = "none";
  document.getElementById("markAttendanceSection").style.display = "none";
  document.getElementById("viewAttendanceSection").style.display = "none";
  document.getElementById("viewAllAttendanceSection").style.display = "none";
console.log("User role:", user.role);
  if (user.role === "TEACHER") {
    document.getElementById("addStudentSection").style.display = "block";
    document.getElementById("markAttendanceSection").style.display = "block";
    document.getElementById("viewAllAttendanceSection").style.display = "block";
    console.log("Teacher   logged in");
  } else if (user.role === "student") {
    console.log("Student logged in");
    document.getElementById("viewAttendanceSection").style.display = "block";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("dashboard.html")) {
    initDashboard();
  }
});

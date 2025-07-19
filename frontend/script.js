// ✅ Check if user is logged in
const token = localStorage.getItem('token');
if (!token) {
  alert('Please log in first.');
  window.location.href = 'login.html';
}

let editingId = null;

// ✅ Book an appointment
async function bookAppointment() {
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const service = document.getElementById('service').value;

  if (!date || !time || !service) {
    alert("Please select date, time, and service.");
    return;
  }

  const res = await fetch('http://localhost:5000/api/appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({ date, time, service })
  });

  const data = await res.json();
  if (res.ok) {
    alert("Appointment booked!");
    loadAppointments();
    document.getElementById('date').value = '';
document.getElementById('time').value = '';
document.getElementById('service').value = '';

  } else {
    alert(data.error || "Failed to book.");
  }
}

// ✅ Load appointments
async function loadAppointments() {
  const res = await fetch('http://localhost:5000/api/appointments', {
    headers: { 'Authorization': token }
  });

  const appointments = await res.json();
  const tableBody = document.querySelector('#appointments tbody');
  tableBody.innerHTML = '';

  appointments.forEach(app => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${app.date}</td>
      <td>${app.time}</td>
      <td>${app.service}</td>
      <td>
        <button onclick="deleteAppointment('${app._id}')">Cancel</button>
        <button onclick='showEditForm(${JSON.stringify(app)})'>Edit</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  checkUpcomingAppointments(appointments);
}

// ✅ Delete appointment
async function deleteAppointment(id) {
  const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': token }
  });

  if (res.ok) {
    alert('Appointment cancelled');
    loadAppointments();
  } else {
    alert('Failed to cancel appointment');
  }
}

// ✅ Show edit form
function showEditForm(app) {
  document.getElementById('edit-form').style.display = 'block';
  document.getElementById('edit-date').value = app.date;
  document.getElementById('edit-time').value = app.time;
  document.getElementById('edit-service').value = app.service;
  editingId = app._id;
}

// ✅ Submit edit changes
async function submitEdit() {
  const date = document.getElementById('edit-date').value;
  const time = document.getElementById('edit-time').value;
  const service = document.getElementById('edit-service').value;

  if (!date || !time || !service) {
    alert("Please fill all fields to update.");
    return;
  }

  const res = await fetch(`http://localhost:5000/api/appointments/${editingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({ date, time, service })
  });

  const data = await res.json();
  if (res.ok) {
    alert('Appointment updated!');
    document.getElementById('edit-form').style.display = 'none';
    editingId = null;
    loadAppointments();
  } else {
    alert(data.error || 'Update failed.');
  }
}

// ✅ Cancel edit
function cancelEdit() {
  document.getElementById('edit-form').style.display = 'none';
  editingId = null;
}

// ✅ Reminder if appointment is within next hour
function checkUpcomingAppointments(appointments) {
  const now = new Date();
  const reminderBox = document.getElementById('reminder');
  const reminderText = document.getElementById('reminder-text');
  if (reminderBox.dataset.dismissed === "true") return;
  reminderBox.style.display = 'none';
  reminderText.innerHTML = '';

  appointments.forEach(appt => {
    const apptTime = new Date(`${appt.date}T${appt.time}`);
    const diff = apptTime - now;
    if (diff > 0 && diff <= 60 * 60 * 1000) {
      reminderBox.style.display = 'block';
      const sound = document.getElementById('reminder-audio');
      if (sound) {
        sound.muted = false;
        sound.play();
      }

      reminderBox.innerHTML = `⏰ Reminder: You have an appointment at <strong>${appt.time}</strong>
        <button id="dismiss-btn">&#10005;</button>`;
    }
  });
}

// ✅ Dismiss reminder
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "dismiss-btn") {
    const box = document.getElementById('reminder');
    box.style.display = 'none';
    box.dataset.dismissed = "true";
  }
});

// ✅ Logout
function logout() {
  localStorage.removeItem('token');
  alert('Logged out');
  window.location.href = 'login.html';
}


window.onload = loadAppointments;


setInterval(async () => {
  const res = await fetch('http://localhost:5000/api/appointments', {
    headers: { 'Authorization': token }
  });
  const appointments = await res.json();
  checkUpcomingAppointments(appointments);
}, 60000);

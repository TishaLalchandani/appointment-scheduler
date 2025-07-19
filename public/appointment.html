// Check if user is logged in
const token = localStorage.getItem('token');
if (!token) {
  alert('Please log in first.');
  window.location.href = 'login.html';
}

async function bookAppointment() {
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (!date || !time) {
    alert("Please select date and time.");
    return;
  }

  const res = await fetch('http://localhost:5000/api/appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({ date, time })
  });

  const data = await res.json();
  if (res.ok) {
    alert("Appointment booked!");
    loadAppointments();
  } else {
    alert(data.error || "Failed to book.");
  }
}

async function loadAppointments() {
  const res = await fetch('http://localhost:5000/api/appointments', {
    headers: {
      'Authorization': token
    }
  });

  const data = await res.json();
  const list = document.getElementById('appointments');
  list.innerHTML = '';

  data.forEach(app => {
    const item = document.createElement('li');
    item.innerText = `${app.date} at ${app.time}`;  // Fixed template literal
    list.appendChild(item);
  });

  checkUpcomingAppointments(data);
}

function checkUpcomingAppointments(appointments) {
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
  const reminderBox = document.getElementById('reminder');
  reminderBox.style.display = 'none';
  reminderBox.textContent = '';

  appointments.forEach(appt => {
    const apptTime = new Date(`${appt.date}T${appt.time}`);  // Fixed template literal
    const diff = apptTime - now;

    if (diff > 0 && diff <= 60 * 60 * 1000) {
      reminderBox.style.display = 'block';
      reminderBox.textContent = `⏰ Reminder: You have an appointment today at ${appt.time}`;  // Fixed
    }
  });
}

function logout() {
  localStorage.removeItem('token');
  alert('Logged out');
  window.location.href = 'login.html';
}

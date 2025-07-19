# 💇‍♀️ Salon Appointment Booking App

A full-stack web application to book appointments for salon services. Users can select services, choose time slots, create, view, edit, and delete their appointments, and also receive 
reminders when their appointment is within the next hour. The application supports user authentication with Sign Up and Login functionality.


## 🚀 Features

- ✨ User Signup and Login
- 🛠️ Choose from multiple salon services
- 📅 Book appointments with available time slots
- 🔁 Edit, Reschedule, or Cancel appointments
- 🔔 Reminder notifications if the appointment is within the next hour
- 📜 View list of upcoming appointments
- 📲 RESTful API with backend logic using Node.js and MongoDB

## 🎥 Demo Video

[Click here to view the demo video on Google Drive](https://drive.google.com/file/d/YOUR_FILE_ID/view)


## 🛠️ Tech Stack

### 🔷 Frontend:
- HTML5
- CSS3
- JavaScript

### 🔷 Backend:
- Node.js
- Express.js
- MongoDB (with Mongoose)
- RESTful API design

## 🧪 How to Run the Project Locally

### 1️⃣ Backend Setup

1. Navigate to the `backend/` folder
2. Create a `.env` file and add:
   
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

3. Run the following commands:

```bash
npm install
node server.js

This will start your Express server on http://localhost:3000
- Ensure MongoDB is running locally or use MongoDB Atlas.

### 2️⃣ Frontend Setup

1. Go to `frontend/` folder
2. Open `welcome.html` in your browser

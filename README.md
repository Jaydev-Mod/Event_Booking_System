# 🎟️ Event Booking System

A full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to browse events, book tickets securely, and receive email confirmations. Admins can manage events and view bookings.

---

## 🚀 Features

- **User Authentication:** Secure login & registration using JWT and Bcrypt  
- **Event Management:** Admin can create, edit, and delete events  
- **Booking System:** Users can select ticket quantities and book events  
- **Secure Payments:** Simulated credit card checkout with validation  
- **Email Notifications:** Automated booking confirmation using EmailJS  
- **Responsive UI:** Built with React, Tailwind CSS, and Lucide Icons  
- **Password Security:** Show/Hide password toggle with secure hashing  

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Axios, Lucide React  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT (JSON Web Tokens)  
- **Email Service:** EmailJS  

---

## ⚙️ Local Setup Guide

### 1. Prerequisites

Ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **MongoDB** (Local installation or MongoDB Atlas)

Check versions:

```bash
node -v
npm -v
```

### 2. Clone the Repository
git clone <your-repository-url>
cd EventBookingSystem

### 3. Backend Setup (Server)
cd server
npm install


Create a .env file inside the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key


Start the backend server:

npm run dev


Server runs on:

http://localhost:5000

### 4. Frontend Setup (Client)

Open a new terminal:

cd client
npm install


Create a .env file inside the client folder:

VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key


Start the frontend:

npm run dev


Frontend runs on:

http://localhost:5173
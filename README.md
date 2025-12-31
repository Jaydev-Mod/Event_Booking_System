Here is the **complete, final `README.md` code** with the screenshot section removed, as requested.

You can copy this entire block and replace everything in your `README.md` file.

```markdown
# 🎟️ Event Booking System

A full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to browse events, book tickets securely, and receive email confirmations. Admins can manage events and view bookings.

## 🚀 Features

* **User Authentication:** Secure Login & Registration (with JWT & Bcrypt).
* **Event Management:** Admin can Create, Edit, and Delete events.
* **Booking System:** Users can select ticket quantities and book events.
* **Secure Payments:** Simulated credit card checkout with input masking and validation.
* **Email Notifications:** Automated email confirmation via EmailJS upon successful booking.
* **Responsive UI:** Built with React, Tailwind CSS, and Lucide Icons.
* **Password Security:** "Show/Hide" password toggles and secure hashing.

## 🛠️ Tech Stack

* **Frontend:** React (Vite), Tailwind CSS, Axios, Lucide React
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (JSON Web Tokens)
* **Email Service:** EmailJS

---

## ⚙️ Local Setup Guide

Follow these steps to set up and run the project locally.

### 1. Prerequisites
Ensure you have the following installed:
* **Node.js** (v14.0.0 or higher) - Check with `node -v`
* **npm** (v6.0.0 or higher) - Check with `npm -v`
* **MongoDB** (Locally installed or MongoDB Atlas URI)

### 2. Clone the Repository
```bash
git clone <your-repository-url>
cd EventBookingSystem

```

### 3. Backend Setup (Server)

Navigate to the server folder and install dependencies:

```bash
cd server
npm install

```

**Configure Environment Variables:**
Create a `.env` file inside the `server` folder and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key

```

**Start the Server:**

```bash
npm run dev

```

*The server should now be running on `http://localhost:5000*`

### 4. Frontend Setup (Client)

Open a new terminal, navigate to the client folder, and install dependencies:

```bash
cd client
npm install

```

**Configure Environment Variables:**
Create a `.env` file inside the `client` folder and add your EmailJS keys:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

```

**Start the React App:**

```bash
npm run dev

```

*The application should now be running on `http://localhost:5173*`

---

## 🧪 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| **POST** | `/api/users/login` | Authenticate user & get token |
| **POST** | `/api/users` | Register a new user |
| **GET** | `/api/events` | Fetch all events |
| **POST** | `/api/bookings` | Create a new booking (Protected) |

```

```
# 🚀 EventHub - College Event Management System

EventHub is a robust, full-stack web application designed to streamline event management in colleges. Built using the **MERN** stack (MongoDB, Express, React, Node.js), it provides a seamless interface for administrators to create and manage events and for students to explore, register, and track their participation.

---

## ✨ Features

- **🛡️ Secure Authentication**: JWT-based login and signup for both students and administrators.
- **🎨 Dynamic Roles**: Different access levels for **Admin** (management) and **User** (students).
- **📅 Event Management**: Create, edit, and delete events with details like category, venue, and registration limit.
- **🏢 Venue Coordination**: Manage venues, check their availability, and assign them to specific events.
- **📝 Easy Registration**: Students can sign up for events with just one click.
- **📱 Responsive UI**: A modern, responsive design optimized for various devices.
- **📊 Admin Dashboard**: Centralized hub for administrators to control events and venues.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** (UI Components)
- **React Router 6** (Navigation)
- **Axios** (API Requests)
- **Vanilla CSS** (Custom Styling)

### Backend
- **Node.js** & **Express**
- **MongoDB** (via **Mongoose**)
- **JSON Web Token (JWT)** (Secure Auth)
- **Bcrypt.js** (Password Hashing)

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your machine.
- MongoDB database (local or Atlas cluster).

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Abhi327561/eventhub.git
   cd eventhub
   ```

2. **Install Dependencies**
   From the root directory, run the helper script to install all client and server dependencies:
   ```bash
   npm run install-all
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the `server` directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```

4. **Run the Application**
   Launch both the server and client concurrently:
   ```bash
   npm run dev
   ```
   The client will run on [http://localhost:3000](http://localhost:3000) and the server on [http://localhost:5000](http://localhost:5000).

---

## 📂 Project Structure

```text
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page views
│   │   ├── context/        # Context providers for state management
│   │   └── App.js          # Main application component
├── server/                 # Express backend application
│   ├── models/             # Mongoose schemas
│   ├── controllers/        # Route logic handlers
│   ├── routes/             # API endpoint definitions
│   ├── middleware/         # Auth & error handling logic
│   └── server.js           # Main server entry point
├── package.json            # Root configuration for workspace
└── README.md               # You are here!
```

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Abhi327561**
- GitHub: [@Abhi327561](https://github.com/Abhi327561)

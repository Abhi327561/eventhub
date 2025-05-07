import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import CreateVenue from './pages/CreateVenue';
import Login from './pages/Login';
import Register from './pages/Register';
import { VenueProvider } from './context/VenueProvider';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

// src/App.js
function App() {
  return (
    <Router>
      <AuthProvider>
        <VenueProvider> {/* Add this provider */}
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route index element={<Home />} />
                <Route path="events" element={<Events />} />
                <Route path="events/:id" element={<EventDetail />} />
                
                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="create-event" element={<CreateEvent />} />
                  <Route path="profile" element={<Profile />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<PrivateRoute adminOnly />}>
                  <Route path="create-venue" element={<CreateVenue />} />
                  <Route path="admin" element={<AdminDashboard />} />
                </Route>

                {/* Auth Routes */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </VenueProvider>
      </AuthProvider>
    </Router>
  );
}
export default App;
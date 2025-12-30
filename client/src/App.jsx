import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';
import LoginPage from './pages/LoginPage';
import MyTicketsPage from './pages/MyTicketsPage';
import CreateEventPage from './pages/CreateEventPage';
import RegisterPage from './pages/RegisterPage';
import EditEventPage from './pages/EditEventPage';

function App() {
  return (
    <AuthProvider> 
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/event/:id" element={<EventDetailsPage />} />
            <Route path="/my-tickets" element={<MyTicketsPage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/edit-event/:id" element={<EditEventPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
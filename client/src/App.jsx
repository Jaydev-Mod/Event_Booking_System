import { useState } from 'react'; // <--- Import useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyTicketsPage from './pages/MyTicketsPage';
import CreateEventPage from './pages/CreateEventPage';
import EditEventPage from './pages/EditEventPage';
import PaymentPage from './pages/PaymentPage';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
          <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <Routes>
            <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
          
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/event/:id" element={<EventDetailsPage />} />
            <Route path="/my-tickets" element={<MyTicketsPage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/edit-event/:id" element={<EditEventPage />} />
            <Route path="/payment/:id" element={<PaymentPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
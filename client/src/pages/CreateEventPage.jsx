import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const CreateEventPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '',
    totalSeats: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      
      await axios.post('/api/events', formData, config);
      alert('Event Created Successfully!');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating event');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Create New Event</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        
        <div>
          <label className="block text-gray-700 font-bold mb-2">Event Title</label>
          <input name="title" onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea name="description" onChange={handleChange} className="w-full p-2 border rounded h-32" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Date</label>
            <input type="date" name="date" onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Time</label>
            <input type="time" name="time" onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Location</label>
          <input name="location" onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Price ($)</label>
            <input type="number" name="price" onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Total Seats</label>
            <input type="number" name="totalSeats" onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
        </div>

        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 transition">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
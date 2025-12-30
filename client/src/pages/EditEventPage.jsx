import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const EditEventPage = () => {
  const { id } = useParams(); // Get event ID from URL
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '', description: '', image: '', date: '', time: '', location: '', price: '', totalSeats: ''
  });
  const [loading, setLoading] = useState(true);

  // 1. Fetch current event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`/api/events/${id}`);
        // Format date for input field (YYYY-MM-DD)
        const dateStr = new Date(data.date).toISOString().split('T')[0];
        setFormData({ ...data, date: dateStr });
        setLoading(false);
      } catch (error) {
        alert('Error fetching event');
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      // Send PUT request to update
      await axios.put(`/api/events/${id}`, formData, config);
      alert('Event Updated!');
      navigate('/');
    } catch (error) {
      alert('Update failed');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Event</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        {/* Simplified inputs for brevity - logic same as Create Page */}
        <div><label className="block mb-1 font-bold">Title</label><input name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" /></div>
        
        <div><label className="block mb-1 font-bold">Description</label><textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded h-32" /></div>
        
        {/* For simplicity, we use text URL for image here. You can add the file upload logic if you want! */}
        <div><label className="block mb-1 font-bold">Image URL or Path</label><input name="image" value={formData.image} onChange={handleChange} className="w-full border p-2 rounded" /></div>

        <div className="grid grid-cols-2 gap-4">
          <div><label className="block mb-1 font-bold">Date</label><input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border p-2 rounded" /></div>
          <div><label className="block mb-1 font-bold">Time</label><input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full border p-2 rounded" /></div>
        </div>
        
        <div><label className="block mb-1 font-bold">Location</label><input name="location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded" /></div>
        
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block mb-1 font-bold">Price</label><input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded" /></div>
          <div><label className="block mb-1 font-bold">Total Seats</label><input type="number" name="totalSeats" value={formData.totalSeats} onChange={handleChange} className="w-full border p-2 rounded" /></div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700">Update Event</button>
      </form>
    </div>
  );
};

export default EditEventPage;
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Clock, Trash2, Edit, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get('/api/events');
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`/api/events/${id}`, config);
        setEvents(events.filter((event) => event._id !== id));
      } catch (error) {
        alert('Failed to delete event');
      }
    }
  };

  const filteredEvents = events.filter((event) => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center mt-10">Loading events...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* 🔍 MODIFIED: Smaller Hero & Search Bar */}
      <div className="bg-blue-900 rounded-lg p-6 mb-8 text-center text-white shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Find your next experience</h1>
        
        {/* Changed max-w-2xl to max-w-md (Medium) to make it smaller */}
        <div className="max-w-md mx-auto relative">
          <input 
            type="text" 
            placeholder="Search events..." 
            // Reduced padding from p-4 to p-3 for a slimmer look
            className="w-full p-3 pl-10 rounded-full text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Adjusted icon position */}
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {searchTerm ? `Results for "${searchTerm}"` : 'Upcoming Events'}
      </h2>

      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No events found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div key={event._id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative border border-gray-100 group">

              <div className="relative">
                <img
                  src={getImageUrl(event.image)}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* 💰 UPDATED: Rupee Symbol */}
                <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-md shadow-md font-bold text-sm">
                  ₹{event.price}
                </div>
              </div>

              {user && user.role === 'admin' && (
                <div className="absolute top-2 right-2 flex space-x-2 z-10">
                  <Link
                    to={`/edit-event/${event._id}`}
                    className="p-2 bg-white text-blue-600 rounded-full hover:bg-gray-100 shadow-md"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="p-2 bg-white text-red-600 rounded-full hover:bg-gray-100 shadow-md"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="p-5">
                <h3 className="text-lg font-bold mb-2 text-gray-900 leading-tight">{event.title}</h3>
                
                <div className="text-red-600 font-medium text-sm mb-3">
                  {new Date(event.date).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })} • {event.time}
                </div>
                
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{event.location}</p>

                <Link
                  to={`/event/${event._id}`}
                  className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Clock, Trash2, Edit, Music, Briefcase, Coffee, Code, Trophy, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

// 👇 Accept searchTerm as a prop
const HomePage = ({ searchTerm }) => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 👇 NEW: Category State
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Define our categories with icons
  const categories = [
    { name: 'All', icon: null },
    { name: 'Music', icon: <Music className="w-4 h-4" /> },
    { name: 'Business', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Performing & Visual Arts', icon: <Palette className="w-4 h-4" /> },
    { name: 'Workshop', icon: <Coffee className="w-4 h-4" /> },
    { name: 'Sports', icon: <Trophy className="w-4 h-4" /> },
  ];

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

  const filteredEvents = events.filter((event) => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = 
      selectedCategory === 'All' || 
      event.category === selectedCategory; // 👈 Exact match on DB field

    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="text-center mt-10">Loading events...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* 👇 NEW: Category Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex items-center px-6 py-2 rounded-full border transition-all duration-200 
              ${selectedCategory === cat.name 
                ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
          >
            {cat.icon && <span className="mr-2">{cat.icon}</span>}
            {cat.name}
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {searchTerm ? `Results for "${searchTerm}"` : `${selectedCategory} Events`}
      </h2>

      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No events found matching your criteria.</p>
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
                
                <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-md shadow-md font-bold text-sm">
                  {event.price === 0 ? 'Free' : `₹${event.price}`}
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
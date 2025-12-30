import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Clock, Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        // Remove from UI immediately
        setEvents(events.filter((event) => event._id !== id));
      } catch (error) {
        alert('Failed to delete event');
      }
    }
  };

  if (loading) return <div className="text-center mt-10">Loading events...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          // 👇 ADDED 'relative' HERE so the absolute buttons stay inside this card
          <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">

            <img
              src={getImageUrl(event.image)}
              alt={event.title}
              className="w-full h-48 object-cover"
            />

            {/* Admin Buttons Overlay */}
            {user && user.role === 'admin' && (
              <div className="absolute top-2 right-2 flex space-x-2">
                <Link
                  to={`/edit-event/${event._id}`}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 border-t pt-4">
                <span className="text-2xl font-bold text-blue-600">${event.price}</span>
                <Link
                  to={`/event/${event._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
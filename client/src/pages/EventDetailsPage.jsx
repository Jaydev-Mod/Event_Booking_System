import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // 👈 1. Import useNavigate
import axios from 'axios';
import { Calendar, MapPin, Clock } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const EventDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // 👈 2. Initialize it here

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`/api/events/${id}`);
        setEvent(data);
        setLoading(false);
      } catch (err) {
        setError('Event not found');
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  // 👇 3. This function handles the redirect
  const handleBookTicket = () => {
    if (!user) {
      alert('Please login to book tickets');
      navigate('/login');
      return;
    }
    navigate(`/payment/${id}?qty=${ticketCount}`);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Events</Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-800 text-white p-8">
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          <div className="flex flex-wrap gap-6 text-gray-300">
            <div className="flex items-center"><Calendar className="w-5 h-5 mr-2" /> {new Date(event.date).toLocaleDateString()}</div>
            <div className="flex items-center"><Clock className="w-5 h-5 mr-2" /> {event.time}</div>
            <div className="flex items-center"><MapPin className="w-5 h-5 mr-2" /> {event.location}</div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">About this Event</h2>
            <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">{event.description}</p>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-2">Ticket Information</h3>
              <p className="text-sm text-blue-600">Price per ticket: <span className="font-bold text-lg">₹{event.price}</span></p>
              <p className="text-sm text-blue-600">Seats Available: <span className="font-bold">{event.availableSeats}</span> / {event.totalSeats}</p>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="border rounded-xl p-6 shadow-sm bg-gray-50 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Book Tickets</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  value={ticketCount}
                  onChange={(e) => setTicketCount(Number(e.target.value))}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="flex justify-between items-center mb-6 text-lg font-semibold">
                <span>Total:</span>
                <span>₹{event.price * ticketCount}</span>
              </div>

              {/* 👇 4. Verify the onClick matches the function name */}
              <button 
                onClick={handleBookTicket} 
                disabled={bookingLoading || event.availableSeats === 0}
                className={`w-full text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center
                  ${event.availableSeats === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
                `}
              >
                {bookingLoading ? 'Processing...' : (event.availableSeats === 0 ? 'Sold Out' : 'Book Now')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
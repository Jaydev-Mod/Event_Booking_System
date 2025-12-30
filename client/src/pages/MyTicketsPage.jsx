import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyTicketsPage = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const { data } = await axios.get('/api/bookings/mybookings', config);
        setBookings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchBookings();
  }, [user]);

  if (loading) return <div className="text-center mt-10">Loading tickets...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Tickets</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <p className="text-gray-500 mb-4">You haven't booked any events yet.</p>
          <Link to="/" className="text-blue-600 hover:underline">Browse Events</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center border-l-4 border-blue-500">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{booking.event.title}</h3>
                <div className="flex space-x-4 text-sm text-gray-500 mb-2">
                  <div className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {new Date(booking.event.date).toLocaleDateString()}</div>
                  <div className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {booking.event.location}</div>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">Booking ID:</span> {booking._id}
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 text-right">
                <div className="text-2xl font-bold text-blue-600">{booking.numberOfTickets} <span className="text-sm text-gray-500 font-normal">Tickets</span></div>
                <div className="text-gray-600">Total: ${booking.totalAmount}</div>
                <span className="inline-block px-3 py-1 mt-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                  Confirmed
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTicketsPage;
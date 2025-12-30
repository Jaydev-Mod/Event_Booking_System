import { useEffect, useState, useContext } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Lock, CreditCard, Calendar, User } from 'lucide-react';

const PaymentPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty = parseInt(searchParams.get('qty') || '1');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // 👇 STATE FOR INPUT FORMATTING
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`/api/events/${id}`);
        setEvent(data);
        setLoading(false);
      } catch (error) {
        navigate('/');
      }
    };
    fetchEvent();
  }, [id, user, navigate]);

  // 👇 LOGIC: Input Masking (Auto-Formatting)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'number') {
      // Remove non-digits, limit to 16, add space every 4
      const raw = value.replace(/\D/g, '').slice(0, 16);
      formattedValue = raw.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    } 
    else if (name === 'expiry') {
      // Remove non-digits, limit to 4, add slash after 2
      const raw = value.replace(/\D/g, '').slice(0, 4);
      if (raw.length >= 2) {
        formattedValue = `${raw.slice(0, 2)}/${raw.slice(2)}`;
      } else {
        formattedValue = raw;
      }
    } 
    else if (name === 'cvc') {
      // Numbers only, max 3 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setCardData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const handlePayment = async (e) => {
    e.preventDefault(); 
    
    // Simple Validation
    if (cardData.number.replace(/\s/g, '').length < 16) {
      alert('Please enter a valid 16-digit card number');
      return;
    }

    setProcessing(true);

    setTimeout(async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.post('/api/bookings', {
          eventId: id,
          numberOfTickets: qty,
          paymentId: `PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}` 
        }, config);

        alert('Payment Successful! Ticket has been booked.');
        navigate('/my-tickets');
      } catch (error) {
        alert('Booking failed. Please try again.');
        setProcessing(false);
      }
    }, 2000);
  };

  if (loading) return <div className="text-center mt-10">Loading checkout...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Secure Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT: EVENT SUMMARY */}
        <div className="bg-gray-50 p-8 rounded-xl border h-fit">
          <h2 className="text-xl font-bold mb-6 text-gray-700">Order Summary</h2>
          <div className="flex gap-4 mb-6">
            <img src={getImageUrl(event.image)} alt={event.title} className="w-24 h-24 object-cover rounded-lg shadow-sm" />
            <div>
              <h3 className="font-bold text-lg">{event.title}</h3>
              <div className="text-gray-500 text-sm mt-1">{formatDate(event.date)}</div>
              <div className="text-gray-500 text-sm">{event.location}</div>
            </div>
          </div>
          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between"><span>Ticket Price</span><span>₹{event.price}</span></div>
            <div className="flex justify-between"><span>Quantity</span><span>x{qty}</span></div>
            <div className="flex justify-between font-bold text-xl pt-2 border-t mt-2">
              <span>Total Amount</span>
              <span className="text-blue-600">₹{event.price * qty}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: CREDIT CARD FORM */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Payment Details</h2>
            <div className="flex space-x-2">
              <div className="w-8 h-5 bg-blue-600 rounded"></div>
              <div className="w-8 h-5 bg-red-500 rounded"></div>
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  name="number"
                  value={cardData.number}
                  onChange={handleInputChange}
                  placeholder="0000 0000 0000 0000" 
                  className="w-full pl-10 p-3 border rounded-lg bg-gray-50 font-mono"
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    name="expiry"
                    value={cardData.expiry}
                    onChange={handleInputChange}
                    placeholder="MM/YY" 
                    className="w-full pl-10 p-3 border rounded-lg bg-gray-50 font-mono"
                    required 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    name="cvc"
                    value={cardData.cvc}
                    onChange={handleInputChange}
                    placeholder="123" 
                    className="w-full pl-10 p-3 border rounded-lg bg-gray-50 font-mono"
                    required 
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  name="name"
                  value={cardData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe" 
                  className="w-full pl-10 p-3 border rounded-lg bg-gray-50"
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={processing}
              className={`w-full py-4 rounded-lg font-bold text-white text-lg transition-all shadow-md flex justify-center items-center
                ${processing ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'}
              `}
            >
              {processing ? 'Processing...' : `Pay ₹${event.price * qty}`}
            </button>
            
            <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" /> Payments are secure and encrypted.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
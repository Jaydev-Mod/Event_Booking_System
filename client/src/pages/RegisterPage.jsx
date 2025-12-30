import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext); // Use global login function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Basic Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // 2. Call Backend API
      // Note: The endpoint is usually POST /api/users
      const { data } = await axios.post('/api/users', { 
        name, 
        email, 
        password 
      });
      
      // 3. Auto-Login the user
      login(data);
      
      // 4. Redirect to Home
      alert('Registration Successful!');
      navigate('/');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-blue-500"
              //placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-blue-500"
              //placeholder="john@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-blue-500"
              //placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-blue-500"
              //placeholder="••••••••"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full text-white font-bold py-2 px-4 rounded transition
              ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
            `}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
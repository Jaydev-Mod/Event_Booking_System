import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // 👈 1. Added useLocation
import AuthContext from '../context/AuthContext';
import { Search } from 'lucide-react';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // 👈 2. Get current URL location

  // 👇 3. Logic: Define where to HIDE the search bar
  const hideSearchRoutes = ['/login', '/register', '/admin'];
  const showSearch = !hideSearchRoutes.includes(location.pathname);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="w-full px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* LEFT: Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <span className="text-2xl font-bold text-blue-600">EventBooking</span>
          </Link>

          {/* CENTER: Search Bar (Desktop) */}
          {/* 👇 4. WRAP Desktop Search in Condition */}
          {showSearch && (
            <div className="hidden md:flex flex-1 justify-center px-8">
              <div className="relative w-full max-w-lg">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition-all"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
            </div>
          )}

          {/* RIGHT: User Menu */}
          <div className="flex items-center space-x-8 flex-shrink-0">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/create-event" className="text-gray-600 hover:text-green-600 font-medium hidden lg:block">
                    Create Event
                  </Link>
                )}
                <Link to="/my-tickets" className="text-gray-600 hover:text-blue-600 font-medium whitespace-nowrap">
                  My Tickets
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full border whitespace-nowrap">
                    {user.name}
                  </span>
                  <button onClick={handleLogout} className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Sign Up</Link>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile Search Bar (Visible only on small screens) */}
        {/* 👇 5. WRAP Mobile Search in Condition too */}
        {showSearch && (
          <div className="md:hidden pb-4">
             <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-100"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
             </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
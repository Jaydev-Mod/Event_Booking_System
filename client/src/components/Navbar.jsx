import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        <Link to="/" className="flex items-center py-4 px-2">
                            <span className="font-semibold text-gray-500 text-lg">
                                Event<span className="text-blue-600">Booking</span>
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-3">
                        {user ? (
                            // IF LOGGED IN: Show Name + Logout
                            <>
                                {user.role === 'admin' && (
                                    <Link to="/create-event" className="text-gray-600 hover:text-green-600 font-medium mr-4">
                                        Create Event
                                    </Link>
                                )}
                                <Link to="/my-tickets" className="text-gray-600 hover:text-blue-600 font-medium mr-4">
                                    My Tickets
                                </Link>
                                <div className="flex items-center text-gray-700 mr-4">
                                    <User className="w-4 h-4 mr-2" />
                                    <span className="font-semibold">{user.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="py-2 px-3 font-medium text-red-500 hover:bg-red-50 rounded transition duration-300 flex items-center"
                                >
                                    <LogOut className="w-4 h-4 mr-1" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            // IF LOGGED OUT: Show Login + Register
                            <>
                                <Link
                                    to="/login"
                                    className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-blue-500 hover:text-white transition duration-300"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/register"
                                    className="py-2 px-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
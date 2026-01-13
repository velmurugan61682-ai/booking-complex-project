import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                R
              </div>
              <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                RentSpace
              </span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/" className="text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </Link>
              <Link to="/shops" className="text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Properties
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-slate-500 text-sm">Hi, {user.name}</span>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-slate-600 hover:text-indigo-600 text-sm font-medium">Admin</Link>
                )}
                <Link to="/dashboard" className="text-slate-600 hover:text-indigo-600 text-sm font-medium">Dashboard</Link>
                <button onClick={handleLogout} className="btn-secondary py-1.5 px-4 text-sm">Logout</button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary py-2 px-4 shadow-indigo-500/20">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-indigo-600 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-slate-600 hover:text-indigo-600 hover:bg-slate-50 px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link to="/shops" className="block text-slate-600 hover:text-indigo-600 hover:bg-slate-50 px-3 py-2 rounded-md text-base font-medium">
              Properties
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block text-slate-600 hover:text-indigo-600 hover:bg-slate-50 px-3 py-2 rounded-md text-base font-medium">
                  Dashboard
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block text-slate-600 hover:text-indigo-600 hover:bg-slate-50 px-3 py-2 rounded-md text-base font-medium">
                    Admin Only
                  </Link>
                )}
                <button onClick={handleLogout} className="w-full text-left block text-red-600 hover:bg-red-50 px-3 py-2 rounded-md text-base font-medium">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-slate-600 hover:text-indigo-600 hover:bg-slate-50 px-3 py-2 rounded-md text-base font-medium">
                  Sign In
                </Link>
                <Link to="/register" className="block text-indigo-600 font-bold hover:bg-indigo-50 px-3 py-2 rounded-md text-base">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

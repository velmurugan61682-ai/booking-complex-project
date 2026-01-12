import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                R
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">RentSpace</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="text-slate-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </Link>
              <Link to="/shops" className="text-slate-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
                Explore
              </Link>
              <Link to="#" className="text-slate-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
                About
              </Link>
              <Link to="#" className="text-slate-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="#" className="text-slate-600 hover:text-indigo-600 font-medium text-sm hidden sm:block">
              List your space
            </Link>
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <button className="text-indigo-600 font-medium text-sm hover:text-indigo-700">Sign In</button>
            <button className="btn-primary text-sm px-5 py-2">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

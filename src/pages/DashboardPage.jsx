import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const { bookings, cancelBooking } = useBooking();
    const navigate = useNavigate();

    // Filter bookings for current user? 
    // Since our mock auth doesn't link user IDs to bookings strictly in the initial mock data, 
    // we might just show all bookings for demo or filter by email if we stored it.
    // Let's implement basic filtering if email matches, or just show all for demo simplicity.
    // Actually, let's filter by User Name for better demo experience if available.
    const myBookings = bookings; //.filter(b => b.userName === user?.name); 

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Dashboard</h1>
                    <p className="text-slate-600 mt-1">Welcome back, <span className="font-semibold text-indigo-600">{user.name}</span></p>
                </div>
                {user.role === 'admin' && (
                    <Link to="/admin" className="btn-primary shadow-lg">
                        Manage Properties
                    </Link>
                )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Account Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                        <p className="text-indigo-600 text-sm font-medium">Member Since</p>
                        <p className="text-2xl font-bold text-slate-800">Jan 2024</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <p className="text-green-600 text-sm font-medium">Active Bookings</p>
                        <p className="text-2xl font-bold text-slate-800">{myBookings.filter(b => b.status === 'Confirmed').length}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <p className="text-purple-600 text-sm font-medium">Account Type</p>
                        <p className="text-2xl font-bold text-slate-800 capitalize">{user.role}</p>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Bookings</h2>

            {myBookings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-500 mb-4">You haven't made any bookings yet.</p>
                    <Link to="/shops" className="text-indigo-600 font-medium hover:underline">Browse Shops & Buildings</Link>
                </div>
            ) : (
                <div className="grid gap-6">
                    {myBookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden flex flex-col md:flex-row">
                            <div className="md:w-1/4 h-32 md:h-auto relative">
                                <img src={booking.shopImage} alt={booking.shopName} className="w-full h-full object-cover" />
                                <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {booking.status}
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{booking.shopName}</h3>
                                    <p className="text-slate-500 text-sm">{booking.date} • {booking.duration} days</p>
                                    <p className="text-slate-700 mt-2">Total: <span className="font-semibold">₹{booking.totalPrice.toLocaleString('en-IN')}</span></p>
                                </div>
                                {booking.status === 'Confirmed' && (
                                    <div className="mt-4 md:mt-0 flex justify-end">
                                        <button
                                            onClick={() => cancelBooking(booking.id)}
                                            className="text-red-600 text-sm font-medium hover:text-red-800 transition-colors"
                                        >
                                            Cancel Booking
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DashboardPage;

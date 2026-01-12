import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shops } from '../data/shops';

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const shop = shops.find(s => s.id === parseInt(id));

    // Default form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        message: ''
    });

    if (!shop) return <div className="text-center py-20">Shop not found</div>;

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Booking Request Sent for review!");
        navigate('/');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Images & Description */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="rounded-2xl overflow-hidden h-[400px]">
                        <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                    </div>

                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 mb-2">{shop.name}</h1>
                                <p className="text-slate-500 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {shop.location}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 border-b border-slate-200 pb-8 mb-8">
                            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-sm font-medium">{shop.category}</span>
                            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-sm font-medium">{shop.size}</span>
                            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-sm font-medium">Verified Owner</span>
                        </div>

                        <div className="prose max-w-none text-slate-600">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">About this space</h3>
                            <p className="mb-4">{shop.description}</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Amenities</h3>
                            <ul className="grid grid-cols-2 gap-4">
                                {["High-Speed WiFi", "24/7 Access", "Meeting Rooms", "Coffee & Tea", "Printing Services", "Secure Entry"].map(item => (
                                    <li key={item} className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Booking Form */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-white border border-slate-200 shadow-lg rounded-xl p-6">
                        <div className="flex justify-between items-baseline mb-6">
                            <span className="text-2xl font-bold text-slate-900">${shop.price}</span>
                            <span className="text-slate-500 text-sm">per day</span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Date</label>
                                <input type="date" className="input-field" required />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Guests</label>
                                <select className="input-field">
                                    <option>1 Guest</option>
                                    <option>2-5 Guests</option>
                                    <option>5-10 Guests</option>
                                    <option>10+ Guests</option>
                                </select>
                            </div>

                            <button type="submit" className="w-full btn-primary py-3 text-lg">
                                Reserve Request
                            </button>
                            <p className="text-center text-xs text-slate-400 mt-2">You won't be charged yet</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;

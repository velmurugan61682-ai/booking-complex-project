import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { shops, addBooking } = useBooking();
    const { user } = useAuth();

    // Find shop from context
    const shop = shops.find(s => s.id === parseInt(id));

    // Default form state
    const [formData, setFormData] = useState({
        date: '',
        guests: '1 Guest'
    });

    if (!shop) return <div className="text-center py-20 text-xl font-bold text-slate-400">Shop not found or deleted</div>;

    const mainImage = shop.images ? shop.images[0] : shop.image;
    const otherImages = shop.images ? shop.images.slice(1) : [];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            navigate('/login');
            return;
        }

        const duration = 1; // Simplification: 1 day booking for now
        const totalPrice = shop.price * duration;

        addBooking({
            shopId: shop.id,
            shopName: shop.name,
            shopImage: mainImage,
            location: shop.location,
            date: formData.date,
            guests: formData.guests,
            duration,
            totalPrice,
            userName: user.name,
            userEmail: user.email
        });

        alert("Booking Confirmed!");
        navigate('/dashboard');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl overflow-hidden h-[400px] mb-8">
                <div className="h-full">
                    <img src={mainImage} alt={shop.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
                </div>
                <div className="grid grid-cols-2 gap-2 h-full">
                    {otherImages.map((img, idx) => (
                        <div key={idx} className="relative h-full overflow-hidden">
                            <img src={img} alt={`${shop.name} ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
                        </div>
                    ))}
                    {otherImages.length < 2 && (
                        <div className="bg-slate-100 flex items-center justify-center text-slate-400 font-medium">
                            More photos coming soon
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Description */}
                <div className="lg:col-span-2 space-y-8">
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
                            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-sm font-medium">Verified Property</span>
                            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-sm font-medium">Instant Book</span>
                            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-sm font-medium">Superhost</span>
                        </div>

                        <div className="prose max-w-none text-slate-600">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">About this space</h3>
                            <p className="mb-4">{shop.description}</p>

                            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Amenities</h3>
                            <ul className="grid grid-cols-2 gap-4">
                                {(shop.amenities && shop.amenities.length > 0 ? shop.amenities : ["High-Speed WiFi", "24/7 Access", "Meeting Rooms", "Coffee & Tea"]).map(item => (
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
                            <span className="text-2xl font-bold text-slate-900">₹{shop.price.toLocaleString('en-IN')}</span>
                            <span className="text-slate-500 text-sm">per month</span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    className="input-field"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Occupants</label>
                                <select
                                    className="input-field"
                                    value={formData.guests}
                                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                >
                                    <option>1 Person</option>
                                    <option>2-5 People</option>
                                    <option>5-10 People</option>
                                    <option>10+ People</option>
                                </select>
                            </div>

                            <button type="submit" className="w-full btn-primary py-3 text-lg">
                                {user ? "Book Now" : "Sign In to Book"}
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

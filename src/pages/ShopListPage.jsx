import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import ShopCard from '../components/ShopCard';

const ShopListPage = () => {
    const { shops, addBooking } = useBooking();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [filterCategory, setFilterCategory] = useState([]);

    const initialDisplayCount = 12;
    const displayedShops = shops.slice(0, initialDisplayCount);

    const handleBook = (shop) => {
        if (!user) {
            alert("Please login to book a shop.");
            navigate('/login');
            return;
        }

        if (window.confirm(`Confirm booking for ${shop.name}?\nMonthly Rent: ₹${shop.price.toLocaleString('en-IN')}`)) {
            const booking = {
                shopId: shop.id,
                shopName: shop.name,
                shopImage: shop.images ? shop.images[0] : shop.image,
                location: shop.location,
                date: new Date().toISOString().split('T')[0],
                guests: "1 Person",
                duration: 1,
                totalPrice: shop.price
            };

            addBooking(booking);
            alert("Booking Successful!");
            navigate('/dashboard');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filter */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-lg border border-slate-200 p-6 sticky top-24">
                        <h3 className="font-bold text-slate-900 mb-4 text-lg">Filters</h3>

                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                            <div className="space-y-2">
                                {['Office', 'Retail', 'Creative', 'Event', 'Coworking'].map(cat => (
                                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                                        <span className="text-slate-600 text-sm">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Price Range</label>
                            <div className="flex gap-2 items-center mb-2">
                                <input type="number" placeholder="Min" className="w-full border border-slate-300 rounded px-2 py-1 text-sm" />
                                <span className="text-slate-400">-</span>
                                <input type="number" placeholder="Max" className="w-full border border-slate-300 rounded px-2 py-1 text-sm" />
                            </div>
                        </div>

                        <button className="w-full btn-primary text-sm">Apply Filters</button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-grow">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-slate-900">{shops.length} Spaces Available</h1>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500 text-sm">Sort by:</span>
                            <select className="border-none bg-transparent font-medium text-slate-900 cursor-pointer focus:ring-0">
                                <option>Recommended</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {displayedShops.map(shop => (
                            <ShopCard key={shop.id} shop={shop} onBook={handleBook} />
                        ))}
                    </div>

                    {shops.length > initialDisplayCount && (
                        <div className="text-center">
                            <Link
                                to="/all-properties"
                                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                            >
                                View All Properties ({shops.length})
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShopListPage;

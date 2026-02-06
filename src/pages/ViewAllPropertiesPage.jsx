import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import ShopCard from '../components/ShopCard';

const ViewAllPropertiesPage = () => {
    const { shops, addBooking, bookings } = useBooking();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [filterCategory, setFilterCategory] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [sortBy, setSortBy] = useState('recommended');
    const itemsPerPage = 12;

    const handleBook = (shop) => {
        if (!user) {
            alert("Please login to book a property.");
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
                totalPrice: shop.price,
                userName: user.name,
                userEmail: user.email
            };

            addBooking(booking);
            alert("Booking Successful!");
            navigate('/dashboard');
        }
    };

    // Filter and sort shops
    const filteredAndSortedShops = useMemo(() => {
        let filtered = shops;

        // Apply category filter
        if (filterCategory) {
            filtered = filtered.filter(shop => shop.category?.toLowerCase().includes(filterCategory.toLowerCase()));
        }

        // Apply price range filter
        if (priceRange.min) {
            filtered = filtered.filter(shop => shop.price >= parseInt(priceRange.min));
        }
        if (priceRange.max) {
            filtered = filtered.filter(shop => shop.price <= parseInt(priceRange.max));
        }

        // Sort
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Keep original order for recommended
                break;
        }

        return filtered;
    }, [shops, filterCategory, priceRange, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedShops.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedShops = filteredAndSortedShops.slice(startIndex, startIndex + itemsPerPage);

    const getBookingStatus = (shopId) => {
        const shopBookings = bookings.filter(b => b.shopId === shopId);
        if (shopBookings.length === 0) return 'Available';
        const confirmedBookings = shopBookings.filter(b => b.status === 'Confirmed');
        return confirmedBookings.length > 0 ? 'Booked' : 'Available';
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">All Properties</h1>
                <p className="text-slate-600">Discover {filteredAndSortedShops.length} rental properties across Tamil Nadu</p>
            </div>

            {/* Filters and Sort */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                        >
                            <option value="">All Categories</option>
                            <option value="IT Office">IT Office</option>
                            <option value="Hostel">Hostel</option>
                            <option value="Coworking">Coworking</option>
                            <option value="Event">Event</option>
                            <option value="Studio">Studio</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Min Price (₹)</label>
                        <input
                            type="number"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                            placeholder="Min price"
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Max Price (₹)</label>
                        <input
                            type="number"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                            placeholder="Max price"
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Sort By</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                        >
                            <option value="recommended">Recommended</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Results Summary */}
            <div className="flex justify-between items-center mb-6">
                <p className="text-slate-600">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAndSortedShops.length)} of {filteredAndSortedShops.length} properties
                </p>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {paginatedShops.map(shop => (
                    <div key={shop.id} className="relative">
                        <ShopCard shop={shop} onBook={handleBook} />
                        <div className={`absolute top-4 right-4 px-2 py-1 rounded text-xs font-bold ${
                            getBookingStatus(shop.id) === 'Available'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                        }`}>
                            {getBookingStatus(shop.id)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = Math.max(1, currentPage - 2) + i;
                        if (pageNum > totalPages) return null;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`px-3 py-2 border rounded ${
                                    currentPage === pageNum
                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                        : 'border-slate-300 hover:bg-slate-50'
                                }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ViewAllPropertiesPage;
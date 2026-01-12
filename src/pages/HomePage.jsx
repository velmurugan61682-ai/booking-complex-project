import { Link } from 'react-router-dom';
import { shops } from '../data/shops';
import ShopCard from '../components/ShopCard';
import SearchBar from '../components/SearchBar';
import Testimonials from '../components/Testimonials';

const HomePage = () => {
    const featuredShops = shops.slice(0, 3);

    const categories = [
        { name: 'Office', icon: 'M19 21V5a2 2 0 012-2h-6v24h6a2 2 0 012-2z M17 9h2M17 13h2M17 17h2M5 21V7a2 2 0 012-2h6v20H7a2 2 0 01-2-2z M7 9h2M7 13h2M7 17h2' },
        { name: 'Retail', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
        { name: 'Studio', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { name: 'Warehouse', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
        { name: 'Event', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center bg-slate-900">
                <img
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000"
                    alt="Modern Office"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Find Your Perfect Space to <br className="hidden md:block" /> Work & Grow
                    </h1>
                    <p className="text-xl text-slate-200 mb-10">
                        Discover thousands of premium office, retail, and creative spaces available for rent.
                    </p>
                </div>
            </section>

            {/* Search Bar Container */}
            <div className="px-4">
                <SearchBar />
            </div>

            {/* Categories */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Browse by Category</h2>
                <div className="flex flex-wrap gap-6 justify-center md:justify-between">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="cursor-pointer group flex flex-col items-center gap-3 min-w-[100px]">
                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cat.icon} />
                                </svg>
                            </div>
                            <span className="font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Section */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Listings</h2>
                            <p className="text-slate-500">Hand-picked spaces for immediate occupancy.</p>
                        </div>
                        <Link to="/shops" className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1">
                            View All <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredShops.map(shop => (
                            <ShopCard key={shop.id} shop={shop} />
                        ))}
                    </div>
                </div>
            </section>

            <Testimonials />

            {/* CTA Section */}
            <section className="bg-indigo-900 py-16 text-center text-white">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">Ready to find your new space?</h2>
                    <p className="text-indigo-200 mb-8 mb-8 text-lg">Join thousands of businesses who found their home with RentSpace.</p>
                    <Link to="/shops" className="bg-white text-indigo-900 px-8 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors">
                        Start Browsing
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;

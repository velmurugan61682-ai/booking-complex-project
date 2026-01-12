import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">R</div>
                                <span className="text-xl font-bold text-slate-900">RentSpace</span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                The most trusted platform for renting office spaces, retail shops, and creative studios.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
                            <ul className="space-y-3 text-sm text-slate-500">
                                <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
                                <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
                                <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 mb-4">Support</h3>
                            <ul className="space-y-3 text-sm text-slate-500">
                                <li><a href="#" className="hover:text-indigo-600">Help Center</a></li>
                                <li><a href="#" className="hover:text-indigo-600">Safety Information</a></li>
                                <li><a href="#" className="hover:text-indigo-600">Cancellation Options</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 mb-4">Newsletter</h3>
                            <div className="flex gap-2">
                                <input type="email" placeholder="Email address" className="bg-slate-50 border border-slate-300 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-indigo-500" />
                                <button className="bg-indigo-600 text-white rounded px-3 py-2 text-sm hover:bg-indigo-700">Subscribe</button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-slate-100 pt-8 text-center text-slate-400 text-sm">
                        <p>&copy; 2026 RentSpace Inc. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;

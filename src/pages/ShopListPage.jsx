import { useState } from 'react';
import { shops } from '../data/shops';
import ShopCard from '../components/ShopCard';

const ShopListPage = () => {
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

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {shops.map(shop => (
                            <ShopCard key={shop.id} shop={shop} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopListPage;

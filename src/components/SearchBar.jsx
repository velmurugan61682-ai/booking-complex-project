import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [activeTab, setActiveTab] = useState('rent');

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl max-w-4xl mx-auto -mt-10 relative z-20">
            <div className="flex gap-6 mb-6 border-b border-slate-100 pb-2">
                {['rent', 'buy', 'cowork'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 text-sm font-semibold capitalize transition-colors ${activeTab === tab
                                ? 'text-indigo-600 border-b-2 border-indigo-600'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        {tab === 'cowork' ? 'Co-working' : tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_auto] gap-4 items-center">
                <div className="relative border-r border-slate-200 pr-4 last:border-0 md:border-r-0 md:pr-0">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Location
                    </label>
                    <input
                        type="text"
                        placeholder="City, neighborhood, or address"
                        className="w-full text-slate-900 font-medium placeholder-slate-400 focus:outline-none"
                    />
                </div>

                <div className="relative border-l md:border-l border-slate-200 pl-4">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Type
                    </label>
                    <select className="w-full p-0 border-none text-slate-900 font-medium focus:ring-0 bg-transparent cursor-pointer">
                        <option>All Types</option>
                        <option>Office</option>
                        <option>Retail</option>
                        <option>Creative Studio</option>
                        <option>Warehouse</option>
                    </select>
                </div>

                <div className="relative border-l border-slate-200 pl-4">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Price Range
                    </label>
                    <select className="w-full p-0 border-none text-slate-900 font-medium focus:ring-0 bg-transparent cursor-pointer">
                        <option>Any Price</option>
                        <option>$1,000 - $2,000</option>
                        <option>$2,000 - $5,000</option>
                        <option>$5,000+</option>
                    </select>
                </div>

                <button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 py-4 font-bold transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchBar;

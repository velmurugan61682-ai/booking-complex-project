import { Link } from 'react-router-dom';

const ShopCard = ({ shop }) => {
    return (
        <Link to={`/booking/${shop.id}`} className="group block bg-white rounded-2xl overflow-hidden border border-slate-100 card-shadow card-hover transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-600 uppercase tracking-wide">
                    {shop.category}
                </div>
                <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{shop.name}</h3>
                        <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {shop.location}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-indigo-600 font-bold text-xl">${shop.price}</p>
                        <p className="text-slate-400 text-xs">/day</p>
                    </div>
                </div>

                <div className="border-t border-slate-100 mt-4 pt-4 flex gap-4 text-slate-500 text-sm">
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        {shop.size}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Instant Book
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ShopCard;

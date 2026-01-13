import { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const { shops, addShop, deleteShop } = useBooking();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isAdding, setIsAdding] = useState(false);
    const [newShop, setNewShop] = useState({
        name: '',
        location: '',
        price: '',
        images: '',
        description: '',
        rating: 5.0,
        amenities: ''
    });

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/dashboard'); // Redirect non-admins
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        addShop({
            ...newShop,
            price: Number(newShop.price),
            images: newShop.images.split(',').map(item => item.trim()),
            amenities: newShop.amenities.split(',').map(item => item.trim())
        });
        setIsAdding(false);
        setNewShop({ name: '', location: '', price: '', images: '', description: '', rating: 5, amenities: '' });
    };

    if (!user || user.role !== 'admin') return null;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
                    <p className="text-slate-600">Manage rental properties and listings</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="btn-primary flex items-center gap-2"
                >
                    <span className="text-xl">+</span> Add New Property
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100 mb-8 animate-fade-in-down">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Add New Property</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" placeholder="Property Name" required className="input-field"
                            value={newShop.name} onChange={e => setNewShop({ ...newShop, name: e.target.value })} />

                        <input type="text" placeholder="Location" required className="input-field"
                            value={newShop.location} onChange={e => setNewShop({ ...newShop, location: e.target.value })} />

                        <input type="number" placeholder="Price per Month (₹)" required className="input-field"
                            value={newShop.price} onChange={e => setNewShop({ ...newShop, price: e.target.value })} />

                        <input type="text" placeholder="Image URLs (comma separated)" required className="input-field"
                            value={newShop.images} onChange={e => setNewShop({ ...newShop, images: e.target.value })} />

                        <input type="text" placeholder="Amenities (comma separated)" className="input-field md:col-span-2"
                            value={newShop.amenities} onChange={e => setNewShop({ ...newShop, amenities: e.target.value })} />

                        <textarea placeholder="Description" required className="input-field md:col-span-2 min-h-[100px]"
                            value={newShop.description} onChange={e => setNewShop({ ...newShop, description: e.target.value })}></textarea>

                        <div className="md:col-span-2 flex justify-end gap-3">
                            <button type="button" onClick={() => setIsAdding(false)} className="btn-secondary">Cancel</button>
                            <button type="submit" className="btn-primary">Save Property</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shops.map(shop => (
                    <div key={shop.id} className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col">
                        <div className="h-48 relative overflow-hidden group">
                            <img src={shop.images ? shop.images[0] : shop.image} alt={shop.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white font-medium">Edit Image</span>
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-slate-900">{shop.name}</h3>
                                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full">₹{shop.price.toLocaleString('en-IN')}/mo</span>
                            </div>
                            <p className="text-slate-500 text-sm mb-4">{shop.location}</p>
                            <div className="mt-auto flex justify-end gap-2 pt-4 border-t border-slate-100">
                                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 px-3 py-1">Edit</button>
                                <button onClick={() => deleteShop(shop.id)} className="text-red-600 text-sm font-medium hover:text-red-800 px-3 py-1 bg-red-50 rounded hover:bg-red-100 transition-colors">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;

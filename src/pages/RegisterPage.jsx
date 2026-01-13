import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user' // Default to user
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        const result = register(formData.name, formData.email, formData.password, formData.role);
        if (result.success) {
            navigate('/shops');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-slate-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">Create Account</h2>
                    <p className="text-slate-500 mt-2">Join us to find your perfect space</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            required
                            className="input-field"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            className="input-field"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="input-field"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">I am a...</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'user' })}
                                className={`py-2 rounded-lg border text-sm font-medium transition-colors ${formData.role === 'user'
                                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                Renter
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'admin' })}
                                className={`py-2 rounded-lg border text-sm font-medium transition-colors ${formData.role === 'admin'
                                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                Property Owner
                            </button>
                        </div>
                        <p className="text-xs text-slate-400 mt-2 text-center">*Select Property Owner to access Admin Panel</p>
                    </div>

                    <button type="submit" className="w-full btn-primary py-3 text-lg shadow-lg hover:shadow-indigo-500/30 mt-4">
                        Sign Up
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;

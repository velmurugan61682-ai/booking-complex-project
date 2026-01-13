import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            const { password, ...userWithoutPass } = foundUser;
            setUser(userWithoutPass);
            localStorage.setItem('user', JSON.stringify(userWithoutPass));
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const register = (name, email, password, role = 'user') => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'User already exists' };
        }

        const newUser = { id: Date.now(), name, email, password, role };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto login after register
        const { password: _, ...userWithoutPass } = newUser;
        setUser(userWithoutPass);
        localStorage.setItem('user', JSON.stringify(userWithoutPass));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

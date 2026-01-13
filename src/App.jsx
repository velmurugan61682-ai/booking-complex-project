import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ShopListPage from './pages/ShopListPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="shops" element={<ShopListPage />} />
            <Route path="booking/:id" element={<BookingPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;

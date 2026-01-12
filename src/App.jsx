import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ShopListPage from './pages/ShopListPage';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shops" element={<ShopListPage />} />
        <Route path="booking/:id" element={<BookingPage />} />
      </Route>
    </Routes>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';
import CheckoutPage from '../pages/CheckoutPage';

export default function AppRoutes() {
  return (
    <Routes>
           <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<Cart />} />
        {/* أي مسار محمي يضاف هنا */}
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}
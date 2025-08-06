import { Link } from 'react-router-dom';
import AppRoutes from './routes/Routes';

function App() {
  return (
    <div className="min-h-screen">
      <nav className="bg-gray-800 p-4">
        <div className="flex space-x-4 text-white">
          <Link to="/">الرئيسية</Link>
          <Link to="/products">المنتجات</Link>
          <Link to="/cart">العربة</Link>
          <Link to="/login">تسجيل الدخول</Link>
        </div>
      </nav>
      <main className="p-4">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
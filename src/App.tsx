import { Link } from 'react-router-dom';
import AppRoutes from './routes/Routes';

function App() {
  return (
    <div className="min-h-screen bg-gray-500 flex flex-col">
      {/* الشريط العلوي */}
      <nav className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 h-16 items-center justify-between">
            {/* الروابط */}
            <div className="flex space-x-6 font-semibold text-gray-100 text-lg uppercase tracking-wide transition-colors duration-200 hover:text-yellow-400">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/login" className="hover:text-yellow-400">Log In</Link>
            </div>
            {/* يمكن إضافة عناصر أخرى هنا (مثل زر تسجيل خروج أو شعار) */}
          </div>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-6 bg-yellow-200 max-w-7xl mx-auto">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;

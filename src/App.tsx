import { NavLink, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AppRoutes from './routes/Routes';
import ThemeToggle from './components/ThemeToggle'; // تأكد من استيراد المكون

function App() {
  const location = useLocation();
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/cart", label: "Cart" },
    { to: "/login", label: "Log In" }
  ];

  useEffect(() => {
    const pageTitles: Record<string, string> = {
      '/': 'Home - My App',
      '/products': 'Products - My App',
      '/cart': 'Shopping Cart - My App',
      '/login': 'Login - My App'
    };
    document.title = pageTitles[location.pathname] || 'My App';
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* الشريط العلوي مع دعم Dark Mode */}
      <nav className="bg-gray-800 dark:bg-gray-950 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* الجزء الأيسر (الروابط) */}
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `font-semibold text-lg uppercase tracking-wide 
                     text-gray-100 hover:text-yellow-400 dark:hover:text-yellow-300
                     transition-colors duration-200
                     ${isActive ? 'text-yellow-400 dark:text-yellow-300 border-b-2 border-yellow-400 dark:border-yellow-300' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* الجزء الأيمن (زر التبديل) */}
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-6 bg-white dark:bg-gray-800 max-w-7xl mx-auto">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
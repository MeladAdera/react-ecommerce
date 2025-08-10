import { NavLink, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AppRoutes from './routes/Routes';

function App() {
  const location = useLocation();
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/cart", label: "Cart" },
    { to: "/login", label: "Log In" }
  ];

  useEffect(() => {
    const pageTitles : Record<string, string> = {
      '/': 'Home - My App',
      '/products': 'Products - My App',
      '/cart': 'Shopping Cart - My App',
      '/login': 'Login - My App'
    };
    
    document.title = pageTitles[location.pathname] || 'My App';
  }, [location.pathname]);

 

  return (
    <div className="min-h-screen bg-gray-500 flex flex-col">
      {/* الشريط العلوي  Top bar*/}
      <nav className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 h-16 items-center justify-between">
            {/* الروابط  links*/}
            <div className="flex space-x-6 font-semibold text-gray-100 text-lg uppercase tracking-wide transition-colors duration-200">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => 
                    `hover:text-yellow-400 ${isActive ? 'text-yellow-400 border-b-2 border-yellow-400' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
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
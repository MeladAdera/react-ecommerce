import { Link } from 'react-router-dom';
import AppRoutes from './routes/Routes';

function App() {
  return (
    <div className="min-h-screen">
      <nav className="bg-gray-800 p-4">
        <div className="flex space-x-4 text-white">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">logIn</Link>
        </div>
      </nav>
      <main className="p-4">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
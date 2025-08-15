import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { isDark } = useTheme();
  return (
    <div className={`flex items-center justify-center min-h-screen ${
      isDark ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <div className="bg-white p-10 md:p-14 shadow-xl rounded-3xl max-w-3xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
          Welcome to the <span className="text-gray-900">E-commerce Store!</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Explore our diverse collection of products designed to meet your needs. Shop effortlessly and securely with us.
        </p>
        <Link to="/products" className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300">
          start shoping
        </Link>
      </div>
    </div>
  );
};

export default Home;

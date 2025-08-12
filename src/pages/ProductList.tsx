import { useEffect, useState, useMemo } from 'react';
import { getProducts } from '../api/products';
import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';
import StarRating from '../components/StarRating';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<string>('default');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCartStore();

  const [userRatings, setUserRatings] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem('productRatings');
    return saved ? JSON.parse(saved) : {};
  });
  
  const handleRate = (productId: number, rating: number) => {
    const newRatings = { ...userRatings, [productId]: rating };
    setUserRatings(newRatings);
    localStorage.setItem('productRatings', JSON.stringify(newRatings));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const sortedProducts = useMemo(() => {
    const productsToSort = [...products];
    switch (sortOption) {
      case 'price-low':
        return productsToSort.sort((a, b) => a.price - b.price);
      case 'price-high':
        return productsToSort.sort((a, b) => b.price - a.price);
      case 'rating':
        return productsToSort.sort((a, b) => b.rating.rate - a.rating.rate);
      default:
        return productsToSort;
    }
  }, [products, sortOption]);

  const filteredProducts = useMemo(() => {
    return sortedProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedProducts, searchTerm]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Products</h1>
      
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        {/* شريط البحث */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-3 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-1  text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* عناصر الترتيب */}
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-gray-700 whitespace-nowrap">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 flex items-center justify-center p-4 bg-gray-50">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                  {product.title}
                </h3>
                
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-gray-600">
                    {product.rating.rate} ({product.rating.count})
                  </span>
                </div>

                <div className="my-2">
                  <p className="text-sm text-gray-600">Overall Rating: {product.rating.rate} ({product.rating.count})</p>
                  <div className="flex items-center mt-1">
                    <span className="mr-2 text-sm">Your Rating:</span>
                    <StarRating
                      rating={userRatings[product.id] || 0}
                      onRate={(rating) => handleRate(product.id, rating)}
                      interactive={true}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </span>
                  
                  <button 
                    onClick={() => addToCart({
                      productId: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image
                    })}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Add to Cart
                  </button>
                </div>
                
                <Link 
                  to={`/products/${product.id}`} 
                  className="mt-2 block text-center text-blue-950 bg-sky-200 hover:bg-sky-500 py-2 rounded"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import { useEffect, useState, useMemo } from 'react';
import { getProducts } from '../api/products';
import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<string>('default');
  const { addToCart } = useCartStore();

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

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Products</h1>
      
      {/* Sorting Controls */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-gray-700">Sort by:</label>
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
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
                className="mt-2 block text-center text-blue-600 hover:text-blue-800 hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
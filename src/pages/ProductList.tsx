"use client"

import { useEffect, useState, useMemo } from "react"
import { getProducts } from "../api/products"
import { useCartStore } from "../store/cartStore"
import { Link } from "react-router-dom"
import StarRating from "../components/StarRating"
import { useTheme } from "../context/ThemeContext"

interface Product {
  id: number
  title: string
  price: number
  image: string
  category: string
  rating: {
    rate: number
    count: number
  }
}

export default function ProductList() {
  const { isDark } = useTheme();
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortOption, setSortOption] = useState<string>("default")
  const [searchTerm, setSearchTerm] = useState("")
  const { addToCart } = useCartStore()

  const [userRatings, setUserRatings] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem("productRatings")
    return saved ? JSON.parse(saved) : {}
  })

  const handleRate = (productId: number, rating: number) => {
    const newRatings = { ...userRatings, [productId]: rating }
    setUserRatings(newRatings)
    localStorage.setItem("productRatings", JSON.stringify(newRatings))
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const sortedProducts = useMemo(() => {
    const productsToSort = [...products]
    switch (sortOption) {
      case "price-low":
        return productsToSort.sort((a, b) => a.price - b.price)
      case "price-high":
        return productsToSort.sort((a, b) => b.price - a.price)
      case "rating":
        return productsToSort.sort((a, b) => b.rating.rate - a.rating.rate)
      default:
        return productsToSort
    }
  }, [products, sortOption])

  const filteredProducts = useMemo(() => {
    return sortedProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [sortedProducts, searchTerm])

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="relative">
          <div className={`w-16 h-16 border-4 rounded-full animate-spin ${
            isDark ? 'border-gray-700 border-t-gray-500' : 'border-slate-200 border-t-slate-600'
          }`}></div>
          <div className={`absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-spin animation-delay-150 ${
            isDark ? 'border-t-gray-400' : 'border-t-slate-400'
          }`}></div>
        </div>
      </div>
    )

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold mb-4 ${
          isDark ? 'text-gray-100' : 'text-slate-900'
        }`}>
          Our Products
        </h1>
        <p className={`text-lg max-w-2xl mx-auto ${
          isDark ? 'text-gray-400' : 'text-slate-600'
        }`}>
          Discover our curated collection of premium products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-10">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md lg:max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className={`h-5 w-5 ${
              isDark ? 'text-gray-400' : 'text-slate-400'
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search products or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md ${
              isDark 
                ? 'bg-gray-800 text-gray-100 border-gray-700 focus:ring-gray-500 placeholder-gray-400' 
                : 'bg-white text-slate-900 border-slate-200 focus:ring-slate-500 placeholder-slate-500'
            }`}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className={`absolute inset-y-0 right-0 pr-4 flex items-center ${
                isDark ? 'text-gray-400 hover:text-gray-300' : 'text-slate-400 hover:text-slate-600'
              } transition-colors`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className={`font-medium whitespace-nowrap ${
            isDark ? 'text-gray-300' : 'text-slate-700'
          }`}>
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer ${
              isDark
                ? 'bg-gray-800 text-gray-100 border-gray-700 focus:ring-gray-500'
                : 'bg-white text-slate-900 border-slate-200 focus:ring-slate-500'
            }`}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
            isDark ? 'bg-gray-800' : 'bg-slate-100'
          }`}>
            <svg className={`w-12 h-12 ${
              isDark ? 'text-gray-500' : 'text-slate-400'
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className={`text-2xl font-semibold mb-2 ${
            isDark ? 'text-gray-100' : 'text-slate-900'
          }`}>
            No products found
          </h3>
          <p className={`mb-8 max-w-md mx-auto ${
            isDark ? 'text-gray-400' : 'text-slate-600'
          }`}>
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <button
            onClick={() => setSearchTerm("")}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl ${
              isDark
                ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500'
                : 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500'
            } focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`group rounded-2xl shadow-sm overflow-hidden transition-all duration-300 transform hover:-translate-y-1 ${
                isDark
                  ? 'bg-gray-800 border-gray-700 hover:shadow-gray-700'
                  : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-xl'
              } border`}
            >
              <div className={`aspect-square p-6 flex items-center justify-center overflow-hidden ${
                isDark ? 'bg-gray-700' : 'bg-slate-50'
              }`}>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className={`font-semibold text-lg mb-3 line-clamp-2 leading-tight ${
                  isDark ? 'text-gray-100' : 'text-slate-900'
                }`}>
                  {product.title}
                </h3>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className={`ml-1 text-sm font-medium ${
                      isDark ? 'text-gray-300' : 'text-slate-700'
                    }`}>
                      {product.rating.rate}
                    </span>
                    <span className={`ml-1 text-sm ${
                      isDark ? 'text-gray-500' : 'text-slate-500'
                    }`}>
                      ({product.rating.count})
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className={`text-sm mb-2 ${
                    isDark ? 'text-gray-400' : 'text-slate-600'
                  }`}>
                    Your Rating:
                  </p>
                  <StarRating
                    rating={userRatings[product.id] || 0}
                    onRate={(rating) => handleRate(product.id, rating)}
                    interactive={true}
                    darkMode={isDark}
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl font-bold ${
                    isDark ? 'text-gray-100' : 'text-slate-900'
                  }`}>
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() =>
                      addToCart({
                        productId: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                      })
                    }
                    className={`w-full px-4 py-3 text-white rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] ${
                      isDark
                        ? 'bg-gray-700 hover:bg-gray-600 focus:ring-gray-500'
                        : 'bg-slate-900 hover:bg-slate-800 focus:ring-slate-500'
                    }`}
                  >
                    Add to Cart
                  </button>

                  <Link
                    to={`/products/${product.id}`}
                    className={`block w-full text-center py-3 rounded-xl transition-all duration-200 font-medium ${
                      isDark
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
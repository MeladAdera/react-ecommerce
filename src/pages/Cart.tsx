import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom'; 
import { useTheme } from '../context/ThemeContext';

export default function Cart() {
  const { isDark } = useTheme();
  const { cart, removeFromCart, updateQuantity } = useCartStore(); 
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingFee + tax;

  return (
    <div className={`max-w-4xl mx-auto p-6 min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <h1 className={`text-3xl font-bold mb-8 pb-4 border-b ${
        isDark ? 'text-gray-100 border-gray-700' : 'text-gray-800 border-gray-200'
      }`}>
        Shopping Cart
      </h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-16 w-16 mx-auto ${isDark ? 'text-gray-500' : 'text-gray-400'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className={`mt-4 text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Your cart is empty
          </p>
          <Link 
            to="/products" 
            className={`mt-6 inline-block px-6 py-3 rounded-lg text-white transition-colors ${
              isDark ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cart Items */}
          {cart.map((item) => (
            <div 
              key={item.productId} 
              className={`flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border ${
                isDark ? 'bg-gray-800 hover:shadow-gray-700 border-gray-700' : 'bg-white hover:shadow-lg border-gray-100'
              }`}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className={`w-20 h-20 object-contain p-2 rounded border ${
                  isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}
              />
              
              <div className="flex-1 w-full">
                <h3 className={`font-semibold text-lg ${
                  isDark ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  {item.title}
                </h3>
                <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  ${item.price.toFixed(2)} × 
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      updateQuantity(item.productId, newQuantity);
                    }}
                    className={`w-16 mx-2 p-1 border rounded text-center ${
                      isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  = <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </p>
              </div>
              
              <button 
                onClick={() => removeFromCart(item.productId)}
                className={`flex items-center justify-center px-4 py-2 rounded-full transition-colors ${
                  isDark ? 'bg-red-900/30 text-red-400 hover:bg-red-900/40' : 'bg-red-50 text-red-600 hover:bg-red-100'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="ml-2">Remove</span>
              </button>
            </div>
          ))}
          
          {/* Order Summary */}
          <div className={`p-6 rounded-lg shadow-sm border ${
            isDark ? 'bg-gray-800 shadow-gray-700 border-gray-700' : 'bg-white border-gray-100'
          }`}>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                <span className={isDark ? 'text-gray-100' : 'text-gray-900'}>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
                <span className={isDark ? 'text-gray-100' : 'text-gray-900'}>
                  {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Tax (10%)</span>
                <span className={isDark ? 'text-gray-100' : 'text-gray-900'}>${tax.toFixed(2)}</span>
              </div>
              <div className={`flex justify-between border-t pt-3 font-bold text-lg ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <span className={isDark ? 'text-gray-100' : 'text-gray-900'}>Total</span>
                <span className={isDark ? 'text-gray-100' : 'text-gray-900'}>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Link 
                to="/products" 
                className={`px-6 py-3 rounded-lg transition-colors text-center ${
                  isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Continue Shopping
              </Link>
              <Link 
                to="/checkout" 
                className={`px-6 py-3 text-white rounded-lg transition-colors text-center ${
                  isDark ? 'bg-green-700 hover:bg-green-800' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
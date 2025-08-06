import { useCartStore } from '../store/cartStore';

export default function Cart() {
  const { cart, removeFromCart } = useCartStore();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = 5.99; // Example shipping fee
  const tax = subtotal * 0.1; // Example 10% tax
  const total = subtotal + shippingFee + tax;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="mt-4 text-xl text-gray-600">Your cart is empty</p>
          <p className="text-gray-500">You have {cart.length} items in your cart</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cart Items */}
          {cart.map((item) => (
            <div key={item.productId} className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-20 h-20 object-contain bg-gray-50 p-2 rounded border"
              />
              
              <div className="flex-1 w-full">
                <h3 className="font-semibold text-gray-800 text-lg">{item.title}</h3>
                <p className="text-gray-600 mt-1">
                  ${item.price.toFixed(2)} × {item.quantity} = 
                  <span className="font-medium ml-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </p>
              </div>
              
              <button 
                onClick={() => removeFromCart(item.productId)}
                className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
                aria-label="Remove item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="ml-2">Remove</span>
              </button>
            </div>
          ))}
          
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-3 font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Continue Shopping
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
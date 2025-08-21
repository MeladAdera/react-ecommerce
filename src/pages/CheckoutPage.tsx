import { useCartStore } from '../store/cartStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedCheckout from '../components/ProtectedCheckout';
import { useTheme } from '../context/ThemeContext';

type PaymentMethod = 'credit' | 'paypal' | 'cash';

interface FormData {
  name: string;
  email: string;
  address: string;
  paymentMethod: PaymentMethod;
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'credit'
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log('Order details:', {
      products: cart,
      customer: formData,
      total
    });

    clearCart();
    navigate('/order-confirmation');
  };

  if (cart.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 dark:text-gray-600">Your cart is empty</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 dark:bg-blue-700 text-gray-600 px-6 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProtectedCheckout>
      <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-orange-400">
            Checkout
          </h1>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-xl font-semibold mb-4 text-orange-400">
                  Shipping Information
                </h2>
                
                <div className="mb-4">
                  <label className="block mb-2 text-gray-700 dark:text-gray-600">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full p-2 border rounded ${isDark ? 'bg-gray-700 text-gray-600 border-gray-600' : 'bg-white border-gray-600'}`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-gray-700 dark:text-gray-600">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full p-2 border rounded ${isDark ? 'bg-gray-700 text-gray-600 border-gray-600' : 'bg-white border-gray-300'}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-gray-700 dark:text-gray-600">Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className={`w-full p-2 border rounded ${isDark ? 'bg-gray-700 text-gray-600 border-gray-600' : 'bg-white border-gray-300'}`}
                    rows={3}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-900 dark:text-orange-400">Payment Method</h2>
                <div className="space-y-2">
                  {(['credit', 'paypal', 'cash'] as PaymentMethod[]).map((method) => (
                    <label key={method} className="flex items-center space-x-2 text-gray-700 dark:text-gray-600">
                      <input
                        type="radio"
                        checked={formData.paymentMethod === method}
                        onChange={() => setFormData({...formData, paymentMethod: method})}
                        className="text-blue-600 dark:text-blue-400"
                      />
                      <span>
                        {method === 'credit' && 'Credit Card'}
                        {method === 'paypal' && 'PayPal'}
                        {method === 'cash' && 'Cash on Delivery'}
                      </span>
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-gray-600 py-3 rounded-lg mt-6 transition-colors"
                >
                  Place Order
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className={`p-6 rounded-lg shadow-md h-fit ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-600">Order Summary</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.productId} className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700">
                    <span className="text-gray-800 dark:text-gray-600">
                      {item.title} × {item.quantity}
                    </span>
                    <span className="text-gray-800 dark:text-gray-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                
                <div className="border-t pt-4 space-y-2 border-gray-600 dark:border-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-400">Subtotal</span>
                    <span className="text-gray-900 dark:text-gray-600">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-400">Tax (15%)</span>
                    <span className="text-gray-900 dark:text-gray-600">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span className="text-gray-900 dark:text-gray-600">Total</span>
                    <span className="text-gray-900 dark:text-gray-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedCheckout>
  );
}
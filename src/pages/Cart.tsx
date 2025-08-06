import { useCartStore } from '../store/cartStore';

export default function Cart() {
  const { cart, removeFromCart } = useCartStore();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">shopping cart</h1>
      {cart.length === 0 ? (
        <p> cart is empty {cart.length}</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.productId} className="flex items-center border-b py-2">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
              <div className="flex-1 ml-4">
                <h3 className="font-medium">{item.title}</h3>
                <p>السعر: ${item.price} × {item.quantity}</p>
              </div>
              <button 
                onClick={() => removeFromCart(item.productId)}
                className="text-red-500"
              >
                إزالة
              </button>
            </div>
          ))}
          <div className="mt-4 border-t pt-2">
            <p className="font-bold">المجموع: ${total.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
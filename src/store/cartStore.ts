// store/cartStore.ts
import { create } from 'zustand';
import type { CartItem } from '../types/cart';

interface CartState {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  updateQuantity: (productId: number, newQuantity: number)=>void
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find((item) => item.productId === product.productId);
    if (existingItem) {
      return {
        cart: state.cart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.productId !== productId),
  })),

updateQuantity: (productId: number, newQuantity: number) => {
  set(state => ({
    cart: state.cart.map(item => 
      item.productId === productId 
        ? { ...item, quantity: Math.max(1, newQuantity) } // تأكد أن الكمية لا تقل عن 1
        : item
    )
  }));
},
  clearCart: () => set({ cart: [] }),
}));
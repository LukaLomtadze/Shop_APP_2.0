import { create } from "zustand";

export const useCartStore = create((set) => ({
    cartCount: 0,
    addToCart: () => set((state) => ({
        cartCount : state.cartCount + 1


    })),
    resetCart: () => set({cartCount: 0})
}))

const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];

export const useCartLogicStore = create((set, get) => ({
    cartItems: savedCart,
  
    addToCartLogic: (product) => {
        const { cartItems } = get();
        const existingItem = cartItems.find(
          (item) => item.id === product.id && item.selectedSize === product.selectedSize
        );
    
        let updatedCart;
    
        if (existingItem) {
          updatedCart = cartItems.map((item) =>
            item.id === product.id && item.selectedSize === product.selectedSize
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedCart = [...cartItems, { ...product, quantity: 1 }];
        }
    
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        set({ cartItems: updatedCart });
      },
    
      
  
      removeFromCart: (id) => {
        const updatedCart = get().cartItems.filter((item) => item.id !== id);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        set({ cartItems: updatedCart });
      },
  
    increaseQuantity: (id) => {
      set({
        cartItems: get().cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    },
  
    decreaseQuantity: (id) => {
      set({
        cartItems: get().cartItems.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        ),
      });
    },
  
    clearCart: () => set({ cartItems: [] }),
  }));

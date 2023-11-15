import { createContext, useState, useContext, useEffect } from "react";
import { db } from '../.';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const CartWidgetDocument = doc(db, 'cartwidget', 'lS4hl9eFiCzpDj3aBgAa');
        const docSnapshot = await getDoc(CartWidgetDocument);

        if (docSnapshot.exists()) {
          const count = docSnapshot.data().count;
          setCartCount(count);
        } else {
          console.log('Document does not exist');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      }
    };

    fetchCartCount();
  }, []); // Fetch cart count on component mount

  const addItem = (item, quantity) => {
    if (!isInCart(item.id)) {
      setCart((prev) => [...prev, { ...item, quantity }]);
      updateCartCount(cartCount + quantity);
    } else {
      console.error('Item is already added');
    }
  };

  const updateCartCount = (count) => {
    const CartWidgetDocument = doc(db, 'cartwidget', 'lS4hl9eFiCzpDj3aBgAa');
    updateDoc(CartWidgetDocument, { count });
    setCartCount(count);
  };

  const removeItem = (itemId) => {
    const cartUpdated = cart.filter((item) => item.id !== itemId);
    setCart(cartUpdated);
    const newCount = cartUpdated.reduce((acc, item) => acc + item.quantity, 0);
    console.log(newCount);
    updateCartCount(newCount);
  };

  const clearCart = () => {
    setCart([]);
    updateCartCount(0);
  };

  const isInCart = (itemId) => {
    return cart.some((item) => item.id === itemId);
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
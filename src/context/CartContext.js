import { createContext, useState, useContext } from "react";
import { db } from '../.'
import { doc, updateDoc, getDoc  } from 'firebase/firestore';

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [cartCount, setCartCount] = useState(0); 

    const addItem = (item, quantity) => {
        if(!isInCart(item.id)){
            setCart(prev => [...prev, {...item, quantity}])
            incrementCartCount(cartCount + quantity);
        }else{
            console.error('Item is already added')
        }
    }
    const CartWidgetCount = async () => {
        try {
          const CartWidgetDocument = doc(db, 'cartwidget', 'lS4hl9eFiCzpDj3aBgAa');
          const docSnapshot = await getDoc(CartWidgetDocument);
          
          if (docSnapshot.exists()) {
            const count = docSnapshot.data().count;
            cartCount = count;
            return count;
          } else {
            console.log('Document does not exist');
            return 0;
          }
        } catch (error) {
          console.error('Error getting document:', error);
          return 0; 
        }
      }
    const incrementCartCount = (count) => {
        const CartWidgetDocument = doc(db,"cartwidget", "lS4hl9eFiCzpDj3aBgAa");
        const newValue = cartCount + count;
        updateDoc(CartWidgetDocument, {count : newValue})
        setCartCount(newValue);
    }
    const decrementCartCount = (count) => {
        const CartWidgetDocument = doc(db,"cartwidget", "lS4hl9eFiCzpDj3aBgAa");
        const newValue = cartCount + count;
        updateDoc(CartWidgetDocument, {count : newValue})
        setCartCount(newValue);
    }
    const removeItem = (itemId) => {
        const cartUpdated = cart.filter(item => item.id !== itemId)
        setCart(cartUpdated);
        const CartWidgetDocument = doc(db,"cartwidget", "lS4hl9eFiCzpDj3aBgAa");
        updateDoc(CartWidgetDocument, {count : cartUpdated.quantity})
        setCartCount(cartUpdated.quantity);
    }

    const clearCart = () => {
        setCart([]);
    }

    const isInCart = (itemId) =>{
        return cart.some(item => item.id === itemId)
    }

    return (
        <CartContext.Provider value = {{ cart, cartCount, CartWidgetCount, addItem, removeItem, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}
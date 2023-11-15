import React, { useState, useEffect, useContext } from 'react';
import './Cart.css';
import CartItem from '../CartItem/CartItem';
import Button from 'react-bootstrap/Button';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../..';
import { CartContext } from '../../context/CartContext';

export default function Cart() {
  const [data, setData] = useState([]);
  const { removeItem } = useContext(CartContext);

  const fetchCartData = async () => {
    const itemsCollection = collection(db, 'cart');
    const querySnapshot = await getDocs(itemsCollection);
    const items = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setData(items);
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      const cartItemRef = doc(db, 'cart', itemId);
      await deleteDoc(cartItemRef);
      removeItem(itemId);
      setData((prevData) => prevData.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Calculate subtotal, tax, and total
  const subtotal = data.reduce((acc, item) => acc + item.subtotal, 0);
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  return (
    <>
      <div className="product-list">
        {data.map((product) => (
          <CartItem key={product.id} data={product} onRemove={handleRemoveItem} />
        ))}
      </div>
      <div className="checkoutContainer">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Tax (13%): ${tax.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </div>
      <Button className="checkoutButton" variant="success" href="/checkout">
        Checkout
      </Button>
    </>
  );
}
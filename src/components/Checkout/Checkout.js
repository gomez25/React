import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { db } from '../..';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { CartContext } from '../../context/CartContext';

function Checkout() {
  const { clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const llamadaDb = () => {
    const itemsCollection = collection(db, 'cart');
    getDocs(itemsCollection).then((res) => {
      let items = res.docs.map((item) => ({ ...item.data() }));
      setCartItems(items);
    });
  };

  useEffect(() => {
    llamadaDb();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const order = {
        buyer: formData,
        items: cartItems,
        timestamp: new Date(),
      };
  
      const ordersCollection = collection(db, 'orders');
      const docRef = await addDoc(ordersCollection, order);
      const cartCollection = collection(db, 'cart');
      const querySnapshot = await getDocs(cartCollection);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      clearCart();
      navigate(`/checkoutcreated/${docRef.id}`);
    } catch (error) {
      console.error('Error saving order ID to Firebase:', error);
    }
  };  

  return (
    <div>
      <h2>Checkout</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Checkout;
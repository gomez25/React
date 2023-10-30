import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutCreated from './CheckoutCreated'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../..'

function Checkout() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });



  const [cartItems, setCartItems] = useState([]);

  const llamadaDb = () => {
    const itemsCollection = collection(db, "cart")
    getDocs(itemsCollection).then((res) => {
      let items = res.docs.map((item => ({ ...item.data() })))
      setCartItems(items)
    })
  }

  useEffect(() => {
    llamadaDb();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    <CheckoutCreated buyer={formData} cartItems={cartItems} />
    console.log(formData);
    console.log(cartItems);
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

        <Button variant="primary" type="submit" href='/checkoutcreated'>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Checkout;

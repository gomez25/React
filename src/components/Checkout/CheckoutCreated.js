import React, { useState, useEffect } from 'react';
import 'firebase/firestore';
import 'firebase/auth';
import { db } from '../..'
import { collection, addDoc } from 'firebase/firestore';


function CheckoutCreated({ key, buyer, cartItems }) {
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        // Generate a 20-character random ID for the order
        const generateOrderId = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let id = '';
            for (let i = 0; i < 20; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                id += characters[randomIndex];
            }
            return id;
        };

        const saveOrderIdToFirebase = async (id) => {
            try {
                orderId = generateOrderId();
                const order = {
                    buyer: {
                        name: buyer.name,
                        lastname: buyer.lastname,
                        phone: buyer.phone,
                    },
                    items: [
                        cartItems
                    ],
                    orderId: orderId,
                    timestamp: new Date(),
                }
                const ordersCollection = collection(db, "orders")
                addDoc(ordersCollection, order).then(({ id }) => setOrderId(id));
            } catch (error) {
                console.error('Error saving order ID to Firebase:', error);
            }
        };

        saveOrderIdToFirebase(orderId);
    }, []);

    return (
        <div>
            <h2>Order Successfully Created</h2>
            <p>Your order ID is: {orderId}</p>
        </div>
    );
}

export default CheckoutCreated;

import React, { useState, useEffect } from 'react';
import './Cart.css'
import CartItem from '../CartItem/CartItem'
import Button from 'react-bootstrap/Button';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../..'

export default function Cart() {
    const [data, setData] = useState([]);

    const llamadaDb = () => {
      const itemsCollection = collection(db, "cart")
      getDocs(itemsCollection).then((res) => {
        let items = res.docs.map((item => ({ ...item.data() })))
        setData(items)
        console.log(items)
      })
    }
  
    useEffect(() => {
      llamadaDb();
    }, []);
    return (
      <>
      <div className="product-list">
        {data.map((product) => (
          <CartItem
            key={product.id}
            data={product}
          />
        ))}
      </div>
      <div className='checkoutContainer'>
        <p>Subtotal {data.subtotal}</p>
        <p>Tax 13%</p>
        <p>Total {data.total}</p>
      </div>
      <Button className='checkoutButton' variant="success" href='/checkout'> Checkout </Button>
      </>
        
    )
}

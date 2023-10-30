import React, { useContext } from 'react';
import { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Counter from '../Counter/Counter';
import CartAdd from '../CartAdd/CartAdd';
import Button from 'react-bootstrap/Button';
import './CardItem.css'
import { CartContext } from '../../context/CartContext';
import { db } from '../..'
import { collection, addDoc } from 'firebase/firestore';

export default function CardItem({ data }) {
  const [quantityAdded, setQuantityAdded] = useState(0)
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useContext(CartContext)
  const { cartCount } = useContext(CartContext)
 
  const handleOnAdd = (quantity) => {

    setQuantityAdded(quantity)

    if (quantity > 0) {

      const subtotal = data.price * quantity;
      const total = subtotal * 0.13 + subtotal;

      const cartItem = {
        id: data.id,
        name: data.name,
        price: data.price,
        quantity: quantity,
        subtotal: subtotal,
        total: total,
      };

      const cartCollection = collection(db, "cart")
      addDoc(cartCollection, cartItem, data.id);
      addItem(cartItem, quantity);
    }
  }

  return (
    <Card style={{ width: '18rem' }} className='CardItem'>
      <Card.Img variant="top" src={data.image} className='CardImg' />
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Subtitle>
          {data.price} USD
        </Card.Subtitle>
        {
          quantityAdded > 0 ? (
            <>
              <div>
                <Button disabled>
                  {quantityAdded}
                </Button>
              </div>
              <div>
                <Button href='/cart'>
                  Go to cart
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className='item'>
                <Counter quantity={quantity} setQuantity={setQuantity} stock={data.stock} />
              </div>
              <div className='item'>
                <CartAdd quantity={quantity} onAdd={handleOnAdd} stock={data.stock} />
              </div>
              <div className='item'>
                <Button href={`/catalog/${data.id}`}>
                  View Details
                </Button>
              </div>
            </>
          )
        }
      </Card.Body>
    </Card>
  );
}
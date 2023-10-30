import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Counter from '../Counter/Counter'
import './CartItem.css'
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../..'

export default function CartItem({id, data}) {
    const handleRemoveItem = async () => {
        try {
          console.log(data.id);
          const cartItemRef = doc(db, 'cart', data.id);
          console.log(cartItemRef);
          // Delete the cart item document
          await deleteDoc(cartItemRef);
          console.log('Item removed from cart');
    
        } catch (error) {
          console.error('Error removing item from cart:', error);
        }
      };
    return (
        <Card className='Card'>
            <Card.Body className='CardBody'>
                <Card.Img className='CardImage' variant="top" src={data.image} />
                <Counter quantity={data.quantity} stock={data.stock} />
                <p className='CardInfo'>{data.name}</p>
                <p className='CardInfo'>{data.price} USD</p>
                <Button className='RemoveButton' variant="danger" onClick={handleRemoveItem}> Revome Item </Button>
            </Card.Body>
        </Card>
    )
}

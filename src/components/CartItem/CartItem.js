import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Counter from '../Counter/Counter'
import './CartItem.css'

export default function CartItem({ data, onRemove }) {
  return (
    <Card className='Card'>
      <Card.Body className='CardBody'>
        <Card.Img className='CardImage' variant="top" src={data.image} />
        <Counter quantity={data.quantity} stock={data.stock} />
        <p className='CardInfo'>{data.name}</p>
        <p className='CardInfo'>{data.price} USD</p>
        <Button className='RemoveButton' variant="danger" onClick={() => onRemove(data.id)}> Remove Item </Button>
      </Card.Body>
    </Card>
  )
}
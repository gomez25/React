import React from 'react';
import Card from 'react-bootstrap/Card';
import ItemCount from '../ItemCount/ItemCount';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function CardItem({ productId, title, image, price, stock, initial }) {
  
  console.log(productId);
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>
          {price} USD
        </Card.Subtitle>
        <ItemCount stock={stock} initial={initial} onAdd={(quantity) => console.log('Cantidad agregada', quantity)} />
        <Button>
          <Link to={`/catalog/${productId}`} className="btn btn-primary">
            View Details
          </Link>
        </Button>
      </Card.Body>
    </Card>
  );
}
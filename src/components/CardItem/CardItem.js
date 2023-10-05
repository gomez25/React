import React from 'react';
import Card from 'react-bootstrap/Card';
import ItemCount from '../ItemCount/ItemCount';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function CardItem({ data, initial }) {
  
  console.log(data.id);
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={data.image} />
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Subtitle>
          {data.price} USD
        </Card.Subtitle>
        <ItemCount stock={data.stock} initial={initial} onAdd={(quantity) => console.log('Cantidad agregada', quantity)} />
        <Button>
          <Link to={`/catalog/${data.id}`} className="btn btn-primary">
            View Details
          </Link>
        </Button>
      </Card.Body>
    </Card>
  );
}
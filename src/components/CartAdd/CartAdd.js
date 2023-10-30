import React from 'react'
import Button from 'react-bootstrap/Button';

export default function CartAdd({ quantity, onAdd, stock }) {
  return (
    <Button variant="secondary" onClick={() => onAdd(quantity)} disabled={!stock}>
      Add to cart
    </Button>
    )
}

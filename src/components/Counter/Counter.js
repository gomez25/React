import React from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function Counter({ quantity, setQuantity, stock }) {
    const increment = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    };  

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
  return (
    <ButtonGroup aria-label="Basic example">
      <Button variant="success" onClick={decrement}> - </Button>
      <Button variant="success" disabled>   {quantity}  </Button>
      <Button variant="success" onClick={increment}> + </Button>
    </ButtonGroup>
  )
}

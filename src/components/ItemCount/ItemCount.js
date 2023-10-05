import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './ItemCount.css'
export default function ItemCount({ stock, initial, onAdd }) {
    const [quantity, setQuantity] = useState(initial);

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
        <div>
            <div className='Counter'>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="success" onClick={decrement}> - </Button>

                    <Button variant="success" onClick={increment}>   {quantity}  </Button>
                    <Button variant="success" onClick={increment}> + </Button>
                </ButtonGroup>
            </div>
            <div className='btnGroup'>
                <Button variant="secondary" onClick={() => onAdd(quantity)} disabled={!stock}>Add to cart</Button>
            </div>
        </div>

    );
}

import { useState } from 'react';
import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import CartAdd from '../CartAdd/CartAdd';
import Counter from '../Counter/Counter';
import { db } from '../..';
import { collection, addDoc, doc } from 'firebase/firestore';
import { CartContext, useCart } from '../../context/CartContext';

export default function ItemDetail({ id, name, img, category, description, price, stock }) {

    const [quantity, setQuantity] = useState(1);
    const [quantityAdded, setQuantityAdded] = useState(0);
    const { incrementCartCount } = useCart();
    const { addItem } = useContext(CartContext);

    const handleOnAdd = async (quantity) => {
        incrementCartCount(quantity);
        setQuantityAdded(quantity);

        if (quantity > 0) {
            const subtotal = price * quantity;
            const total = subtotal * 0.13 + subtotal;

            const cartItem = {
                id: doc().id,   
                name: name,
                price: price,
                quantity: quantity,
                subtotal: subtotal,
                total: total,
            };

            try {
                const cartCollection = collection(db, "cart");
                await addDoc(cartCollection, cartItem);

                addItem(cartItem, quantity);
            } catch (error) {
                console.error('Error adding item to cart:', error);
            }
        }
    }

    return (
        <article className='CardItem'>
            <header className='Header'>
                <h2 className='ItemHeader'>
                    {name}
                </h2>
            </header>
            <picture>
                <img src={img} alt={name} className='ItemImg' />
            </picture>
            <section>
                <p className='Info'>
                    Category: {category}
                </p>
                <p className='Info'>
                    Description: {description}
                </p>
                <p className='Info'>
                    Price: ${price}
                </p>
            </section>
            <footer className='itemFooter'>
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
                            <Counter quantity={quantity} setQuantity={setQuantity} stock={stock} />
                            <CartAdd quantity={quantity} onAdd={handleOnAdd} stock={stock} />
                        </>

                    )
                }
            </footer>
        </article>
    );
}

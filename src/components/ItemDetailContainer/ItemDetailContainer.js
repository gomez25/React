import React, { useState, useEffect } from 'react';
import { fetchData } from '../../util';

export default function ItemDetailContainer({ productId }) {
    const [data, setData] = useState({});
    useEffect(() => {
        fetchData(`https://651d953d44e393af2d5a0ac8.mockapi.io/api/v1/catalog/${1}`)
            .then((response) => {
                setData(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [productId]);
    
    return (
        <article className='CartItem'>
            <header className='Header'>
                <h2>{data.title}</h2>
            </header>
            <picture>
                <img src={data.image} className='ItemImg' alt={data.title}></img>
            </picture>
            <section>
                <h3 className='Title'>Title: {data.name}</h3>
                <p className='Info'>Description: {data.description}</p>
                <p className='Info'>Price: {data.price}</p>
            </section>
            <footer>
            </footer>
        </article>
    )
}

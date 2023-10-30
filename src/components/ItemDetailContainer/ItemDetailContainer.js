import React, { useState, useEffect } from 'react';
import { fetchData } from '../../util';
import { useParams } from 'react-router-dom';
import ItemDetail from '../ItemDetail/ItemDetail';

export default function ItemDetailContainer() {
    const { id } = useParams();
    const [data, setData] = useState({});
    useEffect(() => {
        fetchData(`https://651d953d44e393af2d5a0ac8.mockapi.io/api/v1/catalog/${id}`)
            .then((response) => {
                setData(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    return (
        <ItemDetail
            name={data.title} 
            img={data.image}
            category={data.category}
            description={data.description}
            price={data.price}
            stock={data.stock} />
    )
}

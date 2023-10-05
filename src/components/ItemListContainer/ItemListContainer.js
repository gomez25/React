import React, { useState, useEffect } from 'react';
import CardItem from '../CardItem/CardItem';
import { fetchData } from '../../util';
export default function ItemListContainer({ title }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData('https://651d953d44e393af2d5a0ac8.mockapi.io/api/v1/catalog')
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <h1>{title}</h1>
      <div className="product-list">
        {data.map((product) => (
          <CardItem
            key={product.id}
            data={product}
            initial={1}
          />
        ))}
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react';
import CardItem from '../CardItem/CardItem';
import './ItemListContainer.css'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../..'

export default function ItemListContainer({ title }) {
  const [data, setData] = useState([]);

  const llamadaDb = () => {
    const itemsCollection = collection(db, "catalog")
    getDocs(itemsCollection).then((res) => {
      let items = res.docs.map((item => ({ ...item.data() })))
      setData(items)
      console.log(items)
    })
  }
  
  useEffect(() => {
    llamadaDb();
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

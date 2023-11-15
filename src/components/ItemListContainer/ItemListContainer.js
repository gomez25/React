import React, { useState, useEffect } from 'react';
import CardItem from '../CardItem/CardItem';
import './ItemListContainer.css';
import { collection, getDocs, doc, query, where } from 'firebase/firestore';
import { db } from '../..';

export default function ItemListContainer({ title }) {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // Default to empty string

  useEffect(() => {
    // Fetch the list of categories from Firebase
    const categoriesCollection = collection(db, 'categories');
    getDocs(categoriesCollection).then((res) => {
      const categoryList = res.docs.map((category) => category.data().name);
      setCategories(categoryList);
    });
  }, []);

  const llamadaDb = () => {
    // Create a query to filter items based on the selected category
    const itemsCollection = collection(db, 'catalog');
    const q = selectedCategory
      ? query(itemsCollection, where('category', '==', selectedCategory))
      : itemsCollection;

    // Fetch items based on the query
    getDocs(q).then((res) => {
      const items = res.docs.map((item) => ({ ...item.data() }));
      setData(items);
    });
  };

  useEffect(() => {
    llamadaDb();
  }, [selectedCategory]); // Call llamadaDb whenever selectedCategory changes

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
  };

  return (
    <div>
      <h1>{title}</h1>
      <div>
        {/* Dropdown for selecting categories */}
        <label htmlFor="categoryDropdown">Select Category:</label>
        <select
          id="categoryDropdown"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="product-list">
        {data.map((product) => (
          <CardItem key={doc.id} data={product} initial={1} />
        ))}
      </div>
    </div>
  );
}
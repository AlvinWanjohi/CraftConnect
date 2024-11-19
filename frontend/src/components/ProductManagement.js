// src/components/ProductManagement.js
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase-config'; // Firebase Firestore
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { auth } from '../config/firebase-config';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const userId = auth.currentUser.uid;
      const querySnapshot = await getDocs(collection(db, 'products'));
      const fetchedProducts = querySnapshot.docs
        .filter(doc => doc.data().sellerId === userId)
        .map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), {
        name,
        description,
        price,
        imageUrl,
        sellerId: auth.currentUser.uid,
      });
      alert('Product added!');
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="product-management">
      <h2>Your Products</h2>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product Description"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
        />
        <button type="submit">Add Product</button>
      </form>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button>Edit Product</button>
            <button>Delete Product</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;

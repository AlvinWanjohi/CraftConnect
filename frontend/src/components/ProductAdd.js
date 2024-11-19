import React, { useState } from 'react';
import { db } from '../config/firebase-config'; // Your Firebase config
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './ProductAdd.css'; // Optional: For custom styling

const ProductAdd = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const history = useNavigate(); // For navigation after successful product addition

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add the product to Firestore
      await addDoc(collection(db, 'products'), {
        name,
        description,
        price: parseFloat(price),
        category,
        imageUrl: imageUrl || '/placeholder.png', // Use placeholder if no image is provided
      });

      // Redirect to the product listing page after adding the product
      history.push('/products'); // or wherever you want to navigate
    } catch (err) {
      setError('Error adding product. Please try again.');
      console.error('Error adding product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-add-container">
      <h1>Add a New Product</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="product-add-form">
        <label>
          Product Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            <option value="jewelry">Jewelry</option>
            <option value="home-decor">Home Decor</option>
            <option value="clothing">Clothing</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Product Image URL:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Optional - Add image URL"
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;

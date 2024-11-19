import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateProduct.css';

const UpdateProduct = () => {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Use useParams to get the product ID from the URL

  // Fetch product details when component mounts or product ID changes
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const docRef = doc(db, 'products', id); // Get the document reference using product ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = docSnap.data();
          setProduct(productData);
          setName(productData.name);
          setDescription(productData.description);
          setPrice(productData.price);
          setImageUrl(productData.imageUrl);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('There was an error fetching the product details. Please try again later.');
      }
    };

    fetchProductDetails();
  }, [id]); // Trigger when product ID changes

  // Handle form submission and update product
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !imageUrl) {
      setError('All fields are required!');
      return;
    }

    try {
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, {
        name,
        description,
        price: parseFloat(price), // Ensure price is saved as a number
        imageUrl,
      });

      navigate(`/products/${id}`); // Redirect to product details page after update
    } catch (err) {
      console.error('Error updating product:', err);
      setError('There was an error updating the product. Please try again later.');
    }
  };

  // Display error message if any
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="update-product-container">
      <h1>Update Product</h1>
      {product ? (
        <form onSubmit={handleUpdate}>
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
            placeholder="Product Price"
            required
          />
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
            required
          />
          <button type="submit">Update Product</button>
        </form>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default UpdateProduct;

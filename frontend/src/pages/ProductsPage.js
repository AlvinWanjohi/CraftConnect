import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { app } from '../config/firebase-config'; 

import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const db = getFirestore(app);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    };
    
    fetchProducts();
  }, []);

  // Delete product from Firestore
  const handleDeleteProduct = async (productId) => {
    try {
      const productDoc = doc(db, "products", productId);
      await deleteDoc(productDoc);
      
      // Remove the product from the local state
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <div className="products-page-container">
      <h2>Manage Your Products</h2>
      <p>Here you can view, edit, and delete your products.</p>
      
      <Link to="/add-product" className="btn btn-primary">Add New Product</Link>
      
      <div className="products-list">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>${product.price}</strong></p>
            
            <div className="product-actions">
              <Link to={`/product/${product.id}`} className="btn btn-info">View Details</Link>
              <Link to={`/update-product/${product.id}`} className="btn btn-warning">Edit</Link>
              <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              <Link to={`/shop-now/${product.id}`} className="btn btn-success">Shop Now</Link> {/* Shop Now button */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

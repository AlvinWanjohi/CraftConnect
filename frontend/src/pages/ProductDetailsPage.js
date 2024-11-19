import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase-config';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom'; // Updated to use `useParams`
import './ProductDetails.css';

const ProductDetails = () => {
  const { id: productId } = useParams(); // Use `useParams` to get product ID
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Quantity state
  const [rating, setRating] = useState(0); // Product rating state

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch product details by ID
        const docRef = doc(db, 'products', productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const productData = docSnap.data();
          setProduct({ id: docSnap.id, ...productData });

          // Set product rating
          setRating(productData.rating || 0);

          // Fetch related products by category
          const relatedQuery = query(
            collection(db, 'products'),
            where('category', '==', productData.category)
          );
          const relatedSnap = await getDocs(relatedQuery);
          const relatedProductsData = relatedSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRelatedProducts(relatedProductsData);
        } else {
          setError('Product not found');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('There was an error fetching the product details. Please try again later.');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]); // Dependency on productId to re-fetch when ID changes

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      imageUrl: product.imageUrl,
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === cartItem.id);

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    console.log(`Added ${quantity} of ${product.name} to cart.`);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, Number(e.target.value))); // Ensure quantity is >= 1
  };

  if (loading) {
    return <div className="loading-spinner">Loading product details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details-header">
        <h1>{product.name}</h1>
        <div className="product-rating">
          <span>Rating: </span>
          <strong>{rating}</strong>
        </div>
      </div>
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <p>{product.description}</p>
      <div className="product-price">${product.price}</div>

      {/* Quantity Selector */}
      <div className="quantity-selector">
        <label htmlFor="quantity">Quantity: </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          min="1"
          onChange={handleQuantityChange}
        />
      </div>

      {/* Add to Cart Button */}
      <button onClick={handleAddToCart} className="add-to-cart-button">
        Add to Cart
      </button>

      {/* Related Products Section */}
      <div className="related-products">
        <h3>Related Products</h3>
        <div className="related-products-list">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="related-product-item">
                <img
                  src={relatedProduct.imageUrl}
                  alt={relatedProduct.name}
                  className="related-product-image"
                />
                <h4>{relatedProduct.name}</h4>
                <div className="related-product-price">${relatedProduct.price}</div>
                <button className="view-details-button">
                  <a href={`/product/${relatedProduct.id}`}>View Details</a>
                </button>
              </div>
            ))
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>

      {/* Product Reviews Section */}
      <div className="product-reviews">
        <h3>Customer Reviews</h3>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="review-item">
              <strong>{review.user}</strong>
              <p>{review.comment}</p>
              <div className="review-rating">Rating: {review.rating}</div>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

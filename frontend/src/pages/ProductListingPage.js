import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase-config';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './ProductListing.css';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastVisible, setLastVisible] = useState(null); // Tracks the last document for pagination
  const [hasMore, setHasMore] = useState(true); // Indicates if there are more products to fetch

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const PRODUCTS_PER_PAGE = 6; // Number of products per page

  // Fetch products with pagination and filters
  const fetchProducts = async (isNextPage = false) => {
    setLoading(true);

    try {
      let productsQuery = collection(db, 'products');

      // Apply filters and ordering
      const conditions = [];
      if (searchQuery) conditions.push(where('name', '>=', searchQuery), where('name', '<=', searchQuery + '\uf8ff'));
      if (selectedCategory) conditions.push(where('category', '==', selectedCategory));
      if (minPrice) conditions.push(where('price', '>=', parseFloat(minPrice)));
      if (maxPrice) conditions.push(where('price', '<=', parseFloat(maxPrice)));

      productsQuery = query(productsQuery, ...conditions, orderBy('name'), limit(PRODUCTS_PER_PAGE));

      // Handle pagination
      if (isNextPage && lastVisible) {
        productsQuery = query(productsQuery, startAfter(lastVisible));
      }

      const querySnapshot = await getDocs(productsQuery);

      // Update state
      const fetchedProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts((prevProducts) => (isNextPage ? [...prevProducts, ...fetchedProducts] : fetchedProducts));
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]); // Set the last document
      setHasMore(fetchedProducts.length === PRODUCTS_PER_PAGE); // Check if more products exist
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Unable to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products initially
  }, [searchQuery, selectedCategory, minPrice, maxPrice]);

  // Handle Load More for pagination
  const handleLoadMore = () => {
    if (hasMore) fetchProducts(true); // Fetch next page
  };

  // Render loading state
  if (loading && products.length === 0) {
    return <div className="loading-spinner">Loading products...</div>;
  }

  // Render error state
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-listing-container">
      <h1>Products List</h1>

      {/* Search and Filter */}
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="jewelry">Jewelry</option>
          <option value="home-decor">Home Decor</option>
          <option value="clothing">Clothing</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button onClick={() => fetchProducts()}>Search</button>
      </div>

      {/* Product List */}
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img
                  src={product.imageUrl || '/placeholder.png'} // Placeholder for products without an image
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description || 'No description available.'}</p>
                <div className="product-price">
                  {product.price ? `$${product.price}` : 'Price not available'}
                </div>
                <div className="product-actions">
                  <Link to={`/products/${product.id}`} className="view-details-link">
                    View Details
                  </Link>
                  <Link to={`/update-product/${product.id}`} className="update-product-link">
                    Update
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available based on your search criteria.</p>
        )}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default ProductListing;

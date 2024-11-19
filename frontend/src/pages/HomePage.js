import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./HomePage.css";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [featuredArtisans, setFeaturedArtisans] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(5); // Default rating
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtisansAndProducts = async () => {
      try {
        setLoading(true);
        const [artisansResponse, productsResponse] = await Promise.all([
          fetch("/api/artisans"),
          fetch("/api/products"),
        ]);
        setFeaturedArtisans(await artisansResponse.json());
        setPopularProducts(await productsResponse.json());
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtisansAndProducts();
  }, []);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, name: "User", rating: "⭐⭐⭐⭐⭐" }]);
      setNewComment(""); // Reset comment field
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(/assets/Home.png)` }}
      >
        <motion.div
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1>Welcome to CraftConnect ✨</h1>
          <p>Unleash the beauty of handmade creativity. Explore, connect, and support local artisans. 🛍️</p>
          <Link to="/product-listing" className="cta-button">
            Discover Now 🚀
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <motion.div
          className="about-content"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2>Why Choose CraftConnect?</h2>
          <p>
            At CraftConnect, we connect you with talented artisans from around the globe, offering unique handmade items
            that bring stories to life. From intricate pottery to delicate jewelry, every purchase supports small businesses
            and celebrates creativity. 💡
          </p>
          <Link to="/about-us" className="learn-more">
            Learn More ➡️
          </Link>
        </motion.div>
      </section>

      {/* Featured Artisans */}
      <section className="featured-artisans">
        <h2>Meet Our Artisans 👩‍🎨</h2>
        <div className="artisan-grid">
          {featuredArtisans.slice(0, 4).map((artisan) => (
            <motion.div
              key={artisan.id}
              className="artisan-card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={artisan.imageUrl || "/assets/default-avatar.png"}
                alt={artisan.name}
                className="artisan-image"
              />
              <h3>{artisan.name}</h3>
              <p>{artisan.bio}</p>
              <Link to={`/profile/${artisan.id}`} className="profile-link">
                Artisan's Products ➡️
              </Link>
            </motion.div>
          ))}
        </div>
        <Link to="/artisans" className="cta-button">
          Meet More Artisans ➡️
        </Link>
      </section>

      {/* Popular Products Section */}
      <section className="popular-products">
        <h2>You can Start Here! Add Your Products 🛒</h2>
        
        {/* Add Your Product Button */}
        <div className="add-product-section">
          <div
            className="add-project-card"
            onClick={() => navigate("/add-craft/12345")} // Use a placeholder id (replace with real id later)
            style={{ cursor: "pointer", backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "8px" }}
          >
            <p>Add Your Product</p>
            <div className="add-button" style={{ fontSize: "30px", fontWeight: "bold" }}>+</div>
          </div>
        </div>

        <div className="product-grid">
          {popularProducts.slice(0, 4).map((product) => (
            <motion.div
              key={product.id}
              className="product-card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={product.imageUrl || "/assets/default-product.png"}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <Link to={`/product/${product.id}`} className="view-product-link">
                Product Details ➡️
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comment and Rating Section */}
      <section className="testimonials">
        <h2>What Our Customers Say 💬</h2>
        <div className="comments-section">
          <div className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div>

          <div className="rating">
            <label>Rate us: </label>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>
          </div>

          {comments.map((comment, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <p>"{comment.text}"</p>
              <h4>- {comment.name}</h4>
              <p>{comment.rating}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <p>© 2024 CraftConnect. All rights reserved. 🚀</p>
          <div className="social-links">
            <Link to="#" className="social-icon">Facebook</Link>
            <Link to="#" className="social-icon">Instagram</Link>
            <Link to="#" className="social-icon">Twitter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

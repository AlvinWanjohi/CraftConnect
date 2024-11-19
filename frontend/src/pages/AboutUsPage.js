import React from "react";
import { Link } from "react-router-dom";
import "./AboutUsPage.css";

function AboutUsPage() {
  return (
    <main>
      <div className="hero-wrapper">
        <div className="hero-image">
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet="https://s.alamy.com/kdawwlsweh27/3jCE0K6P9snbtFFJXzYUfC/06b731be7a882d71c63bc357daabf5a4/About_us_hero_image_2C3GXDW_2.jpg?fm=webp&q=25"
              type="image/webp"
            />
            <img
              src="https://s.alamy.com/kdawwlsweh27/3jCE0K6P9snbtFFJXzYUfC/06b731be7a882d71c63bc357daabf5a4/About_us_hero_image_2C3GXDW_2.jpg?fm=jpg&q=100"
              alt="About Us Hero"
            />
          </picture>
        </div>
        <div className="hero-content">
          <h1>ABOUT US</h1>
          <h2>CraftConnect's Culture and Vision</h2>
          <p>
            At CraftConnect, we are passionate about connecting artisans with the world. We believe in
            craftsmanship, creativity, and community, and we strive to bring these values to life through
            every product shared on our platform. 
          </p>
        </div>
      </div>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is simple: to empower local artisans by providing a platform that celebrates their
          unique creations. Whether it's a beautifully handcrafted piece of pottery or a one-of-a-kind
          painting, we connect creators with customers who value the beauty and authenticity of handmade
          goods. We are committed to creating a sustainable marketplace that fosters creativity, supports
          small businesses, and strengthens communities.
        </p>
      </section>

      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <img
              src="https://via.placeholder.com/100"
              alt="Sustainability"
              className="value-icon"
            />
            <h3>Sustainability</h3>
            <p>We promote eco-friendly practices and sustainable production methods to protect our planet.</p>
          </div>
          <div className="value-item">
            <img
              src="https://via.placeholder.com/100"
              alt="Creativity"
              className="value-icon"
            />
            <h3>Creativity</h3>
            <p>We celebrate the creativity of artisans who pour their heart into their craft, producing unique pieces that tell stories.</p>
          </div>
          <div className="value-item">
            <img
              src="https://via.placeholder.com/100"
              alt="Community"
              className="value-icon"
            />
            <h3>Community</h3>
            <p>We believe in supporting local communities, providing artisans with opportunities to grow and thrive.</p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img
              src="https://example.com/jane-doe.jpg" // Replace with real image link
              alt="Jane Doe"
              className="team-photo"
            />
            <h3>Jane Doe</h3>
            <p>Founder & CEO</p>
            <p>
              Jane is a passionate advocate for sustainable craftsmanship and founded CraftConnect to help
              artisans reach a wider audience.
            </p>
          </div>
          <div className="team-member">
            <img
              src="https://example.com/john-smith.jpg" // Replace with real image link
              alt="John Smith"
              className="team-photo"
            />
            <h3>John Smith</h3>
            <p>Chief Operations Officer</p>
            <p>
              John oversees the operations, ensuring smooth and efficient processes for both artisans and
              customers.
            </p>
          </div>
          <div className="team-member">
            <img
              src="https://example.com/alice-brown.jpg" // Replace with real image link
              alt="Alice Brown"
              className="team-photo"
            />
            <h3>Alice Brown</h3>
            <p>Head of Marketing</p>
            <p>
              Alice helps spread the word about CraftConnect, connecting with customers and artisans
              through innovative marketing strategies.
            </p>
          </div>
        </div>
      </section>

      <section className="get-involved">
        <h2>Join Us Today</h2>
        <p>
          Are you an artisan looking to showcase your unique creations? Or perhaps a customer looking for
          one-of-a-kind handmade products? Join the CraftConnect community today and be part of a growing
          movement that celebrates creativity, sustainability, and craftsmanship.
        </p>
        <Link to="/signup" className="cta-button">
          Get Started
        </Link>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a href="/about-us">About</a>
          <a href="/terms">Terms & Conditions</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <div className="social-media">
          <a href="#instagram">Instagram</a>
          <a href="#facebook">Facebook</a>
          <a href="#twitter">Twitter</a>
        </div>
        <p>&copy; 2024 CraftConnect. All Rights Reserved.</p>
      </footer>
    </main>
  );
}

export default AboutUsPage;

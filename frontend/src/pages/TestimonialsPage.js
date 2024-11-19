import React from 'react';
import './TestimonialsPage.css';

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    feedback: "CraftConnect helped me find amazing handmade products. Great experience from start to finish!"
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4,
    feedback: "I found unique pieces that fit perfectly in my home. Very happy with the quality of products."
  },
  {
    id: 3,
    name: "Michael Brown",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 5,
    feedback: "Absolutely love the customer service and quality of products. I highly recommend CraftConnect!"
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    rating: 4,
    feedback: "Easy to navigate and great local artisans. A fantastic marketplace for unique items."
  },
  {
    id: 5,
    name: "Chris Johnson",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    rating: 5,
    feedback: "The best place to shop for handmade, high-quality crafts. I will definitely be back!"
  },
];

const TestimonialsPage = () => {
  return (
    <div className="testimonials-page">
      <h2 className="testimonials-title">What Our Customers Are Saying</h2>
      <div className="testimonials-container">
        {testimonials.map((testimonial) => (
          <div className="testimonial-card" key={testimonial.id}>
            <div className="testimonial-avatar">
              <img src={testimonial.avatar} alt={testimonial.name} className="avatar-img" />
            </div>
            <div className="testimonial-content">
              <h3 className="testimonial-name">{testimonial.name}</h3>
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <span key={index} className="star">⭐</span>
                ))}
              </div>
              <p className="testimonial-feedback">{testimonial.feedback}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsPage;

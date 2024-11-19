// src/components/CraftForm.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const CraftForm = ({ onAddCraft }) => {
  const [craft, setCraft] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCraft({
      ...craft,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setCraft({
      ...craft,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCraft(craft); // Pass the new craft to the parent component
    setCraft({ name: '', description: '', price: '', image: null }); // Reset form
  };

  return (
    <div className="container" style={{ marginTop: '20px' }}>
      <h2>Add Your Craft</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Craft Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={craft.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={craft.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            value={craft.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Craft</button>
      </form>
    </div>
  );
};

export default CraftForm;

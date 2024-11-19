import React, { useState } from 'react';
import { db, storage } from '../config/firebase-config';  // Firebase imports
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage imports
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'; // To generate unique file names for images
import styles from './AddCraftPage.module.css'; // Import CSS Module

const AddCraftPage = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageRef = ref(storage, `products/${uuidv4()}`);
      setLoading(true);
      try {
        await uploadBytes(imageRef, file);
        const imageUrl = await getDownloadURL(imageRef);
        setProductImage(imageUrl);
      } catch (error) {
        setError("Error uploading image. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!productName || !productDescription || !productPrice || !productImage) {
      setError("Please fill in all fields and upload an image.");
      setSuccess("");
      return;
    }
    
    const productData = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      imageUrl: productImage,
    };

    setLoading(true);
    setError("");
    try {
      const productRef = await addDoc(collection(db, "products"), productData);
      setSuccess("Product added successfully!");
      console.log("Product added with ID:", productRef.id);
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setProductImage(null);
    } catch (error) {
      setError("Error adding product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.addCraftPage}> {/* Use module class */}
      <h2>Add Your Products Here! 🚀</h2>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className={styles.inputField} // Module class for input field
          />
        </div>
        
        <div className={styles.formGroup}>
          <textarea
            placeholder="Product Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
            className={styles.textareaField} // Module class for textarea
          />
        </div>
        
        <div className={styles.formGroup}>
          <input
            type="number"
            placeholder="Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            className={styles.inputField} // Module class for input field
          />
        </div>
        
        <div className={styles.formGroup}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
            className={styles.fileInput} // Module class for file input
          />
          {loading && <p>Uploading image...</p>}
        </div>
        
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddCraftPage;

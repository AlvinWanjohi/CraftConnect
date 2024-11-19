// src/services/sellerService.js

import { db } from '../config/firebase-config'; // Firebase config file
import { collection, getDocs, query, where } from 'firebase/firestore';

// Fetch products for a seller, optionally filter by category
export const getProducts = async (sellerId, category = 'all') => {
  // Reference to the 'products' collection in Firestore
  const productsRef = collection(db, 'products');
  
  // If a category is provided, filter by sellerId and category, otherwise just by sellerId
  const q = category !== "all" 
    ? query(productsRef, where('sellerId', '==', sellerId), where('category', '==', category)) 
    : query(productsRef, where('sellerId', '==', sellerId));

  const querySnapshot = await getDocs(q);
  
  // Map through documents and return product data
  const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return products;
};

// Fetch orders for a seller, optionally filter by status
export const getOrders = async (sellerId, status = 'all') => {
  // Reference to the 'orders' collection in Firestore
  const ordersRef = collection(db, 'orders');

  // If a status is provided, filter by sellerId and status, otherwise just by sellerId
  const q = status !== "all" 
    ? query(ordersRef, where('sellerId', '==', sellerId), where('status', '==', status)) 
    : query(ordersRef, where('sellerId', '==', sellerId));

  const querySnapshot = await getDocs(q);
  
  // Map through documents and return order data
  const orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return orders;
};

// Fetch total earnings for a seller (this could be calculated based on orders)
export const getEarnings = async (sellerId) => {
  // Fetch all orders for the seller
  const orders = await getOrders(sellerId);
  
  // Calculate total earnings by summing the 'totalPrice' of each order
  return orders.reduce((total, order) => total + order.totalPrice, 0);
};

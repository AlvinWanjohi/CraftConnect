import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase-config';
import { getProducts, getOrders, getEarnings } from '../services/sellerService';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [orderStatus, setOrderStatus] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [productsData, ordersData, earningsData] = await Promise.all([
          getProducts(auth.currentUser.uid, selectedCategory),
          getOrders(auth.currentUser.uid, orderStatus),
          getEarnings(auth.currentUser.uid),
        ]);
        setProducts(productsData);
        setOrders(ordersData);
        setEarnings(earningsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Unable to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, orderStatus]);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      console.log(`Updating order ${orderId} to status ${newStatus}`);
      // Add logic to update the order status in the backend.
    } catch (err) {
      console.error(`Error updating order status for ${orderId}:`, err);
    }
  };

  const chartData = {
    labels: ['Earnings Received', 'Pending Earnings'],
    datasets: [
      {
        data: [earnings, 1000 - earnings],
        backgroundColor: ['green', 'yellow'],
        hoverOffset: 4,
      },
    ],
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Seller Dashboard</h1>

      <section>
        <h2>Overview</h2>
        <p>Total Products: {products.length}</p>
        <p>Total Orders: {orders.length}</p>
        <p>Total Earnings: ${earnings}</p>
      </section>

      <section>
        <h2>Analytics</h2>
        <Pie data={chartData} />
      </section>

      <section>
        <h2>Manage Products</h2>
        <label htmlFor="category-filter">Filter by Category:</label>
        <select
          id="category-filter"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="all">All Categories</option>
          <option value="jewelry">Jewelry</option>
          <option value="furniture">Furniture</option>
          <option value="art">Art</option>
        </select>
        <Link to="/add-product">
          <button>Add New Product</button>
        </Link>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link to={`/update-product/${product.id}`}>{product.name}</Link>
              <p>Average Rating: {product.averageRating}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Orders</h2>
        <label htmlFor="order-status-filter">Filter by Status:</label>
        <select
          id="order-status-filter"
          onChange={(e) => setOrderStatus(e.target.value)}
          value={orderStatus}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>Order #{order.id}</p>
              <p>Status: {order.status}</p>
              <select
                value={order.status}
                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
              <Link to={`/order-details/${order.id}`}>View Order</Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Settings</h2>
        <Link to="/settings">
          <button>Account Settings</button>
        </Link>
      </section>
    </div>
  );
};

export default SellerDashboard;

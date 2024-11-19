import React, { useState } from "react";
import "./PaymentPage.css";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";

// Replace with your Stripe publishable key
const stripePromise = loadStripe("pk_test_51QM8bWHfjPM9NuMIuuBEJc3WxiDTls0q3I3lSlZewpz66XECYPWsNk7pfua8hgL1ypslkJWaM9sXVNBHF5mWFqAs00Pr0YXaws");

const PaymentPage = () => {
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate(); // Updated useNavigate (renamed `history` to `navigate`)
  const stripe = useStripe();
  const elements = useElements();

  // Order details (replace with dynamic cart/order data if needed)
  const orderSummary = {
    items: [
      { name: "Handmade Pottery", price: 25.0 },
      { name: "Wooden Table", price: 120.0 },
    ],
    total: 145.0,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handlePayment = async () => {
    if (!stripe || !elements) {
      setPaymentStatus("Stripe is not loaded. Please wait.");
      return;
    }

    setPaymentStatus("Processing...");

    try {
      // Make a call to your backend to create a PaymentIntent
      const response = await fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: orderSummary.total * 100 }), // Amount in cents
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent.");
      }

      const { clientSecret } = await response.json();

      // Confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: billingInfo.name,
            email: billingInfo.email,
          },
        },
      });

      if (error) {
        setPaymentStatus(`Payment failed: ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setPaymentStatus("Payment successful!");
        navigate("/order-confirmation"); // Redirect to order confirmation page
      }
    } catch (error) {
      setPaymentStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="payment-page">
      <h1>Payment Processing</h1>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul>
          {orderSummary.items.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Total: ${orderSummary.total.toFixed(2)}</p>
      </div>

      <div className="billing-info">
        <h2>Billing Information</h2>
        <form>
          <label>
            Full Name:
            <input
              type="text"
              name="name"
              value={billingInfo.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={billingInfo.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={billingInfo.address}
              onChange={handleInputChange}
              required
            />
          </label>
        </form>
      </div>

      <div className="payment-form">
        <h2>Payment Method</h2>
        <CardElement />
      </div>

      <div className="payment-button">
        <button
          onClick={handlePayment}
          disabled={paymentStatus === "Processing..."}
        >
          {paymentStatus === "Processing..." ? "Processing Payment..." : "Pay Now"}
        </button>
        {paymentStatus && <p>{paymentStatus}</p>}
      </div>
    </div>
  );
};

const StripePaymentPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentPage />
  </Elements>
);

export default StripePaymentPage;

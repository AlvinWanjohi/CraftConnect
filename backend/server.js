// Import dependencies
const express = require("express");
const cors = require("cors"); // To handle CORS
const Stripe = require("stripe");
require("dotenv").config(); // Load environment variables from .env file

// Initialize express
const app = express();

// Initialize Stripe with the secret key from environment variables
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ALLOWED_ORIGIN || "*", // Allow the frontend domain from .env or fallback to wildcard
  })
);

// POST route to create a PaymentIntent
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  // Validate the amount
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Amount is required and must be greater than 0." });
  }

  try {
    // Create a PaymentIntent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    // Send back the client secret to the frontend
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe error:", error); // Log the error for debugging
    res.status(error.statusCode || 500).json({ error: error.message || "Something went wrong." });
  }
});

// Start the server on the specified port
const PORT = process.env.PORT || 5000; // Use PORT from .env or fallback to 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

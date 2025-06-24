import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: 'rzp_live_nGwqfddRD6IglI',
  key_secret:'jC3TKhF9ThEy7paYzsbgfTFl',
});

// Create Order
router.post("/create-order", async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const options = {
      amount: amount * 100,
      currency,
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Optional: Verify Payment Signature
router.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = crypto
    .createHmac("sha256", 'jC3TKhF9ThEy7paYzsbgfTFl')
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (sign === razorpay_signature) {
    res.status(200).json({ success: true, message: "Payment Verified" });
  } else {
    res.status(400).json({ success: false, message: "Payment Verification Failed" });
  }
});

export default router;

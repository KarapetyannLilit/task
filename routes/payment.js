const express = require("express")
const router = express.Router()
require("dotenv").config()

const Stripe = require("stripe")
const { getShopData } = require("../utils/dbFunctions")
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

const getLineItems = (req, paymentdata) => {
  return req.body.items.map((item) => {
    const storeItem = paymentdata.find((el) => (el.id = item.id))
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: storeItem.name,
        },
        unit_amount: storeItem.price * 100,
      },
      quantity: item.quantity,
    }
  })
}

router.post("/create-checkout-session", async (req, res) => {
  try {
    const paymentData = await getShopData()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: getLineItems(req, paymentData),
      success_url: `${process.env.SERVER_URL}/shop`,
      cancel_url: `${process.env.SERVER_URL}/shop`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

module.exports = router

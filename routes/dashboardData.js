const express = require("express")
const router = express.Router()
const { getUserData, getShopData } = require("../utils/dbFunctions")

router.get("/dashboard", async (req, res) => {
  const userData = await getUserData()
  const productData = await getShopData()
  res.json({ user: userData, product: productData })
})

module.exports = router

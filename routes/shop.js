const express = require("express")
const { getShopData } = require("../utils/dbFunctions")
const router = express.Router()

router.get("/list", async (req, res) => {
  const data = await getShopData()
  res.json({ data: data })
})
module.exports = router

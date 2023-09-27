const express = require("express")
const router = express.Router()
require("dotenv").config()

router.get("/", (req, res) => {
  res.redirect(`${process.env.SERVER_URL}/login`)
})

module.exports = router

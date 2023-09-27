const express = require("express")
const router = express.Router()
const { getAuthUser } = require("../utils/dbFunctions")

router.post("/auth", async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  let url = ""
  const data = await getAuthUser(email, password)
  if (data) {
    if (data.role === "a") {
      url = "/admin"
    } else {
      url = "/shop"
    }
  }
  res.json({ url: url })
})

module.exports = router

const express = require("express")

const app = express()
const port = 8080
const startRoute = require("./routes/start")
const dataRoute = require("./routes/dashboardData")
const paymentRoute = require("./routes/payment")
const shopRoute = require("./routes/shop")
const loginRoute = require("./routes/login")
app.use(express.static("public"))
app.use(express.json())

app.use("/", startRoute)
app.use("/admin", dataRoute)
app.use("/payment", paymentRoute)
app.use("/shop", shopRoute)
app.use("/login", loginRoute)

app.listen(port, () => {
  console.log("running, listening on port")
})

app.use

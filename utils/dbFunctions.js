const db = require("./db")

const getUserData = () => {
  const data = db.query("SELECT * from user", []).then((data) => {
    if (data) {
      return data
    }
    return null
  })

  return data
}

const getShopData = () => {
  const data = db.query("SELECT * from product", []).then((data) => {
    if (data) {
      return data
    }
    return null
  })

  return data
}

const getAuthUser = (email, password) => {
  const data = db
    .query("SELECT * FROM user WHERE email = ? AND password = ?", [
      email,
      password,
    ])
    .then((data) => {
      if (data) {
        return data[0]
      }
      return null
    })

  return data
}
module.exports = { getUserData, getShopData, getAuthUser }

const button = document.querySelector("button")
const PAGE_URL = "http://localhost:8080"
const login = async (form) => {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const data = { email: email, password: password }

  await fetch(`${PAGE_URL}/login/auth`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(({ url }) => {
      location.href = url
    })
    .catch((e) => {
      console.error(e.error)
    })
}

const PAGE_URL = "http://localhost:8080"

const getProductDashboard = (json) => {
  const body = document.getElementById("productList")
  json.forEach((el) => {
    body.innerHTML += `
    <style>
    .addtocart{
    padding:0.5em 1em 0.5em 1em;
    border-radius:5px;
    border:none;
    background:#0652DD;
    color:white;
    overflow:hidden;}

    .buy{
        padding:0.5em 1em 0.5em 1em;
        border-radius:5px;
        border:none;
    background:#317546;
    color:white;
    overflow:hidden;}
    </style>
    <div style="align-items:center; text-align: center; max-width=500px; padding:10px;" class="card">
    <img style="max-width:200px;" src="${el.image}"/>
    <h1 id="product_name-${el.id}" value="${
      el.name
    }" style="text-color:grey;font-sixe:15px;">${el.name}</h1>
    <div id="product_price-${el.id}"value="${el.price}" class="price"/>${
      el.price
    }$</div>
    <div width="100%">
    <button onclick="addToCart(this,${
      el.id
    },${1})" class="addtocart" type="button" class="btn btn-default btn-sm">
    <i class="fas fa-shopping-cart"></i> Add to Cart 
</button>
    <button onclick="payment([{id:${
      el.id
    },quantity:${1}}])" class="buy" type="button" class="btn btn-default btn-sm" > <i class="fa-solid fa-money-check-dollar"></i> Buy </button>
    </div>
  </div>`
  })
}

const payment = (items) => {
  fetch(`${PAGE_URL}/payment/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: items,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return res.json().then((json) => Promise.reject(json))
    })
    .then(({ url }) => {
      console.log(url)
      window.location = url
    })
    .catch((e) => {
      console.error(e.error)
    })
  //   })
}

let cart = []
let cartTotal = 0

const addToCart = (elem, id, quantity) => {
  const basket = document.getElementsByClassName("basket")[0]
  basket.removeAttribute("hidden")
  const cartDom = document.getElementById("cart")
  const addtocartbtnDom = elem
  const productDom = addtocartbtnDom.parentNode.parentNode

  const product = {
    img: productDom.querySelector("img").getAttribute("src"),
    name: document.getElementById(`product_name-${id}`).innerText,
    price: document.getElementById(`product_price-${id}`).innerText,
    quantity: 1,
    id: id,
  }
  const IsinCart =
    cart.filter((cartItem) => cartItem.name === product.name).length > 0
  if (IsinCart === false) {
    cartDom.insertAdjacentHTML(
      "beforeend",
      `
  <div class="d-flex flex-row shadow-sm card cart-items mt-2 mb-3 animated flipInX">
    <div class="p-2">
        <img src="${product.img}" alt="${product.name}" style="max-width: 50px;"/>
    </div>
    <div class="p-2 mt-3">
        <p class="text-info cart_item_name">${product.name}</p>
    </div>
    <div class="p-2 mt-3">
        <p class="text-success cart_item_price">${product.price}</p>
    </div>
    <div class="p-2 mt-3 ml-auto">
        <button style="background-color:grey;" class="btn badge badge-secondary" type="button" data-action="increase-item">&plus;
    </div>
    <div class="p-2 mt-3">
      <p class="text-success cart_item_quantity">${product.quantity}</p>
    </div>
    <div class="p-2 mt-3">
      <button class="btn badge badge-info" style="background-color:grey;"  type="button" data-action="decrease-item">&minus;
    </div>
    <div class="p-2 mt-3">
      <button class="btn badge badge-danger" style="background-color:red;" type="button" data-action="remove-item">&times;
    </div>
  </div> `
    )

    if (document.querySelector(".cart-footer") === null) {
      cartDom.insertAdjacentHTML(
        "afterend",
        `
      <div class="d-flex flex-row shadow-sm card cart-footer mt-2 mb-3 animated flipInX">
        <div class="p-2">
          <button style="background-color: red;color:white;" class="btn badge-danger" type="button" data-action="clear-cart">Clear Cart
        </div>
        <div class="p-2 ml-auto">
          <button style="background-color: green;color:white;" onclick="payment([{id:${id},quantity:${quantity}}])" class="btn badge-dark"  type="button" data-action="check-out">Pay <span class="pay"></span> 
            &#10137;
        </div>
      </div>`
      )
    }

    addtocartbtnDom.innerText = "In cart"
    addtocartbtnDom.disabled = true
    cart.push(product)

    const cartItemsDom = cartDom.querySelectorAll(".cart-items")
    cartItemsDom.forEach((cartItemDom) => {
      if (
        cartItemDom.querySelector(".cart_item_name").innerText === product.name
      ) {
        cartTotal +=
          parseInt(cartItemDom.querySelector(".cart_item_quantity").innerText) *
          parseInt(cartItemDom.querySelector(".cart_item_price").innerText)
        document.querySelector(".pay").innerText = cartTotal + " Rs."

        cartItemDom
          .querySelector('[data-action="increase-item"]')
          .addEventListener("click", () => {
            cart.forEach((cartItem) => {
              if (cartItem.name === product.name) {
                cartItemDom.querySelector(".cart_item_quantity").innerText =
                  ++cartItem.quantity
                cartItemDom.querySelector(".cart_item_price").innerText =
                  parseInt(cartItem.quantity) * parseInt(cartItem.price) +
                  " Rs."
                cartTotal += parseInt(cartItem.price)
                document.querySelector(".pay").innerText = cartTotal + " Rs."
              }
            })
          })

        cartItemDom
          .querySelector('[data-action="decrease-item"]')
          .addEventListener("click", () => {
            cart.forEach((cartItem) => {
              if (cartItem.name === product.name) {
                if (cartItem.quantity > 1) {
                  cartItemDom.querySelector(".cart_item_quantity").innerText =
                    --cartItem.quantity
                  cartItemDom.querySelector(".cart_item_price").innerText =
                    parseInt(cartItem.quantity) * parseInt(cartItem.price) +
                    " Rs."
                  cartTotal -= parseInt(cartItem.price)
                  document.querySelector(".pay").innerText = cartTotal + " Rs."
                }
              }
            })
          })

        cartItemDom
          .querySelector('[data-action="remove-item"]')
          .addEventListener("click", () => {
            cart.forEach((cartItem) => {
              if (cartItem.name === product.name) {
                cartTotal -= parseInt(
                  cartItemDom.querySelector(".cart_item_price").innerText
                )
                document.querySelector(".pay").innerText = cartTotal + " Rs."
                cartItemDom.remove()
                cart = cart.filter((cartItem) => cartItem.name !== product.name)
                addtocartbtnDom.innerText = "Add to cart"
                addtocartbtnDom.disabled = false
              }
              if (cart.length < 1) {
                document.querySelector(".cart-footer").remove()
              }
            })
          })
        document
          .querySelector('[data-action="clear-cart"]')
          .addEventListener("click", () => {
            cartItemDom.remove()
            cart = []
            cartTotal = 0
            if (document.querySelector(".cart-footer") !== null) {
              document.querySelector(".cart-footer").remove()
            }
            addtocartbtnDom.innerText = "Add to cart"
            addtocartbtnDom.disabled = false
            basket.addAttribute("hidden")
          })
      }

      document
        .querySelector('[data-action="check-out"]')
        .addEventListener("click", () => {
          const checkoutData = cart.map((el) => {
            return { id: el.id, quantity: el.quantity }
          })
          payment(checkoutData)
        })
    })
  }
}

fetch(`${PAGE_URL}/shop/list`)
  .then((res) => res.json())
  .then(({ data }) => {
    getProductDashboard(data)
  })

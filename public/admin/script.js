const PAGE_URL = "http://localhost:8080"

const getUserDashboard = (json) => {
  const body = document
    .getElementById("userDashboard")
    .getElementsByTagName("tbody")[0]

  json.forEach((el) => {
    body.insertRow().innerHTML = `<tr> 
        <td>${el.email}</td> 
        <td>${el.user_name}</td> 
        <td>${el.role}</td> 
        </tr>`
  })
}

const getProductDashboard = (json) => {
  const body = document
    .getElementById("productDashboard")
    .getElementsByTagName("tbody")[0]

  json.forEach((el) => {
    body.insertRow().innerHTML = `<tr> 
        <td><img width="50px" src="${el.image}"></img></td> 
        <td>${el.name}</td> 
        <td>
        <span id="price-span-${el.id}">${el.price}</span>
        <input id="price-input-${el.id}" style="display:none" type="text" class="my-input" onblur="onInputBlur()" />
        </td> 
        <td>
        <span id="qunatity-span-${el.id}">${el.quantity}</span>
        <input id="qunatity-input-${el.id}" style="display:none" type="text" class="my-input" onblur="onInputBlur()" />
        </td> 
        <td><button onclick="productEdit(${el.id})" class="btn btn-warning ">edit</button></td>
        </tr>`
  })
}

function onInputBlur() {
  document.querySelector(".my-span").style.display = "block"
  document.querySelector(".my-input").style.display = "none"
}
const productEdit = (elementId) => {
  document.getElementById(`qunatity-span-${elementId}`).style.display = "none"
  document.getElementById(`qunatity-input-${elementId}`).style.display = "block"

  document.getElementById(`price-span-${elementId}`).style.display = "none"
  document.getElementById(`price-input-${elementId}`).style.display = "block"
}

fetch(`${PAGE_URL}/admin/dashBoard`)
  .then((res) => res.json())
  .then((json) => {
    getUserDashboard(json.user)
    getProductDashboard(json.product)
  })

const logOut = () => {
  window.location.replace(PAGE_URL)
}

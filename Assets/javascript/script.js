// Check Already login or not
let status = JSON.parse(localStorage.getItem("login-status"));
let user = JSON.parse(localStorage.getItem("user"));
const userName = document.getElementById("user-name");
const logout = document.getElementById("logout");
const phoneLogin = document.getElementById("phone-login");
if (status) {
  userName.innerHTML = `
  <div class="login link">
    <i class="fa-solid fa-user"></i>
    <span>${user.name.split(" ")[0]}</span>
  </div>`;
  logout.innerHTML = `
  <div onclick="localStorage.setItem('login-status',false) + location.reload()" class="register link">
    <i class="fa-solid fa-right-from-bracket"></i>
    <span>Logout</span>
  </div>`;

  phoneLogin.innerHTML = `
  <span>
    <i class="fa-regular fa-user"></i> ${user.name.split(" ")[0]}</span>
    <span onclick="localStorage.setItem('login-status',false) + location.reload()"><i class="fa-solid fa-right-from-bracket"></i>Logout</span>`;
}

function handleOnLoad() {
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  let totalAmount = 0;
  cartData.forEach((e) => {
    totalAmount = totalAmount + e.quantity * e.price;
  });
  let itemCount = cartData.length;
  document.getElementById(
    "card-data-show"
  ).innerText = `${itemCount} items(s) - $${totalAmount}.00`;
}

// Handle Search
async function handleSearch(input, pageNo = 1) {
  const itemsContainer = document.getElementById("search-items");
  const response = await fetchData("items.json");
  const typeOfPresent = localStorage.getItem("repersent-type");
  let html = ``;
  if (typeOfPresent == "list") {
    html = `<div id="item-repersent-type" class="items-container-list">`;
  } else {
    html = `<div id="item-repersent-type" class="items-container">`;
  }
  let chunk = 8;
  let filterData = [];
  if (input) {
    filterData = response.product.filter((element) => {
      if (element.name.toLowerCase().match(input.toLowerCase())) {
        return element;
      }
    });

    filterData
      .slice(chunk * (pageNo - 1), chunk * pageNo)
      .forEach((element) => {
        html += `<div onclick="handleDetailQuery('${
          element.id
        }')" class="category-card">
            <div class="img">
              <img src="${element.img}" alt="" />
              ${
                element.free
                  ? `<div class="free">
                <span>Free</span>
              </div>`
                  : ""
              }
              ${
                element.top_branded
                  ? `<div class="free-2">
                <span>Top Branded</span>
              </div>`
                  : ""
              }
              <div class="badges">
                ${element.off ? `<span class="badge badge1">-70%</span>` : ""}
                ${element.hot ? `<span class="badge badge2">hot</span>` : ""}
                ${
                  element.top_branded
                    ? `<span class="badge badge3">top brand</span>`
                    : ""
                }
              </div>
            </div>
            <div class="card-body">
              <div class="strip">
                <a href="#">${element.posted}</a>
                <span>${element.model}</span>
              </div>
              <div class="card-data">
                <h1>${element.name}</h1>
                <p class="description">${element.decription}</p>
                <div>$${element.price}.00 <strike>${
          element.off
        }.00 %</strike></div>
                <div class="more">
                  <div>
                    <input type="number" value="1" />
                    <button id="${
                      element.id
                    }" onclick="handleAddToCart(this)">ADD TO CART</button>
                  </div>
                  <div class="icons">
                    <i id="${
                      element.id
                    }" onclick="handleAddToCart(this,'wishlist')" class="fa-regular fa-heart"></i>
                    <i class="fa-sharp fa-solid fa-right-left"></i>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <span
                  ><i class="fa-light fa-circle-dollar green"></i> Buy
                  Now</span
                >
                <span onclick="triggerModal()"
                  ><i class="fa-solid fa-question red"></i> Question</span
                >
              </div>
            </div>
          </div>`;
      });

    html += `
    </div>
    <div class="pagination-div">`;
    for (let i = 0; i < Math.ceil(filterData.length / chunk); i++) {
      html += `<div class="page ${
        pageNo - 1 == i ? "active" : ""
      }" onclick="handleSearch(${i + 1})">${i + 1}</div>`;
    }
    html += `</div>`;
    itemsContainer.innerHTML = html;
  }
  if (!filterData.length) {
    html = `<div style="color: grey;
    width: 100%;
    margin: 30px;"> No Result found </div>`;
    itemsContainer.innerHTML = html;
  }
}

// Handle Add to Cart
async function handleAddToCart(element, listType) {
  const cartData = JSON.parse(localStorage.getItem(listType)) || [];
  const response = await fetchData("items.json");
  let status = false;
  // Check Product already added in the cart
  if (listType == "cart") {
    for (let i = 0; i < cartData.length; i++) {
      if (cartData[i].id == element.id) {
        cartData[i].quantity += 1;
        status = true;
        break;
      }
    }

    if (!status) {
      const data = response.product.filter((e) => {
        if (element.id == e.id) {
          e["quantity"] = 1;
          return e;
        }
      });
      cartData.push(data[0]);
      Swal.fire({
        title: "Success!",
        text: "Item added successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  } else {
    for (let i = 0; i < cartData.length; i++) {
      if (cartData[i].id == element.id) {
        status = true;
        Swal.fire({
          title: "Error!",
          text: "Already added into wishlist",
          icon: "error",
          confirmButtonText: "OK",
        });
        break;
      }
    }
    if (!status) {
      const data = response.product.filter((e) => {
        if (element.id == e.id) {
          return e;
        }
      });
      cartData.push(data[0]);
      Swal.fire({
        title: "Success!",
        text: "Item added successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  }
  localStorage.setItem(listType, JSON.stringify(cartData));

  let itemCount = cartData.length;
  let totalAmount = 0;
  cartData.forEach((e) => {
    totalAmount = totalAmount + e.quantity * e.price;
  });

  if (listType == "cart") {
    document.getElementById(
      "card-data-show"
    ).innerText = `${itemCount} items(s) - $${totalAmount}.00`;
  }
}

// Handle Show Cart item
async function handleShowCartItem(listType) {
  const itemsContainer = document.getElementById("search-items");
  let html = `<div class="items-container">`;
  const cartData = JSON.parse(localStorage.getItem(listType)) || [];
  if (cartData.length) {
    cartData.forEach((element) => {
      html += `<div class="category-card">
              <div class="img">
                <img src="${element.img}" alt="" />
                ${
                  element.free
                    ? `<div class="free">
                  <span>Free</span>
                </div>`
                    : ""
                }
                ${
                  element.top_branded
                    ? `<div class="free-2">
                  <span>Top Branded</span>
                </div>`
                    : ""
                }
                <div class="badges">
                  ${element.off ? `<span class="badge badge1">-70%</span>` : ""}
                  ${element.hot ? `<span class="badge badge2">hot</span>` : ""}
                  ${
                    element.top_branded
                      ? `<span class="badge badge3">top brand</span>`
                      : ""
                  }
                </div>
              </div>
              <div class="card-body">
                <div class="strip">
                  <a href="#">${element.posted}</a>
                  <span>${element.model}</span>
                </div>
                <div class="card-data">
                  <h1>${element.name}</h1>
                  <div>$${element.price}.00 <strike>${
        element.off
      }.00 %</strike></div>
                  <div class="more">
                    <div>
                      <input type="number" value="${element.quantity}" />
                      ${
                        listType == "cart"
                          ? `<button id="${element.id}" onclick="handleRemoveToCart(this,'cart')"><i class="fa-solid fa-trash"></i></button>`
                          : `<button id="${element.id}" onclick="handleRemoveToCart(this,'wishlist')"><i class="fa-solid fa-trash"></i></button>`
                      }
                    </div>
                    <div class="icons">
                      <i id="${
                        element.id
                      }" onclick="handleRemoveToCart(this,'wishlist')" class="fa-regular fa-heart"></i>
                      <i class="fa-sharp fa-solid fa-right-left"></i>
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <span
                    ><i class="fa-light fa-circle-dollar green"></i> Buy
                    Now</span
                  >
                  <span onclick="triggerModal()"
                    ><i class="fa-solid fa-question red"></i> Question</span
                  >
                </div>
              </div>
            </div>`;
    });
  }
  html += "</div>";
  itemsContainer.innerHTML = html;
  document.getElementById("what-are-people-saying").style.display = "none";
  document.getElementById("most-viewed").style.display = "none";
  document.getElementById("from-our-blog").style.display = "none";
  document.getElementById("improved-gallery-module").style.display = "none";
  document.getElementById("shop-by-brand").style.display = "none";
  document.getElementById("featured-product-2").style.display = "none";
  document.getElementById("featured-product").style.display = "none";
  document.getElementById("why-from-us").style.display = "none";
  document.getElementById("stats").style.display = "none";
  document.getElementById("hero").style.display = "none";
}

// Handle remote to cart
function handleRemoveToCart(element, listType) {
  const cartData = JSON.parse(localStorage.getItem(listType)) || [];

  const data = cartData.filter((e) => {
    if (e.id != element.id) {
      return e;
    }
  });
  localStorage.setItem(listType, JSON.stringify(data));

  let itemCount = data.length;
  let totalAmount = 0;
  let html = '<div class="items-container">';
  data.forEach((e) => {
    totalAmount = totalAmount + e.quantity * e.price;
    html += `<div class="category-card">
              <div class="img">
                <img src="${e.img}" alt="" />
                ${
                  e.free
                    ? `<div class="free">
                  <span>Free</span>
                </div>`
                    : ""
                }
                ${
                  e.top_branded
                    ? `<div class="free-2">
                  <span>Top Branded</span>
                </div>`
                    : ""
                }
                <div class="badges">
                  ${e.off ? `<span class="badge badge1">-70%</span>` : ""}
                  ${e.hot ? `<span class="badge badge2">hot</span>` : ""}
                  ${
                    e.top_branded
                      ? `<span class="badge badge3">top brand</span>`
                      : ""
                  }
                </div>
              </div>
              <div class="card-body">
                <div class="strip">
                  <a href="#">${e.posted}</a>
                  <span>${e.model}</span>
                </div>
                <div class="card-data">
                  <h1>${e.name}</h1>
                  <div>$${e.price}.00 <strike>${e.off}.00 %</strike></div>
                  <div class="more">
                    <div>
                      <input type="number" value="${e.quantity}" />
                      ${
                        listType == "cart"
                          ? `<button id="${e.id}" onclick="handleRemoveToCart(this,'cart')"><i class="fa-solid fa-trash"></i></button>`
                          : `<button id="${e.id}" onclick="handleRemoveToCart(this,'wishlist')"><i class="fa-solid fa-trash"></i></button>`
                      }
                    </div>
                    <div class="icons">
                      <i id="${
                        e.id
                      }" onclick="handleRemoveToCart(this,'wishlist')" class="fa-regular fa-heart"></i>
                      <i class="fa-sharp fa-solid fa-right-left"></i>
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <span
                    ><i class="fa-light fa-circle-dollar green"></i> Buy
                    Now</span
                  >
                  <span onclick="triggerModal()"
                    ><i class="fa-solid fa-question red"></i> Question</span
                  >
                </div>
              </div>
            </div>`;
  });
  html += "</div>";

  document.getElementById("search-items").innerHTML = html;
  if (listType == "cart") {
    document.getElementById(
      "card-data-show"
    ).innerText = `${itemCount} items(s) - $${totalAmount}.00`;
  }
  Swal.fire({
    title: "Success!",
    text: "Item remove successfully",
    icon: "success",
    confirmButtonText: "OK",
  });
}

var acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.parentElement.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
      acc[i].parentElement.children[0].style.color = "rgb(95, 95, 95)";
      acc[i].parentElement.children[1].style.color = "rgb(95, 95, 95)";
      acc[i].innerHTML = `<i class="fa-solid fa-plus plus-minus "></i>`;
    } else {
      panel.style.display = "block";
      acc[i].parentElement.children[0].style.color = "#0427A5";
      acc[i].parentElement.children[1].style.color = "#0427A5";
      acc[i].innerHTML = `<i class="fa-solid fa-minus plus-minus "></i>`;
    }
  });
}

// Handle on Load Repersent Formate use
const onLoadSearchRepresent = () => {
  const typeOfPresent = localStorage.getItem("repersent-type");
  let type = document.getElementById("item-repersent-type");
  if (type.classList[0] === "items-container" && typeOfPresent !== "grid") {
    type.classList.remove("items-container");
    type.classList.add("items-container-list");
  }
};

// Handle Search Item Repersent Formate - Grid,List
const handleSearchRepresent = (typeOfPresent) => {
  localStorage.setItem("repersent-type", typeOfPresent);
  const type = document.getElementById("item-repersent-type");
  if (typeOfPresent == "grid") {
    type.classList.add("items-container");
    type.classList.remove("items-container-list");
  } else if (typeOfPresent == "list") {
    type.classList.remove("items-container");
    type.classList.add("items-container-list");
  }
};

// Handle Query search
function handleSearchQuery() {
  let searchInput = document.getElementById("search").value;
  window.location = `./search.html?search=${searchInput}`;
}
// Handle Query search
function handleSearchQuery2() {
  let searchInput = document.getElementById("search2").value;
  window.location = `./search.html?search=${searchInput}`;
}

// Handle Read Search Query
function handleReadSearchQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  const input = urlParams.get("search");
  document.getElementById("search").value = input;
  document.getElementById("search-value").innerHTML = input;
  document.getElementById("search2").value = input;
  handleSearch(input);
}

// Handle Query search
function handleDetailQuery(id) {
  window.location = `./details.html?search=${id}`;
}

// Handle Read Search Query
function handleReadDetailsQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  const input = urlParams.get("search");
  handleDetailPageSearch(input);
}

// Handle Search
async function handleDetailPageSearch(input) {
  const response = await fetchData("items.json");
  if (input) {
    filterData = response.product.filter((element) => {
      if (element.id == input) {
        return element;
      }
    });

    document.getElementById("product-name").innerHTML = filterData[0].name;
    document.getElementById("search-value").innerHTML = filterData[0].name;
    document.getElementById("product-description").innerHTML =
      filterData[0].decription;
    document.getElementById("product-company-logo").innerHTML = `<img
  src="${filterData[0].img}"
  alt=""
  srcset=""
/>
<span id="company-name">${filterData[0].name}</span>`;
    document.getElementById("off-price").innerHTML = "$" + filterData[0].off;
    document.getElementById("first-img").innerHTML = `<img
  onclick="openImage(this)"
    src="${filterData[0].img}"
    alt=""
    srcset=""
  />`;
    document.getElementById("active-img").innerHTML = `<img
    id="zoom1"
    onmousemove="zoomIn(event)"
    onmouseout="zoomOut()"
    onclick="openImage(this)"
    src="${filterData[0].img}"
    alt=""
    srcset=""
  /><div id="preview"></div>`;
    document.getElementById("price").innerHTML = "$" + filterData[0]?.price;
  }
}

// Handle Alert
const handleAlert = (name) => {
  Swal.fire({
    title: "Success!",
    text: `Item add into ${name} successfully`,
    icon: "success",
    confirmButtonText: "OK",
  });
};

// Handle Modal
var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");
function toggleModal() {
  modal.classList.toggle("show-modal");
}
function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
function triggerModal() {
  toggleModal();
}

window.addEventListener("scroll", () => {
  let header = document.getElementById("header-2");
  let tag = document.getElementsByClassName("tag");
  if (window.pageYOffset > header.offsetTop) {
    header.classList.add("sticky");
    tag[0].style.display = "none";
    tag[1].style.display = "none";
  } else {
    header.classList.remove("sticky");
    tag[0].style.display = "block";
    tag[1].style.display = "block";
  }
});

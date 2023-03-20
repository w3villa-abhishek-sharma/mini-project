// Check Already login or not
let status = JSON.parse(localStorage.getItem("login-status"));
console.log(status);
if (!status) {
  window.location = "./login.html";
}

// Handle Search
async function handleSearch() {
  const input = document.getElementById("search");
  const itemsContainer = document.getElementById("search-items");
  const response = await fetchData("items.json");
  let html = ``;
  response.product.forEach((element) => {
    if (element.name.toLowerCase().match(input.value.toLowerCase())) {
      console.log(element);
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
                    <input type="number" value="1" />
                    <button>ADD TO CART</button>
                  </div>
                  <div class="icons">
                    <i class="fa-regular fa-heart"></i>
                    <i class="fa-sharp fa-solid fa-right-left"></i>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <span
                  ><i class="fa-light fa-circle-dollar green"></i> Buy
                  Now</span
                >
                <span
                  ><i class="fa-solid fa-question red"></i> Question</span
                >
              </div>
            </div>
          </div>`;
    }
  });
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


// Handle Add to Cart
async function handleAddToCart(id){
    const cartData = localStorage.getItem("cart");
}

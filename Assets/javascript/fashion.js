// Fashion fetch from json file and render on web page
const fashionRender = async () => {
  const data = await fetchData("items.json");
  const resData = data.product.filter(
    (element) => element.type == "new_fashion"
  );
  const fashion = document.getElementById("fashion");
  let html = `<div class="left-card">
    <h1>Fashion</h1>
    <div class="card">
      <div class="img">
        <img src="${data.fashion.img}" alt="">
      </div>
      <div class="content">
        ${data.fashion.data.map((element) => {
          return `<div>${element}</div>`;
        })}
        <a href="#">See all in Fashion</a>
      </div>
    </div>
  </div>`;

  html += `<div class="right-card-container">
  <h1>New in Fashion</h1>
  <!-- Cards -->
<div class="category-cards">
<div class="owl-carousel owl-theme">`;
  resData.forEach((element) => {
    html += `
       <div class="item">
              <div class="category-card">
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
                    ${
                      element.off
                        ? `<span class="badge badge1">-${element.off}%</span>`
                        : ""
                    }
                    ${
                      element.hot ? `<span class="badge badge2">hot</span>` : ""
                    }
                    ${
                      element.top_branded
                        ? `<span class="badge badge3">top brand</span>`
                        : ""
                    }
                  </div>
                </div>
                <div class="card-body">
                  <div class="name">${element.name}</div>
                  <span>$${element.price}.00</span>
                </div>
                <div class="card-footer">
                  <button id="${element.id}" onclick="handleAddToCart(this,'cart')">Add to Card</button>
                  <span>
                    <i id="${element.id}" onclick="handleAddToCart(this,'wishlist')" class="fa-regular fa-heart"></i>
                    <i class="fa-solid fa-arrow-right-arrow-left"></i>
                  </span>
                </div>
              </div>
            </div>`;
  });

  html += `</div></div></div>`;
  fashion.innerHTML = html;
  // This Code for category 2 cards
  $(".right-card-container .owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1100: {
        items: 3,
      },
    },
  });
};

fashionRender();

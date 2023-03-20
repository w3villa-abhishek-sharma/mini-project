// MostViewed fetch from json file and render on web page
const mostViewed = async () => {
  const data = await fetchData("items.json");
  const most = document.getElementById("most-viewed-card");
  let html = ``;
  const resData = data.product.filter(element=>element.type == 'most_viewed');
  resData.forEach((element) => {
    html += `
       <div class="card">
              <div class="img">
                <img src="${element.img}" alt="">
              </div>
              <div class="content">
                <h2>${element.name}</h2>
                <span>$${element.price}.00</span>
                <div>
                  <i class="fa-solid fa-cart-shopping-fast"></i>
                  <i class="fa-regular fa-heart"></i>
                  <i class="fa-solid fa-arrow-right-arrow-left"></i>
                </div>
              </div>
            </div>`;
  });
  most.innerHTML = html;
};

mostViewed();

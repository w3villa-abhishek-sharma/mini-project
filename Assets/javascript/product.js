// Fetch Data from File
const fetchData = async(fileName)=>{
    const response = await fetch(`../../Assets/data/${fileName}`);
    const data = await response.json();
    return data;
}


// Product fetch from json file and render on web page
const productRender = async()=>{
    const data = await fetchData('product.json');
    const featuredProduct2 = document.getElementById("featuredProduct2");
    let html = `<div class="owl-carousel owl-theme category-cards-inner">`;
    data.forEach(element => {
       html += `
       <div class="item">
              <div class="category-card">
                <div class="img">
                  <img src="${element.img}" alt="" />
                  ${element.free ? `<div class="free">
                    <span>Free</span>
                  </div>`: ''}
                  ${element.top_branded ? `<div class="free-2">
                    <span>Top Branded</span>
                  </div>`: ''}
                  <div class="badges">
                    ${element.off ? `<span class="badge badge1">-70%</span>` : ''}
                    ${element.hot? `<span class="badge badge2">hot</span>` : ''}
                    ${element.top_branded ? `<span class="badge badge3">top brand</span>`: ''}
                  </div>
                </div>
                <div class="card-body">
                  <div class="strip">
                    <a href="#">${element.posted}</a>
                    <span>${element.model}</span>
                  </div>
                  <div class="card-data">
                    <h1>${element.name}</h1>
                    <div>$${element.price}.00 <strike>${element.off}.00 %</strike></div>
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
              </div>
            </div>` 
    });
    html += `</div>`
    featuredProduct2.innerHTML = html;
    // This Code for category cards
    $(".owl-carousel.category-cards-inner").owlCarousel({
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
          1000: {
            items: 3,
          },
          1500: {
            items: 4,
          },
        },
      });
}

productRender();
// Category fetch from json file and render on web page
const categoryRender = async (type="top_category") => {
  const response = await fetchData("category.json");
  let data = response.category;
  const resData = data.filter(element=>{
    if(type==element.type){
      return element
    }
  })
  const category = document.getElementById("category");
  let html = `<div class="owl-carousel owl-theme category-cards-inner">`;
  resData.forEach((element) => {
    html += `
       <div class="item">
              <div class="category-card">
                <div class="img">
                  <img src="${element.img}" alt="" />
                </div>
                <div class="content">${element.name}</div>
              </div>
            </div>`;
  });
  html += `</div>`;
  category.innerHTML = html;
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
      1100: {
        items: 5,
      },
    },
  });
};

categoryRender();

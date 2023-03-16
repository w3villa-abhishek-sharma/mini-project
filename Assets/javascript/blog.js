// Blogs fetch from json file and render on web page
const blogRender = async (type="blog") => {
  const response = await fetchData("blog.json");
  let data ;
  if(type == "blog"){
    data = response.blog;
  }else{
    data = response.most_read;
  }
  const blogs = document.getElementById("blogs");
  let html = `<div class="owl-carousel owl-theme category-cards-inner">`;
  data.forEach((element) => {
    html += `
       <div class="item">
              <div class="category-card">
                <div class="img">
                  <img src="${element.img}" alt="" />
                  <div class="date">
                    <div class="day">${element.post_date}</div>
                    <div class="month">${element.post_month}</div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="strip">
                    <span><i class="fa-solid fa-user"></i> ${element.type}</span>
                    <span><i class="fa-solid fa-message-dots"></i> ${element.comment_count}</span>
                    <span><i class="fa-solid fa-eye"></i> ${element.view}</span>
                  </div>
                  <div class="card-data">
                    <h1>${element.title}</h1>
                    <p>${element.content}</p>
                    <span><a href="#">Read more <i class="fa-sharp fa-solid fa-arrow-right"></i></a></span>
                  </div>
                  
                </div>
              </div>
            </div>`;
  });
  html += `</div>`;
  blogs.innerHTML = html;
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
        items: 4,
      },
      1500: {
        items: 5,
      },
    },
  });
};

blogRender();

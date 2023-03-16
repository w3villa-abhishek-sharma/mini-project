// Comments fetch from json file and render on web page
const commentRender = async () => {
  const data = await fetchData("peopleComment.json");
  const comments = document.getElementById("comments");
  let html = `<div class="owl-carousel owl-theme">`;
  data.comments.forEach((element) => {
    html += `
       <div class="item">
                <div class="card">
                  <div class="img">
                    <img src="https://suprents.com/wp-content/uploads/2021/03/curly-quotation-mark-72.png" alt="">
                  </div>
                  <div class="content">
                    <p>${element.comment}</p>
                    <span>- ${element.posted_by}</span>
                  </div>
                </div>
              </div>`;
  });
  html += `</div>`;
  comments.innerHTML = html;
  // This Code for people saying cards
  $(".people-saying-cards .owl-carousel").owlCarousel({
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
        items: 4,
      },
      1500: {
        items: 5,
      },
    },
  });
};

commentRender();

$("[type=file]").on("change", function(){
    var file = this.files[0].name;
    var dflt = $(this).attr("placeholder");
    if($(this).val()!=""){
      $(this).next().text(file);
    } else {
      $(this).next().text(dflt);
    }
  });


//   Handle Chnage Content
function changeContent(name){
    let data = document.getElementById("product-description");
    let html = ``
    if(name=="1"){
        html+=  `Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur autem facilis cupiditate temporibus at nesciunt consectetur mollitia neque asperiores! Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur autem facilis cupiditate temporibus at nesciunt consectetur mollitia neque asperiores!`
    }else if(name=="2"){
        html+=  `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure numquam sint amet dolores quo iste maxime ducimus blanditiis magnam hic repellendus corrupti, vitae aspernatur nemo cupiditate saepe perferendis recusandae beatae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur autem facilis cupiditate temporibus at nesciunt consectetur mollitia neque asperiores!`
    }else if(name=="3"){
        html+=  `Iure numquam sint amet dolores quo iste maxime ducimus blanditiis magnam hic repellendus corrupti, vitae aspernatur nemo cupiditate saepe perferendis recusandae beatae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur autem facilis cupiditate temporibus at nesciunt consectetur mollitia neque asperiores!`
    }else if(name=="4"){
        html+= `vitae aspernatur nemo cupiditate saepe perferendis recusandae beatae. Iure numquam sint amet dolores quo iste maxime ducimus blanditiis magnam hic repellendus corrupti, vitae aspernatur nemo cupiditate saepe perferendis recusandae beatae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur autem facilis cupiditate temporibus at nesciunt consectetur mollitia neque asperiores!`
    }
    html += `<div onclick="handleSeeMoreText()" id="see-more-text-btn" class="see-more-text-btn">
    <i class="fa-regular fa-angle-down"></i> See more
  </div>`
    data.innerHTML = html ;
}

// Handle Open Image
function openImage(el){
    let link = el.src;
    let activeImg = document.getElementById("active-img");
    activeImg.innerHTML = `<img
    id="zoom1"
    onmousemove="zoomIn(event)"
    onmouseout="zoomOut()"
    src="${link}"
    alt=""
    srcset=""
  /><div id="preview"></div>`
}

// Handle See more Text
function handleSeeMoreText(){
   let data =  document.getElementById("product-description");
   let btn =  document.getElementById("see-more-text-btn");
   data.style.height = "auto";
   btn.innerHTML = `<i class="fa-regular fa-angle-up"></i> Less more`
   btn.setAttribute("onClick","handleLessMoreText()")
}
// Handle Less more Text
function handleLessMoreText(){
   let data =  document.getElementById("product-description");
   let btn =  document.getElementById("see-more-text-btn");
   data.style.height = "57px";
   btn.innerHTML = `<i class="fa-regular fa-angle-down"></i> See more`
   btn.setAttribute("onClick","handleSeeMoreText()")
}
// funtion for all sorting on htol ltoh etc.
export default function sort(products) {
  // Sort sectin***************************

  const sort_options = document.querySelectorAll(".sort-by-options");

  // function for changin animation of short's buttons
  const change_bg = () => {
    sort_options.forEach((value, index) => {
      if (value.hasAttribute("class", "change-bg")) {
        value.removeAttribute("class", "change-bg");
      }
    });
  };

  // arr of un-sorted prices
  let oldarr = [];
  //this foreach for makeing arr of prices
  products.forEach((value, index) => {
    let price = products[index].price;
    oldarr[index] = price;
  });

  // arr of rarting for newest sort
  let arr_of_rating = [];
  products.forEach((value, index) => {
    let rating = products[index].rating;
    arr_of_rating[index] = rating;
  });

  // 1. Low to High
  sort_options[0].addEventListener("click", (lowtohigh) => {
    change_bg();

    lowtohigh.target.classList.toggle("change-bg");

    // Create a copy of oldarr to avoid modifying the original array
    let copyarr = [...oldarr];

    // Sort the copyarr, and get the indices of the sorted values in the original order
    let indexofarr = copyarr
      .map((_, index) => index)
      .sort((a, b) => copyarr[a] - copyarr[b]);

    empty_cars_div();
    document.querySelector("#pagi2").innerHTML = "";
    // Calling createcard function
    createcard(products, indexofarr);
  });

  // 2. High to low
  sort_options[1].addEventListener("click", (hightolow) => {
    change_bg();

    hightolow.target.classList.toggle("change-bg");

    // Create a copy of oldarr to avoid modifying the original array
    let copyarr = [...oldarr];

    // Sort the copyarr, and get the indices of the sorted values in the original order
    let indexofarr1 = copyarr
      .map((_, index) => index)
      .sort((a, b) => copyarr[b] - copyarr[a]);

    document.querySelector("#pagi2").innerHTML = "";
    empty_cars_div();

    // Calling createcard function
    createcard(products, indexofarr1);
  });

  // 3. newest one
  sort_options[2].addEventListener("click", (newestone) => {
    change_bg();
    newestone.target.classList.toggle("change-bg");

    console.log("newest not define");
  });

  // 4. popularitiy
  sort_options[3].addEventListener("click", (popularitiy) => {
    change_bg();

    popularitiy.target.classList.toggle("change-bg");

    // Create a copy of oldarr to avoid modifying the original array
    let copyarr = [...arr_of_rating];

    // Sort the copyarr, and get the indices of the sorted values in the original order
    let indexofarr3 = copyarr
      .map((_, index) => index)
      .sort((a, b) => copyarr[b] - copyarr[a]);

    document.querySelector("#pagi2").innerHTML = "";
    empty_cars_div();
    // Calling createcard function
    createcard(products, indexofarr3);
  });
}

// function activate  when click on pagi no. 
function pagelimit(SA) {
  document.querySelector(".products-list").innerHTML=""
  let wantto_p_onpage=20
  let totalpage = Math.ceil(SA.length /wantto_p_onpage);
  let pagediv = document.querySelector("#pagi2");
  for (let o = 1; o <= totalpage; o++) {
    let pageno = document.createElement("span");
    pageno.innerText = o;
    pagediv.appendChild(pageno);
  }
  let pageclick = Array.from(pagediv.children);
  // Declare rngedp outside the function so it's accessible globally

  pageclick.forEach((value, index) => {
    
    value.addEventListener("click", (event) => {
     
      empty_cars_div();

      let range = 20;
      let pagestart = index !== 0 ? index * range : index;
      let pageend = parseInt(event.target.innerText) * range;
      let rangedp = SA.slice(pagestart, pageend);

      rangedp.forEach((value, i) => {
       
        const product = document.createElement("div");
        product.className = "products";
        const productmain = document.querySelector(".products-list");
        productmain.appendChild(product);
        // first span for wishlist img
        let span = document.createElement("span");
        span.className = "wishlist";
        let url = "/icons/underline-heart.svg";
        let img = document.createElement("img");
        img.setAttribute("src", url);
        span.appendChild(img);

        product.appendChild(span);

        // second div for products img
        let div2 = document.createElement("div");
        div2.className = "p-div1";
        let img2 = document.createElement("img");
        img2.className = "p-image";
        let p_url = value.thumbnail;
        img2.setAttribute("src", p_url);
        div2.appendChild(img2);
        //console.log(div2.innerHTML);
        product.appendChild(div2);

        // third div for products description
        let div3 = document.createElement("div");
        div3.className = "p-div2";
        div3.innerHTML =
          "<ul> <li></li><li></li><li><img><p></p></li><li><p></p><p></p><li><p></p></li></li><li></li></ul>";
        div3.children[0].className = "descripition-list";
        div3.children[0].children[0].className = "p-about";
        div3.children[0].children[0].innerHTML = value.description;

        div3.children[0].children[1].className = "p-brand";
        div3.children[0].children[1].innerHTML = value.brand;

        div3.children[0].children[2].className = "p-rating";
        div3.children[0].children[2];

        div3.children[0].children[2].children[0].className = "p-rate-star";

        let p_rate_star = "/icons/img26.webp";
        div3.children[0].children[2].children[0].setAttribute(
          "src",
          p_rate_star
        );
        div3.children[0].children[2].children[1].className = "p-r-number";
        div3.children[0].children[2].children[1].innerHTML =
          value.rating.toFixed(1);

        div3.children[0].children[3].className = "p-price";

        div3.children[0].children[3].children[0].className =
          "original-price";
        const oldprice = value.price * 81;

        div3.children[0].children[3].children[0].innerHTML = `&#x20B9<strike>${oldprice}</strike>`;
        div3.children[0].children[3].children[1].className = "discount";

        const discountpercent = (value.discountPercentage - 100) / 100;
        div3.children[0].children[3].children[1].innerHTML = `${value.discountPercentage.toFixed(
          0
        )}% off`;
        div3.children[0].children[4].children[0].className = "final-price";
        const finalprice = `&#x20B9<span>${Math.abs(
          Math.floor(oldprice * discountpercent)
        ).toLocaleString("en", "IN")}</span>`;
        div3.children[0].children[4].children[0].innerHTML = finalprice;
        div3.children[0].children[5].className = "p-cate";
        div3.children[0].children[5].innerHTML = value.category;
        product.appendChild(div3);
        
      });
      
      // Resolve the promise with the result
    });
  });
}

// function activate for default products if pagi not active
function default_P_list(arr){
  arr.forEach((value, i) => {
      
    if(i<20){
      const product = document.createElement("div");
      product.className = "products";
      const productmain = document.querySelector(".products-list");
      productmain.appendChild(product);
      // first span for wishlist img
      let span = document.createElement("span");
      span.className = "wishlist";
      let url = "/icons/underline-heart.svg";
      let img = document.createElement("img");
      img.setAttribute("src", url);
      span.appendChild(img);

      product.appendChild(span);

      // second div for products img
      let div2 = document.createElement("div");
      div2.className = "p-div1";
      let img2 = document.createElement("img");
      img2.className = "p-image";
      let p_url = arr[i].thumbnail;
      img2.setAttribute("src", p_url);
      div2.appendChild(img2);
      //console.log(div2.innerHTML);
      product.appendChild(div2);

      // third div for products description
      let div3 = document.createElement("div");
      div3.className = "p-div2";
      div3.innerHTML =
        "<ul> <li></li><li></li><li><img><p></p></li><li><p></p><p></p><li><p></p></li></li><li></li></ul>";
      div3.children[0].className = "descripition-list";
      div3.children[0].children[0].className = "p-about";
      div3.children[0].children[0].innerHTML = arr[i].description;

      div3.children[0].children[1].className = "p-brand";
      div3.children[0].children[1].innerHTML = arr[i].brand;

      div3.children[0].children[2].className = "p-rating";
      div3.children[0].children[2];

      div3.children[0].children[2].children[0].className = "p-rate-star";

      let p_rate_star = "/icons/img26.webp";
      div3.children[0].children[2].children[0].setAttribute("src", p_rate_star);
      div3.children[0].children[2].children[1].className = "p-r-number";
      div3.children[0].children[2].children[1].innerHTML =
        arr[i].rating.toFixed(1);

      div3.children[0].children[3].className = "p-price";

      div3.children[0].children[3].children[0].className = "original-price";
      const oldprice = arr[i].price * 81;

      div3.children[0].children[3].children[0].innerHTML = `&#x20B9<strike>${oldprice}</strike>`;
      div3.children[0].children[3].children[1].className = "discount";

      const discountpercent = (arr[i].discountPercentage - 100) / 100;
      div3.children[0].children[3].children[1].innerHTML = `${arr[
        i
      ].discountPercentage.toFixed(0)}% off`;
      div3.children[0].children[4].children[0].className = "final-price";
      const finalprice = `&#x20B9<span>${Math.abs(
        Math.floor(oldprice * discountpercent)
      ).toLocaleString("en", "IN")}</span>`;
      div3.children[0].children[4].children[0].innerHTML = finalprice;
      div3.children[0].children[5].className = "p-cate";
      div3.children[0].children[5].innerHTML = arr[i].category;
      product.appendChild(div3);
      
    };
    })
   
}

//this function for empty products-list (cards)
const empty_cars_div = () => {
  const productmain = document.querySelector(".products-list");
  productmain.innerHTML = "";
};
function creatheart(){
  const heart = document.querySelectorAll(".wishlist");
  heart.forEach((value) => {
    value.addEventListener("click", function () {
      value.classList.toggle("heart-anime");
      const newheart = value.querySelector("img");
      const newlink = "/icons/red-heart.svg";
      const oldlink = "/icons/underline-heart.svg";

      if (newheart.getAttribute("src") == oldlink) {
        newheart.setAttribute("src", newlink);
      } else {
        newheart.setAttribute("src", oldlink);
      }
    });
  });

}


// funtcion for creating card 
export let createcard = function (arr, sortedindex) {
  
  if (sortedindex !== undefined) {
    let sortedarray = [];
    for (let i = 0; i <= arr.length; i++) {
      sortedarray[i] = arr[sortedindex[i]];
    }
    
    pagelimit(sortedarray);
    default_P_list(sortedarray)


  } else {

    pagelimit(arr)

    default_P_list(arr)
  }
creatheart()

};

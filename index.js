import products_list from "./components/products.js";
import sortt from "./components/Sorting.js";
import { createcard } from "./components/Sorting.js";
let products =products_list.products;




document.addEventListener("DOMContentLoaded", function () {
  const cate = document.getElementsByClassName("filter-selection-heading");
  let category = Array.from(cate);
  const arrow = document.getElementsByClassName("options-arrow");
  let finalarrow = Array.from(arrow);
  let search = document.getElementById("filter-selection-search");

  const options = document.getElementsByClassName("checkbox-or-p-div");
  let options_list = Array.from(options);
  const for_view_more = document.querySelector(".div-for-view-more");

  let viewMoreSpan = document.querySelector(".view-more");

  category.forEach(function (value, index) {
    category[index].addEventListener("click", function () {
      if (index === 0) {
        search.style.display =
          search.style.display === "none" ? "block" : "none";

        const toggle = () => {
          for_view_more.style.display = "block";
          viewMoreSpan.style.display = "none";
        };
        viewMoreSpan.addEventListener("click", toggle);
      }

      // Toggle display of options and rotate arrow

      options_list[index].style.display =
        options_list[index].style.display === "none" ? "block" : "none";

      finalarrow[index].style.transform =
        finalarrow[index].style.transform === "rotate(90deg)"
          ? "rotate(270deg)"
          : "rotate(90deg)";
    });
  });

  //For toggling blue ticks on checkboxes

  options_list.forEach((parent) => {
    const children = parent.children;
    const array_of_children = Array.from(children);

    array_of_children.forEach((child) => {
      const checkbox = child.querySelector("input");

      child.addEventListener("click", function () {
        checkbox.checked = !checkbox.checked;
      });
    });
  });
});




// this section for searchbar and their results suggestion
const searchbar = document.querySelector("#searchbar");
const searchbar_div = document.querySelector("#search-bar-div");
const search_icon = searchbar.nextElementSibling;
const suggest_parent = document.querySelector(".search-suggest");
const words = Array.from(suggest_parent.children);
let typed_words;
function search_result() {
  searchbar_div.addEventListener("click", () => {
    suggest_parent.setAttribute("style", "display:flex");

    words.forEach((value) => {
      value.addEventListener("click", (event) => {
        searchbar.value = event.target.innerText;

        value.children[0].addEventListener("click", (e) => {
          e.target.parentNode.style.display = "none";
        });
      });
    });

    searchbar.addEventListener("keyup", () => {
      typed_words = searchbar.value.trim().toLowerCase(); // Convert to lowercase for case-insensitive comparison

      words.forEach((value) => {
        let suggestion = value.innerText.trim().toLowerCase(); // Convert to lowercase for case-insensitive comparison

        if (suggestion.startsWith(typed_words)) {
          value.setAttribute("style", "display:flex");
        } else {
          value.style.display = "none";
        }
      });
    });
  });

  suggest_parent.addEventListener("mouseover", () => {
    suggest_parent.setAttribute("style", "display:flex");
  });
  suggest_parent.addEventListener("mouseout", () => {
    suggest_parent.style.display = "none";
  });
}
search_result();

// this section for toggle user info when user-img toggle
const user_img = document.querySelector("#user-img");
const user_info = document.querySelector("#user-info-div");
let isMouseOver = false;
let isMouseDown = false;
function user_toggle() {
  // Function to show user-info
  const showUserInfo = () => {
    user_info.style.display = "block";
  };

  // Function to hide user-info
  const hideUserInfo = () => {
    if (!isMouseOver && !isMouseDown) {
      user_info.style.display = "none";
    }
  };

  // Event listeners for user-img
  user_img.addEventListener("mouseover", () => {
    isMouseOver = true;
    showUserInfo();
  });

  user_img.addEventListener("mouseout", () => {
    isMouseOver = false;
    hideUserInfo();
  });

  // Event listeners for user-info-div
  user_info.addEventListener("mouseover", () => {
    isMouseOver = true;
    showUserInfo();
  });

  user_info.addEventListener("mouseout", () => {
    isMouseOver = false;
    hideUserInfo();
  });

  // Event listeners for mousedown and mouseup
  user_info.addEventListener("mousedown", () => {
    isMouseDown = true;
  });

  user_info.addEventListener("mouseup", () => {
    isMouseDown = false;
    hideUserInfo();
  });
}
user_toggle();

// this section for download button
function download_but() {
  const download_but = document.querySelector("#download-button");
  const download_div = document.querySelector("#download-div");
  download_but.addEventListener("mouseover", () => {
    isMouseOver = true;
    download_div.style.display = "block";
  });
  download_but.addEventListener("mouseout", () => {
    isMouseOver = false;
    if (!isMouseDown && !isMouseOver) {
      download_div.style.display = "none";
    }
  });
  download_div.addEventListener("mouseover", () => {
    isMouseOver = true;
    download_div.style.display = "block";
  });
  download_div.addEventListener("mouseout", () => {
    isMouseOver = false;
    download_div.style.display = "none";
  });
}
download_but();

//soeting module
sortt(products)

// function form makign procucts cards
createcard(products)


$(document).ready(function () {
  $(".customer-list").slick({
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    infinite: true,
    speed: 300,
    dots: true,
    prevArrow: `<button type='button' class='slick-prev pull-left'><i class="fas fa-arrow-left"></i></button>`,
    nextArrow: `<button type='button' class='slick-next pull-right'><img src="./images/arrow-right.svg"/></button>`,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
    ],
  });
});

const button = document.getElementById("scroll-top");

const displayButton = () => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      button.classList.add("show");
    } else {
      button.classList.remove("show");
    }
  });
};

const scrollToTop = () => {
  button.addEventListener("click", () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
};

displayButton();
scrollToTop();

const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const activeClass = "is-show";
toggle.addEventListener("click", function () {
  menu.classList.toggle(activeClass);
});
window.addEventListener("click", function (e) {
  if (!menu.contains(e.target) && !e.target.matches(".menu-toggle")) {
    menu.classList.remove(activeClass);
  }
});

const bestsellingRight = document.querySelector(".bestselling-right");
bestsellingRight.innerHTML = "<h1>LOADING...</h1>";
window.addEventListener("load", (event) => {
  fetch("https://dummyjson.com/products?limit=6")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let result = "";
      data.products.forEach((item) => {
        result += ` <div class="bestselling-img">
        
          <img src="${item.thumbnail}" alt="" srcset="" />
          <div class="bestselling-right-text">Natural Plants</div>
          <div class="bestselling-right-price">140.000đ</div>
          <div hidden="hidden" class="bestselling-id">${item.id}</div>
        </div>`;
      });

      bestsellingRight.innerHTML = result;

      const bestsellingImgAll = document.querySelectorAll(".bestselling-img");
      if (!bestsellingImgAll) return;
      [...bestsellingImgAll].forEach((item) => {
        item.addEventListener("click", async function (e) {
          const id = item.querySelector(".bestselling-id").textContent;
          const promise = await fetch(`https://dummyjson.com/products/${id}`);
          const data = await promise.json();
          localStorage.setItem("product_detail", JSON.stringify(data));
          window.location.assign("detail.html");
        });
      });
    });
});

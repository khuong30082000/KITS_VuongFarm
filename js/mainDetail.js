const data = JSON.parse(localStorage.getItem("product_detail"));
const imageBig = document.querySelector(".content-bottom-left img");
const divBottomItem = document.querySelector(".content-bottom-item");
const count = document.getElementById("count");
const buttonAdd = document.querySelector(".about-item-button");
const heading = document.querySelector(".bottom-right-heading");
const brand = document.querySelector(".bottom-right-title span");
const desc = document.querySelector(".about-item-desc");
const price = document.querySelector(".about-item-dolar span");

window.addEventListener("load", (event) => {
  if (data) {
    imageBig.src = data.thumbnail;
    heading.textContent = data.title;
    brand.textContent = data.brand;
    price.textContent = data.price;
    desc.textContent = data.description;
    let result = "";
    data.images.forEach((item) => {
      result += `<img src=${item} alt="aaammm" />`;
      divBottomItem.innerHTML = result;
    });

    $(document).ready(function () {
      $("#search").keyup(function () {
        searchHighlight($(this).val());
      });
    });

    function searchHighlight(searchText) {
      if (searchText) {
        const content = $(".about-item-desc").text();
        const searchExp = new RegExp(searchText, "ig");
        const matches = content.match(searchText);
        if (matches) {
          $(".about-item-desc").html(
            content.replace(searchExp, function (match) {
              return `<span class="highlight">${match}</span>`;
            })
          );
        } else {
          $(".highlight").removeClass("highlight");
        }
      } else {
        $(".highlight").removeClass("highlight");
      }
    }
  }
  let cong = 1;

  buttonAdd.addEventListener("click", function () {
    count.textContent = cong++;
  });

  imageBig.addEventListener("click", function (e) {
    const image = e.target.getAttribute("src");

    const template = ` <div class="lightbox">
      <div class="lightbox-content">
        <img src="${image}" alt="" srcset="" />
      </div>
    </div>`;

    document.body.insertAdjacentHTML("beforeend", template);
  });
});

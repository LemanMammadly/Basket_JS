"use strict";

let prods = [];
document.addEventListener("DOMContentLoaded", getLocal());

function getLocal() {
  let basketProd = JSON.parse(localStorage.getItem("basket"));
  prods = basketProd || [];
}

let tbody = document.querySelector("#tbody");
let data = "";
let total = 0;

function Basket() {
  if (prods.length === 0) {
    document.querySelector(".card-all").classList.add("d-none");
    document.querySelector(".card").classList.add("d-none");
    document.querySelector(".table").classList.add("d-none");
    let alert = "";
    alert = `
            <div class="alert alert-danger alert-message" role="alert">
                Basket is empty! <a href="index.html" class="ml-3">Start Shopping</a>
            </div>
        `;
    document.getElementById("alert").innerHTML = alert;
  } else {
    prods.map((prod) => {
      let totalPrice = document.querySelector(".total-price");
      let totalPriceLast = document.querySelector(".total-price-last");
      let prodCount = prod.count;
      total += prod.price * prodCount;
      totalPrice.innerHTML = total + "$";
      totalPriceLast.innerHTML = total + "$";

      data += `
        <tr>
        <td>
            <figure class="itemside align-items-center">
                <div class="aside"><img src="${
                  prod.image
                }" class="img-sm"></div>
                <figcaption class="info"> <a href="#" class="title text-dark" data-abc="true">${
                  prod.name
                }</a>
                </figcaption>
            </figure>
        </td>
        <td> <input class="mt-4 w-75 text-center" id="count" disabled type="number" value="${
          prod.count
        }"/> </td>
        <td>
            <div class="mt-4 price-wrap"> <span class="price">${
              prod.price * prodCount
            }</span><span>$</span> </div>
        </td>
        <td class="text-right d-none d-md-block"> <a href="" class="mt-3 btn btn-danger remove-prod" data-abc="true"> Remove</a> </td>
    </tr>
        `;
    });
    tbody.innerHTML = data;
  }
}

Basket();

let removeAll = document.querySelector("#remove-all");

removeAll.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});

let removeItems = document.querySelectorAll(".remove-prod");

removeItems.forEach((removeItem) => {
  removeItem.addEventListener("click", (e) => {
    e.preventDefault();
    let removeItemName =
      removeItem.parentElement.parentElement.querySelector(".title").innerText;
    let countProd =
      removeItem.parentElement.parentElement.querySelector("#count");
    prods.map((prod) => {
      if (prod.name == removeItemName) {
        if (prod.count > 1) {
          prod.count--;
          countProd.value = prod.count;
          window.location.reload();
          localStorage.setItem("basket",JSON.stringify(prods))
        } else {
          const item = prods.filter((prod) => prod.name !== removeItemName);
          localStorage.setItem("basket", JSON.stringify(item));
          window.location.reload();
        }
      }
    });
  });
});

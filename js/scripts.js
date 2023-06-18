"use strict";

let products = [
  {
    id: 1,
    img: "/assets/img-1.webp",
    name: "Pull & Bear Kadın Kısa kollu Hiroshigue t-shirt'ü 04230358",
    price: 37,
    count:1
  },
  {
    id: 2,
    img: "/assets/img-2.webp",
    name: "Pull & Bear Erkek Parça boyalı çizgili t-shirt 04239512",
    price: 23,
    count:1
  },
  {
    id: 3,
    img: "/assets/img-3.webp",
    name: "Pull & Bear Vazo Grafik Baskılı T-shirt 08230302",
    price: 35,
    count:1
  },
  {
    id: 4,
    img: "/assets/img-4.webp",
    name: "Pull & Bear Erkek Kısa kollu oversize t-shirt 04239500",
    price: 35,
    count:1
  },
  {
    id: 5,
    img: "/assets/img-5.jpeg",
    name: "Pull & Bear Kadın Overloklu grafik t-shirt 04230389",
    price: 23,
    count:1
  },
  {
    id: 6,
    img: "/assets/img-6.webp",
    name: "Pull & Bear Erkek İşlemeli kısa kollu t-shirt 04230547",
    price: 34,
    count:1
  },
  {
    id: 7,
    img: "/assets/img-7.webp",
    name: "Pull & Bear Kadın Kısa kollu oversize t-shirt 08241349",
    price: 21,
    count:1
  },
  {
    id: 8,
    img: "/assets/img-8.webp",
    name: "Pull & Bear Erkek Kısa kollu kurbağa desenli t-shirt 07241500",
    price: 29,
    count:1
  },
];

let img = document.querySelector("#prod-img");
let name = document.querySelector("#prod-name");
let price = document.querySelector("#prod-price");
let all_prod = document.querySelector(".all-prod");

let data = "";

let prods = [];

document.addEventListener("DOMContentLoaded", getLocal());

function Products() {
  products.map((item) => {
    data += `
        <div class="col mb-5" id="prod-div">
                            <div class="card h-100" id="${item.id}">
                                <!-- Product image-->
                                <img class="card-img-top" id="prod-img" src="${item.img}" alt="..." />
                                <!-- Product details-->
                                <div class="card-body p-4">
                                    <div class="text-center">
                                        <!-- Product name-->
                                        <h5 class="fw-bolder" id="prod-name">${item.name}</h5>
                                        <!-- Product price-->
                                        <span>$</span><span id="prod-price">${item.price}</span>
                                    </div>
                                </div>
                                <!-- Product actions-->
                                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" id="addCards" href="#">Add To Card</a></div>
                                </div>
                            </div>
                        </div>
        `;
    all_prod.innerHTML = data;
  });
}
Products();

let addToCards = document.querySelectorAll("#addCards");

for (let addToCard of addToCards) {
  addToCard.addEventListener("click", (e) => {
    e.preventDefault()
    let id = addToCard.parentElement.parentElement.parentElement.id;
    let image =
      addToCard.parentElement.parentElement.parentElement.firstElementChild.src;
    let name =
      addToCard.parentElement.parentElement.parentElement.firstElementChild
        .nextElementSibling.firstElementChild.firstElementChild.textContent;
    let price =
      addToCard.parentElement.parentElement.parentElement.firstElementChild
        .nextElementSibling.firstElementChild.lastElementChild.textContent;

        console.log(price);

        let prodExist=prods.find(x=>x.id===id);
        if(prodExist===undefined){
            prods.push({
              id: id,
              image: image,
              name: name,
              price: price,
              count:1
            });
        }else{
            prodExist.count+=1;
        }
    setLocal();
    getLocal();
  });
}

function setLocal() {
  localStorage.setItem("basket", JSON.stringify(prods));
}

function getLocal() {
  let basketProd = JSON.parse(localStorage.getItem("basket"));
  prods = basketProd || [];
  let count = document.querySelector("#count");
  count.innerHTML = prods.length;
}

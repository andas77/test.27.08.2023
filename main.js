const items = document.querySelector(".items");
const btns_category = document.querySelectorAll(".btn_category");
const items_title = document.querySelector(".items_title");
const badge_count = document.querySelector(".badge_count");
const card_items = document.querySelector(".card_items");
const btn_signin = document.querySelector(".btn_signin");
const modal_window = document.querySelector(".modal_window");
const btn_closeModal = document.querySelector(".btn_closeModal");
const input_login = document.querySelector(".input_login");
const input_pass = document.querySelector(".input_pass");
const error = document.querySelector(".error");
const hello_user = document.querySelector(".hello_user");

const users = [{ name: "John", login: "qw", password: "12" }];

function displayCards(array) {
  let result = [];

  for (let i = 0; i < array.length; i++) {
    result.push(`<div class="item" id="${array[i].id}">
        <img src="./image/card/${array[i].id}.jpg" alt="" class="item_image" />
        ${
          array[i].hot === true
            ? `<img src="./image/flame.svg" class="flame" alt="" />`
            : ""
        }
        <div class="item_content">
          <p class="item_title">${array[i].title}</p>
          <p class="item_weight">
            Вес:
            <span class="weight">${array[i].weight} г</span>
          </p>
          <p class="item_weight">
            Тип:
            <span class="weight">${array[i].type}</span>
          </p>
          <div class="price_buy">
            <p class="item_price">${array[i].price} тнг</p>
            <button class="item_buy" onclick="sushiBuy('${
              array[i].id
            }')">Заказать</button>
          </div>
        </div>
      </div>`);
  }
  return result;
}

const sushiRes = [];

for (let i = 0; i < sushi.length; i++) {
  if (sushi[i].hot === true) {
    sushiRes.push(sushi[i]);
  }
}

let sushiCards = displayCards(sushiRes);

items.innerHTML = sushiCards.join("");

for (let i = 0; i < btns_category.length; i++) {
  const btn = btns_category[i];

  btn.addEventListener("click", function (event) {
    btns_category.forEach(function (elem) {
      elem.classList.remove("active_category");
    });

    btn.classList.add("active_category");
    const typeSushi = event.target.innerHTML;
    items_title.innerHTML = typeSushi;

    if (typeSushi === "Горячие предложения") {
      const sushiRes = [];

      for (let i = 0; i < sushi.length; i++) {
        if (sushi[i].hot === true) {
          sushiRes.push(sushi[i]);
        }
      }

      let sushiCards = displayCards(sushiRes);

      items.innerHTML = sushiCards.join("");
      return;
    }
    const typeArr = [];
    for (let i = 0; i < sushi.length; i++) {
      if (sushi[i].type === typeSushi) {
        typeArr.push(sushi[i]);
      }
    }
    let sushiCards = displayCards(typeArr);

    items.innerHTML = sushiCards.join("");
  });
}

// Card

let ids = [];

function sushiBuy(itemId) {
  let item = null;

  badge_count.innerHTML = ids.length + 1;

  for (let i = 0; i < sushi.length; i++) {
    if (sushi[i].id === itemId) {
      item = sushi[i];
    }
  }

  ids.push(item.id);

  let object = {};
  for (const elem of ids) {
    object[elem] = object[elem] ? object[elem] + 1 : 1;
  }

  const buyCards = displayCard(object);
  card_items.innerHTML = buyCards.join("");
}

function displayCard(array) {
  const result = [];

  for (const key in array) {
    for (let i = 0; i < sushi.length; i++) {
      if (sushi[i].id === key) {
        result.push(`<div class="card_item">
          <div class="card_info">
            <img src="./image/card/${
              sushi[i].id
            }.jpg" alt="" class="card_image" />
            <div class="info">
              <p class="card_name">${sushi[i].title}</p>
              <p class="card_weigth">
                Вес: <span class="card_weigth_count">${sushi[i].weight}</span> г
              </p>
            </div>
          </div>
          <div class="count_price">
            <p class="card_count">${array[key]}</p>
            <p class="card_x">X</p>
            <p class="card_price">${sushi[i].price * array[key]}</p>
            <button class="remove_btn" onclick="removeToCard('${
              sushi[i].id
            }')">X</button>
          </div>
        </div>`);
      }
    }
  }

  return result;
}

function removeToCard(id) {
  let result = [];

  for (let i = 0; i < ids.length; i++) {
    if (ids[i] !== id) {
      result.push(ids[i]);
    }
  }

  ids = result;

  let object = {};
  for (const elem of ids) {
    object[elem] = object[elem] ? object[elem] + 1 : 1;
  }

  badge_count.innerHTML = ids.length;

  const buyCards = displayCard(object);
  card_items.innerHTML = buyCards.join("");
}

let login = "";
let password = "";
let isAuth = false;

btn_signin.addEventListener("click", function () {
  if (isAuth === false) {
    modal_window.classList.remove("none_modal");
  } else {
    isAuth = false;
    btn_signin.innerHTML = "Вход";
    hello_user.innerHTML = "";
  }
});

btn_closeModal.addEventListener("click", function () {
  for (let i = 0; i < users.length; i++) {
    if (users[i].login === login && users[i].password === password) {
      modal_window.classList.add("none_modal");
      hello_user.innerHTML = `Привет ${users[i].name}`;
      btn_signin.innerHTML = "Выход";
      isAuth = true;
    } else {
      error.innerHTML = "Неправильный логин или пароль";
      setTimeout(function () {
        error.innerHTML = "";
      }, 2000);
    }
  }
});

document.addEventListener("click", function (event) {
  if (event.target.classList[0] === "modal_window") {
    modal_window.classList.add("none_modal");
  }
});

input_login.addEventListener("input", function (e) {
  login = e.target.value;
});

input_pass.addEventListener("input", function (e) {
  password = e.target.value;
});

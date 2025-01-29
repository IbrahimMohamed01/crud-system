let price = document.getElementById("price");
let title = document.getElementById("title");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let search = document.getElementById("search");
let create = document.getElementById("create");
let tbody = document.getElementById("tbody");

let mode = "create";
let tmp;
function gettotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}
create.onclick = function () {
  let objectproduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value !== "" &&
    price.value !== "" &&
    category.value !== "" &&
    count.value < 100
  ) {
    if (mode === "create") {
      if (objectproduct.count > 1) {
        for (let i = 0; i < objectproduct.count; i++) {
          datapro.push(objectproduct);
        }
      } else {
        datapro.push(objectproduct);
      }
    } else {
      datapro[tmp] = objectproduct;
      create.innerHTML = "create";
      count.style.display = "block";
      mode = "create";
      read();
    }
    clear();
  }
  localStorage.setItem("product", JSON.stringify(datapro));
  read();
};
function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  count.value = "";
  discount.value = "";
  category.value = "";
  total.innerHTML = "";
}

read();
function read() {
  gettotal();
  let content = "";
  for (let i = 0; i < datapro.length; i++) {
    content += `<tr>
    <td>${[i + 1]}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td ><button id="update" onclick="updatedata(${[i]})" >update</button></td>
    <td><button id="delete" onclick="deleteitem(${i})">delete</button></td>
    </tr>`;
  }
  tbody.innerHTML = content;
  let btn_delete = document.getElementById("deleteAll");
  if (datapro.length > 0) {
    btn_delete.innerHTML = `
<button onclick="deleteAll()">
  Delete All (${datapro.length})
</button>
  `;
  } else {
    btn_delete.innerHTML = "";
  }
}
function deleteitem(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  read();
}

function deleteAll() {
  localStorage.clear();
  datapro.splice(0);
  read();
}

function updatedata(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  category.value = datapro[i].category;
  create.innerHTML = "Update";
  gettotal();
  count.style.display = "none";
  mode = "update";
  tmp = [i];
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchmode = "title";
function searchdata(id) {
  let searchinput = document.getElementById("search");
  if (id === "btn-title") {
    searchmode = "title";
  } else {
    searchmode = "category";
  }
  searchinput.focus();
  read();
  searchinput.placeholder = "value by " + searchmode;
}

// let searchmood = "title";

// function searchdata(id) {
//   let search = document.getElementById("search");
//   if (id === "btn-title") {
//     searchmood = "title";
//   } else {
//     searchmood = "category";
//   }
//   search.focus();
//   search.placeholder = "search " + searchmood;
//   read();
//   search.value = "";
// }

function searchitem(value) {
  let content = "";
  if (searchmode == "title") {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].title.includes(value.toLowerCase())) {
        content += `<tr>
      <td>${[i + 1]}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].category}</td>
      <td ><button id="update" onclick="updatedata(${[
        i,
      ]})" >update</button></td>
      <td><button id="delete" onclick="deleteitem(${i})">delete</button></td>
      </tr>`;
      }
    }
  } else {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].category.includes(value.toLowerCase())) {
        content += `<tr>
      <td>${[i + 1]}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].category}</td>
      <td ><button id="update" onclick="updatedata(${[
        i,
      ]})" >update</button></td>
      <td><button id="delete" onclick="deleteitem(${i})">delete</button></td>
      </tr>`;
      }
    }
  }
  tbody.innerHTML = content;
}

// function searchitem(value) {
//   let content = "";
//   if (searchmood == "title") {
//     for (let i = 0; i < datapro.length; i++) {
//       if (datapro[i].title.includes(value.toLowerCase())) {
//         content += `<tr>
//     <td>${[i + 1]}</td>
//     <td>${datapro[i].title}</td>
//     <td>${datapro[i].price}</td>
//     <td>${datapro[i].taxes}</td>
//     <td>${datapro[i].ads}</td>
//     <td>${datapro[i].discount}</td>
//     <td>${datapro[i].total}</td>
//     <td>${datapro[i].count}</td>
//     <td>${datapro[i].category}</td>
//     <td ><button id="update" onclick="updatedata(${[i]})" >update</button></td>
//     <td><button id="delete" onclick="deleteitem(${i})">delete</button></td>
//     </tr>`;
//       }
//     }
//   } else {
//     for (let i = 0; i < datapro.length; i++) {
//       if (datapro[i].category.includes(value.toLowerCase())) {
//         content += `<tr>
//     <td>${[i + 1]}</td>
//     <td>${datapro[i].title}</td>
//     <td>${datapro[i].price}</td>
//     <td>${datapro[i].taxes}</td>
//     <td>${datapro[i].ads}</td>
//     <td>${datapro[i].discount}</td>
//     <td>${datapro[i].total}</td>
//     <td>${datapro[i].count}</td>
//     <td>${datapro[i].category}</td>
//     <td ><button id="update" onclick="updatedata(${[i]})" >update</button></td>
//     <td><button id="delete" onclick="deleteitem(${i})">delete</button></td>
//     </tr>`;
//       }
//     }
//   }
//   tbody.innerHTML = content;
// }

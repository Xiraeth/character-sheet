"use strict";

const addItemInput = document.querySelector("#addItemInput");
const addItemBtn = document.querySelector("#addItemBtn");
const inventoryList = document.querySelector("#inventoryList");

let inventoryArray = JSON.parse(localStorage.inventoryArray ?? "[]");

window.addEventListener("load", loadPageList);

addItemBtn.addEventListener("click", (e) => {
  const item = addItemInput.value.trim();
  if (item === "") return;

  const listItem = document.createElement("li");
  listItem.innerHTML = `${item}<i class="fa-solid fa-trash"></i>`;
  inventoryList.appendChild(listItem);

  inventoryArray.push(item);
  localStorage.setItem("inventoryArray", JSON.stringify(inventoryArray));

  const trashIcon = listItem.querySelector("i");
  attachEventListener(trashIcon);

  addItemInput.value = "";
});

function attachEventListener(element) {
  const li = element.closest("li");
  if (!li) return;

  element.addEventListener("click", () => {
    inventoryArray = inventoryArray.filter((item) => item !== li.textContent);
    localStorage.setItem("inventoryArray", JSON.stringify(inventoryArray));
    li.remove();
  });
}

function loadPageList() {
  if (inventoryArray.length > 0) {
    inventoryArray.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `${item}<i class="fa-solid fa-trash"></i>`;
      inventoryList.appendChild(listItem);

      const trashIcon = listItem.querySelector("i");
      attachEventListener(trashIcon);
    });
  }
}

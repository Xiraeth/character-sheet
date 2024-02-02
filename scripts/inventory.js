"use strict";

const addItemInput = document.querySelector("#addItemInput");
const addItemBtn = document.querySelector("#addItemBtn");
const inventoryList = document.querySelector("#inventoryList");

let inventoryArray = JSON.parse(localStorage.inventoryArray ?? "[]");

window.addEventListener("load", loadPageList);

addItemBtn.addEventListener("click", (e) => {
  const item = addItemInput.value.trim();
  if (item === "") return;

  const listItem = createListItem(item);
  inventoryList.appendChild(listItem);

  inventoryArray.push(item);
  localStorage.setItem("inventoryArray", JSON.stringify(inventoryArray));

  const trashIcon = listItem.querySelector("div .fa-trash");
  const editIcon = listItem.querySelector("div .fa-pen");
  attachEditEventListener(editIcon);
  attachDeleteEventListener(trashIcon);

  addItemInput.value = "";
});

function attachDeleteEventListener(element) {
  const li = element.closest("li");
  if (!li) return;

  element.addEventListener("click", () => {
    inventoryArray = inventoryArray.filter(
      (item) => item !== li.textContent.trim()
    );
    localStorage.setItem("inventoryArray", JSON.stringify(inventoryArray));
    li.remove();
  });
}

function attachEditEventListener(element) {
  const li = element.closest("li");
  if (!li) return;

  const spanEl = li.querySelector("span");
  let originalContent = spanEl.textContent;

  element.addEventListener("click", (e) => {
    spanEl.setAttribute("contenteditable", "true");

    // Move cursor to the end of the text content
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(spanEl);
    range.collapse(false); // collapse to the end
    selection.removeAllRanges();
    selection.addRange(range);

    spanEl.focus();

    spanEl.addEventListener("blur", () => {
      let editedContent = spanEl.textContent.trim();

      // Check if the content has changed
      if (originalContent !== editedContent) {
        // Update localStorage
        const index = Array.from(li.parentElement.children).indexOf(li);
        inventoryArray[index] = editedContent;
        localStorage.setItem("inventoryArray", JSON.stringify(inventoryArray));

        // Update span element
        originalContent = editedContent;
      }
      spanEl.setAttribute("contenteditable", "false");
    });
  });
}

function loadPageList() {
  if (inventoryArray.length > 0) {
    inventoryArray.forEach((item) => {
      const listItem = createListItem(item);
      inventoryList.appendChild(listItem);

      const trashIcon = listItem.querySelector("div .fa-trash");
      const editIcon = listItem.querySelector("div .fa-pen");
      attachEditEventListener(editIcon);
      attachDeleteEventListener(trashIcon);
    });
  }
}

function createListItem(item) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `<span>${item}</span>
    <div>
      <i class="fa-solid fa-pen"></i>
      <i class="fa-solid fa-trash"></i>
    </div>`;
  return listItem;
}

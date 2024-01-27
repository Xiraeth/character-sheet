"use strict";

const barsIcon = document.querySelector(".menuIcon i");
const xmarkIcon = document.querySelector(".leftNavbar i");
const menu = document.querySelector(".leftNavbar");
// const showMoreButton = document.querySelector(".fa-circle-chevron-down");

barsIcon.addEventListener("click", showMenu);
xmarkIcon.addEventListener("click", hideMenu);
// showMoreButton.addEventListener("click", toggleFullTable);

function showMenu() {
  menu.style.transform = "translateX(0)";
}

function hideMenu() {
  menu.style.transform = "translateX(-100px)";
}

// function toggleFullTable() {
//   const allHiddenRows = document.querySelectorAll(".initiallyHidden");

//   if (showMoreButton.classList.contains("fa-circle-chevron-up")) {
//     allHiddenRows.forEach((row) => {
//       row.classList.add("hidden");
//       showMoreButton.className = "fa-solid fa-circle-chevron-down";
//     });
//   } else {
//     allHiddenRows.forEach((row) => {
//       row.classList.remove("hidden");
//     });
//     showMoreButton.className = "fa-solid fa-circle-chevron-up";
//   }
// }

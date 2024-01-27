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

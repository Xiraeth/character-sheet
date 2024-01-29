"use strict";

const barsIcon = document.querySelector(".menuIcon i");
const xmarkIcon = document.querySelector(".leftNavbar i");
const menu = document.querySelector(".leftNavbar");

barsIcon.addEventListener("click", showMenu);
xmarkIcon.addEventListener("click", hideMenu);

function showMenu() {
  menu.style.transform = "translateX(0)";
}

function hideMenu() {
  menu.style.transform = "translateX(-100px)";
}

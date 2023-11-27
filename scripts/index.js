"use strict";

const stats = document.querySelector(".stats");
const barsIcon = document.querySelector(".menuIcon i");
const xmarkIcon = document.querySelector(".leftNavbar i");
const menu = document.querySelector(".leftNavbar");

let currentHP = document.querySelector("#HP div span"); /*
let = document.querySelector("");
let = document.querySelector("");
let = document.querySelector("");
let = document.querySelector("");
let = document.querySelector("");*/

stats.addEventListener("input", (e) => {
  getModifier(e.target);
});
barsIcon.addEventListener("click", showMenu);
xmarkIcon.addEventListener("click", hideMenu);
currentHP.addEventListener("input", () => {
  localStorage.setItem("HP", currentHP.textContent);
  console.log(localStorage.getItem("HP"));
});

function getModifier(abilityScoreElement) {
  let modifierSpan =
    abilityScoreElement.parentElement.querySelector(".modifier");

  let content = abilityScoreElement.textContent;
  let numericContent = content.replace(/\D/g, "");
  abilityScoreElement.textContent = numericContent;

  if (abilityScoreElement.textContent == "") {
    modifierSpan.textContent = "(...)";
    return;
  }

  let abilityScore = parseInt(numericContent);
  let modifier = Math.floor((abilityScore - 10) / 2);

  modifierSpan.textContent = `(${modifier >= 0 ? "+" : ""}${modifier})`;
}

function showMenu() {
  menu.style.transform = "translateX(0)";
}

function hideMenu() {
  menu.style.transform = "translateX(-100px)";
}

function loadPage() {
  hipoints = localStorage.hitpoints;
}

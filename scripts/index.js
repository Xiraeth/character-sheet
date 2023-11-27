"use strict";
// localStorage.clear();

const stats = document.querySelector(".stats");
const barsIcon = document.querySelector(".menuIcon i");
const xmarkIcon = document.querySelector(".leftNavbar i");
const menu = document.querySelector(".leftNavbar");

const currentHP = document.querySelector("#currentHPdiv span");
const maxHP = document.querySelector("#maximumHPdiv span");
const tempHP = document.querySelector("#tempHPdiv span");

window.addEventListener("load", loadPage);

stats.addEventListener("input", (e) => {
  getModifier(e.target);
});

barsIcon.addEventListener("click", showMenu);
xmarkIcon.addEventListener("click", hideMenu);

currentHP.addEventListener("input", () => {
  localStorage.setItem("currentHP", currentHP.textContent);
});

maxHP.addEventListener("input", () => {
  localStorage.setItem("maxHP", maxHP.textContent);
});

tempHP.addEventListener("input", () => {
  localStorage.setItem("tempHP", tempHP.textContent);
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
  currentHP.textContent = localStorage.currentHP;
  maxHP.textContent = localStorage.maxHP;
  tempHP.textContent = localStorage.tempHP;
}

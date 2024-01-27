"use strict";

const stats = document.querySelector(".stats");
const barsIcon = document.querySelector(".menuIcon i");
const xmarkIcon = document.querySelector(".leftNavbar i");
const menu = document.querySelector(".leftNavbar");

stats.addEventListener("input", (e) => {
  getModifier(e.target);
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
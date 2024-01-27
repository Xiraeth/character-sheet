"use strict";

const barsIcon = document.querySelector(".menuIcon i");
const xmarkIcon = document.querySelector(".leftNavbar i");
const menu = document.querySelector(".leftNavbar");
const spellSaveDC = document.querySelector("#spellSaveDC > span");
const spellAtkBns = document.querySelector("#spellAtkBns > span");
const firstLvSpellSlots = document.querySelector(
  ".firstLevelSpells > .spellSlots > .ss > span"
);
const firstLvExpanded = document.querySelector(
  ".firstLevelSpells > .spellSlots > .expended > span"
);
const secondLvSpellSlots = document.querySelector(
  ".secondLevelSpells > .spellSlots > .ss > span"
);
const secondLvExpanded = document.querySelector(
  ".secondLevelSpells > .spellSlots > .expended > span"
);

window.addEventListener("load", function (e) {
  spellSaveDC.textContent = localStorage.spellSaveDC;
  spellAtkBns.textContent = localStorage.spellAtkBns;
  firstLvSpellSlots.textContent = Number(
    localStorage.firstLvSpellSlots
  ).toLocaleString();
  firstLvExpanded.textContent = Number(
    localStorage.firstLvExpanded
  ).toLocaleString();
  secondLvSpellSlots.textContent = Number(
    localStorage.secondLvSpellSlots
  ).toLocaleString();
  secondLvExpanded.textContent = Number(
    localStorage.secondLvExpanded
  ).toLocaleString();
});

firstLvSpellSlots.addEventListener("input", () => {
  localStorage.setItem("firstLvSpellSlots", firstLvSpellSlots.textContent);
});

firstLvExpanded.addEventListener("input", () => {
  localStorage.setItem("firstLvExpanded", firstLvExpanded.textContent);
});

secondLvSpellSlots.addEventListener("input", () => {
  localStorage.setItem("secondLvSpellSlots", secondLvSpellSlots.textContent);
});

secondLvExpanded.addEventListener("input", () => {
  localStorage.setItem("secondLvExpanded", secondLvExpanded.textContent);
});

spellSaveDC.addEventListener("input", (e) => {
  localStorage.setItem("spellSaveDC", spellSaveDC.textContent);
});

spellAtkBns.addEventListener("input", () => {
  localStorage.setItem("spellAtkBns", spellAtkBns.textContent);
});

// UI handling code
barsIcon.addEventListener("click", showMenu);
xmarkIcon.addEventListener("click", hideMenu);

function showMenu() {
  menu.style.transform = "translateX(0)";
}

function hideMenu() {
  menu.style.transform = "translateX(-100px)";
}

"use strict";

const spellSaveDC = document.querySelector("#spellSaveDC > span");
const spellAtkBns = document.querySelector("#spellAtkBns > span");
const allTrashCans = document.querySelectorAll(".fa-trash");
const firstLvSpellSlots = document.querySelector(
  ".firstLevelSpells > .spellSlots > .ss > span"
);
const firstLvExpended = document.querySelector(
  ".firstLevelSpells > .spellSlots > .expended > span"
);
const secondLvSpellSlots = document.querySelector(
  ".secondLevelSpells > .spellSlots > .ss > span"
);
const secondLvExpended = document.querySelector(
  ".secondLevelSpells > .spellSlots > .expended > span"
);

window.addEventListener("load", function (e) {
  spellSaveDC.textContent = localStorage.spellSaveDC;
  spellAtkBns.textContent = localStorage.spellAtkBns;
  firstLvSpellSlots.textContent = Number(
    localStorage.firstLvSpellSlots
  ).toLocaleString();
  firstLvExpended.textContent = Number(
    localStorage.firstLvExpended
  ).toLocaleString();
  secondLvSpellSlots.textContent = Number(
    localStorage.secondLvSpellSlots
  ).toLocaleString();
  secondLvExpended.textContent = Number(
    localStorage.secondLvExpended
  ).toLocaleString();
});

allTrashCans.forEach((trashCan) => {
  trashCan.addEventListener("click", (e) => {
    e.preventDefault();
    const li = e.target.closest("li");
    li.remove();
  });
});

firstLvSpellSlots.addEventListener("input", () => {
  localStorage.setItem("firstLvSpellSlots", firstLvSpellSlots.textContent);
});

firstLvExpended.addEventListener("input", () => {
  localStorage.setItem("firstLvExpended", firstLvExpended.textContent);
});

secondLvSpellSlots.addEventListener("input", () => {
  localStorage.setItem("secondLvSpellSlots", secondLvSpellSlots.textContent);
});

secondLvExpended.addEventListener("input", () => {
  localStorage.setItem("secondLvExpended", secondLvExpended.textContent);
});

spellSaveDC.addEventListener("input", (e) => {
  localStorage.setItem("spellSaveDC", spellSaveDC.textContent);
});

spellAtkBns.addEventListener("input", () => {
  localStorage.setItem("spellAtkBns", spellAtkBns.textContent);
});

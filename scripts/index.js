"use strict";
import {
  loadPage,
  getAbilityScoreModifier,
  calculateSkillModifiers,
  calculateSavingThrowModifiers,
  takeDamage,
  toggleProficiency,
  toggleSaveProficiency,
  layOnHandsHeal,
  toggleBackgroundColor,
  updateLayOnHandsValues,
  toggleAuraBonus,
  filterNonNumbers,
  longRest,
  calcInitiative,
} from "./functions.js";

let previousValue;
let previousHP;

const stats = document.querySelector(".stats");
const allAbilityElements = document.querySelectorAll(".stats > div");
const takeDamageBtn = document.querySelector("#takeDamage > button");
const profBonusSpan = document.querySelector("#skillsContainer > h1 > span");
const menuCharName = document.querySelector("#menuCharName");
const skillsContainer = document.querySelector("#skills");
const savingThrowContainer = document.querySelector("#savingThrows");

const charDetails = document.querySelector("#character-details");
const charName = document.querySelector("#character-name");
const charRace = document.querySelector("#race");
const charClass = document.querySelector("#class");
const charBackground = document.querySelector("#background");
const charLevel = document.querySelector("#character-details > #level > span");
const charAlignment = document.querySelector("#alignment");

const currentHPel = document.querySelector("#currentHPdiv span");
const maxHPel = document.querySelector("#maximumHPdiv span");
const tempHPel = document.querySelector("#tempHPdiv span");
const armorClassEl = document.querySelector("#armorClass div:first-child");
const initiativeEl = document.querySelector("#initiative div:first-child");
const speedEl = document.querySelector("#speed div:first-child");

const layOnHandsForm = document.querySelector(".layOnHandsForm");
const layOnHandsRemainingEl = document.querySelector(
  "#layOnHandsRemainingValue"
);

const aopCheck = document.querySelector("#auraOfProtection");
const longRestBtn = document.querySelector("#longRestButton");

// Load values on page load
window.addEventListener("load", (e) => {
  loadPage();   
  allAbilityElements.forEach((el) => {
    const abilityScoreElement = el.querySelector(".abilityScore");
    getAbilityScoreModifier(abilityScoreElement);
  });
  calculateSkillModifiers();
  calculateSavingThrowModifiers();
});

takeDamageBtn.addEventListener("click", takeDamage);

charDetails.addEventListener("input", (e) => {
  const span = e.target.closest("span");
  toggleBackgroundColor(span);
});

charName.addEventListener("input", (e) => {
  localStorage.setItem("charName", charName.textContent);
  menuCharName.textContent = localStorage.charName;
  toggleBackgroundColor(charName);
});

charRace.addEventListener("input", () => {
  localStorage.setItem("charRace", charRace.textContent);
});
charClass.addEventListener("input", () => {
  localStorage.setItem("charClass", charClass.textContent);
});
charBackground.addEventListener("input", () => {
  localStorage.setItem("charBackground", charBackground.textContent);
});
charLevel.addEventListener("input", (e) => {
  filterNonNumbers(e);
  localStorage.setItem("charLevel", charLevel.textContent);
  updateLayOnHandsValues();
});
charAlignment.addEventListener("input", () => {
  localStorage.setItem("charAlignment", charAlignment.textContent);
});

layOnHandsForm.addEventListener("submit", layOnHandsHeal);

armorClassEl.addEventListener("input", (e) => {
  filterNonNumbers(e);
  toggleBackgroundColor(armorClassEl);
  localStorage.armorClass = armorClassEl.textContent;
});

initiativeEl.addEventListener("input", (e) => {
  filterNonNumbers(e);
  localStorage.initiative = initiativeEl.textContent;
  toggleBackgroundColor(initiativeEl);
});

speedEl.addEventListener("input", (e) => {
  filterNonNumbers(e);
  toggleBackgroundColor(speedEl);
  localStorage.speed = speedEl.textContent;
});

stats.addEventListener("input", (e) => {
  filterNonNumbers(e);
  getAbilityScoreModifier(e.target);
  toggleBackgroundColor(e.target);
  const ability = e.target.parentElement.parentElement.querySelector("b");
  localStorage.setItem(
    `${ability.textContent.toLowerCase()}`,
    e.target.textContent
  );
  calculateSkillModifiers();
  calculateSavingThrowModifiers();
  const targetAbility = e.target.parentElement.parentElement;
  console.log(targetAbility);
  if (targetAbility.classList.contains("dex")) calcInitiative();
});

profBonusSpan.addEventListener("input", (e) => {
  filterNonNumbers(e);
  localStorage.profBonus = profBonusSpan.textContent;
  toggleBackgroundColor(profBonusSpan);
  calculateSkillModifiers();
  calculateSavingThrowModifiers();
});

currentHPel.addEventListener("focus", () => {
  previousHP = Number(currentHPel.textContent);
});

currentHPel.addEventListener("input", (e) => {
  filterNonNumbers(e);
  localStorage.setItem("currentHP", currentHPel.textContent);
  toggleBackgroundColor(currentHPel);
});

currentHPel.addEventListener("blur", () => {
  if (Number(currentHPel.textContent) > Number(localStorage.maxHP)) {
    currentHPel.textContent = previousHP;
    localStorage.currentHP = previousHP;
  }
});

maxHPel.addEventListener("input", (e) => {
  filterNonNumbers(e);
  localStorage.setItem("maxHP", maxHPel.textContent);
  toggleBackgroundColor(maxHPel);
});

tempHPel.addEventListener("input", (e) => {
  filterNonNumbers(e);
  localStorage.setItem("tempHP", tempHPel.textContent);
  toggleBackgroundColor(tempHPel);
});

layOnHandsRemainingEl.addEventListener("input", (e) => {
  filterNonNumbers(e);
  const remainingHeal = layOnHandsRemainingEl.textContent;
  localStorage.setItem("layOnHandsRemaining", remainingHeal);
});

layOnHandsRemainingEl.addEventListener("focus", () => {
  previousValue = layOnHandsRemainingEl.textContent;
});

layOnHandsRemainingEl.addEventListener("blur", () => {
  if (layOnHandsRemainingEl.textContent > localStorage.charLevel * 5) {
    layOnHandsRemainingEl.textContent = previousValue;
    localStorage.setItem("layOnHandsRemaining", previousValue);
  }
});

aopCheck.addEventListener("click", (e) => {
  if (localStorage.auraBonusActive === "false") {
    e.target.className = "fa-solid fa-square-check";
  } else {
    e.target.className = "fa-regular fa-square";
  }
  toggleAuraBonus();
  calculateSavingThrowModifiers();
});

skillsContainer.addEventListener("click", toggleProficiency);
savingThrowContainer.addEventListener("click", toggleSaveProficiency);
longRestBtn.addEventListener("click", longRest);

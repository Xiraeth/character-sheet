"use strict";
import {
  loadPage,
  getAbilityScoreModifier,
  calculateSkillModifiers,
  takeDamage,
  toggleProficiency,
  layOnHandsHeal,
  toggleBackgroundColor,
  updateLayOnHandsValues,
} from "./functions.js";

const stats = document.querySelector(".stats");
const allAbilityElements = document.querySelectorAll(".stats > div");
const takeDamageBtn = document.querySelector("#takeDamage > button");
const profBonusSpan = document.querySelector("#skillsContainer > h1 > span");
const menuCharName = document.querySelector("#menuCharName");
const skillsContainer = document.querySelector("#skills");

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

window.addEventListener("load", (e) => {
  loadPage();
  allAbilityElements.forEach((el) => {
    const abilityScoreElement = el.querySelector(".abilityScore");
    getAbilityScoreModifier(abilityScoreElement);
  });
  calculateSkillModifiers();
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
charLevel.addEventListener("input", () => {
  localStorage.setItem("charLevel", charLevel.textContent);
  updateLayOnHandsValues();
});
charAlignment.addEventListener("input", () => {
  localStorage.setItem("charAlignment", charAlignment.textContent);
});

layOnHandsForm.addEventListener("submit", layOnHandsHeal);

armorClassEl.addEventListener("input", () => {
  toggleBackgroundColor(armorClassEl);
  localStorage.armorClass = armorClassEl.textContent;
});

initiativeEl.addEventListener("input", () => {
  localStorage.initiative = initiativeEl.textContent;
  toggleBackgroundColor(initiativeEl);
});

speedEl.addEventListener("input", () => {
  toggleBackgroundColor(speedEl);
  localStorage.speed = speedEl.textContent;
});

stats.addEventListener("input", (e) => {
  getAbilityScoreModifier(e.target);
  toggleBackgroundColor(e.target);
  const ability = e.target.parentElement.parentElement.querySelector("b");
  localStorage.setItem(`${ability.textContent}`, e.target.textContent);
  calculateSkillModifiers();
});

profBonusSpan.addEventListener("input", () => {
  localStorage.profBonus = profBonusSpan.textContent;
  toggleBackgroundColor(profBonusSpan);
  calculateSkillModifiers();
});

currentHPel.addEventListener("input", () => {
  localStorage.setItem("currentHP", currentHPel.textContent);
  toggleBackgroundColor(currentHPel);
});

maxHPel.addEventListener("input", () => {
  localStorage.setItem("maxHP", maxHPel.textContent);
  toggleBackgroundColor(maxHPel);
});

tempHPel.addEventListener("input", () => {
  localStorage.setItem("tempHP", tempHPel.textContent);
  toggleBackgroundColor(tempHPel);
});

skillsContainer.addEventListener("click", (e) => toggleProficiency(e));

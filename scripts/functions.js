"use strict";

const MAIN_TEXT_COLOR = "rgb(230, 230, 250)";
// const SECONDARY_TEXT_COLOR = "#dd60dd";

const allAbilityElements = document.querySelectorAll(".stats > div");
const menu = document.querySelector(".leftNavbar");
const takeDamageInput = document.querySelector("#takeDamage > input");
const profBonusSpan = document.querySelector("#skillsContainer > h1 > span");
const menuCharName = document.querySelector("#menuCharName");

const charDetails = document.querySelector("#character-details");
const charDetailsSpanEls = charDetails.querySelectorAll("div > span");
const charName = document.querySelector("#character-name");
const charRace = document.querySelector("#race");
const charClass = document.querySelector("#class");
const charBackground = document.querySelector("#background");
const charLevel = document.querySelector("#classLevel");
const charAlignment = document.querySelector("#alignment");

const currentHPel = document.querySelector("#currentHPdiv span");
const maxHPel = document.querySelector("#maximumHPdiv span");
const tempHPel = document.querySelector("#tempHPdiv span");
const armorClassEl = document.querySelector("#armorClass div:first-child");
const initiativeEl = document.querySelector("#initiative div:first-child");
const speedEl = document.querySelector("#speed div:first-child");

const layOnHandsInput = document.querySelector("#layOnHandsInput");
const layOnHandsMaxEl = document.querySelector("#layOnHandsMaxValue");
const layOnHandsRemainingEl = document.querySelector(
  "#layOnHandsRemainingValue"
);

let proficiencies = JSON.parse(localStorage.profsArray ?? "[]");

export function generateBorder(element) {
  if (element.textContent === "") {
    element.style.border = "1px solid rgba(230, 230, 250, 0.5)";
  } else {
    element.style.border = "none";
  }
}

export function checkForBorder(element) {
  if (element.textContent === "") {
    element.style.border = "1px solid rgba(230, 230, 250, 0.5)";
  } else {
    element.style.border = "none";
  }
}

export function showMenu() {
  menu.style.transform = "translateX(0)";
}

export function hideMenu() {
  menu.style.transform = "translateX(-100px)";
}

export function flashColor(el, color) {
  el.style.color = color;
  setTimeout(function () {
    el.style.color = MAIN_TEXT_COLOR;
  }, 250);
}

export function takeDamage() {
  if (takeDamageInput.value == "") return;

  let damage = Number(takeDamageInput.value);
  let tempHP = localStorage.tempHP;

  if (tempHP > 0) {
    if (tempHP >= damage) {
      tempHPel.textContent -= damage;
      damage = 0; // Damage is absorbed by temporary hit points
    } else {
      damage -= tempHP;
      tempHPel.textContent = 0; // Temporary hit points are fully used up
    }

    localStorage.tempHP = tempHPel.textContent;
  }

  currentHPel.textContent = Number(currentHPel.textContent) - damage;

  if (Number(currentHPel.textContent) > Number(localStorage.maxHP)) {
    currentHPel.textContent = localStorage.maxHP;
  } else if (
    Number(currentHPel.textContent) < Number(-1 * localStorage.maxHP)
  ) {
    currentHPel.textContent = -localStorage.maxHP;
  }

  if (damage < 0) {
    flashColor(currentHPel, "springgreen");
  } else if (damage > 0) {
    flashColor(currentHPel, "crimson");
  }

  takeDamageInput.value = "";
  localStorage.currentHP = currentHPel.textContent;
}

export function getAbilityScoreModifier(abilityScoreElement) {
  let modifierSpan =
    abilityScoreElement.parentElement.querySelector(".modifier");

  let content = abilityScoreElement.textContent;
  let numericContent = content.replace(/\D/g, "");
  abilityScoreElement.textContent = numericContent;

  if (abilityScoreElement.textContent == "") {
    modifierSpan.textContent = "(-)";
    return;
  }

  let abilityScore = parseInt(numericContent);
  let modifier = Math.floor((abilityScore - 10) / 2);

  modifierSpan.textContent = `(${modifier >= 0 ? "+" : ""}${modifier})`;
}

export function calculateSkillModifiers() {
  const allSkills = document.querySelectorAll("#skills > div");

  allSkills.forEach((skill) => {
    const skillNameEl = skill.querySelector("p");
    const skillModifierEl = skill.querySelector("span");

    const abilityName = skillNameEl.dataset.ability;

    const statDiv = document.querySelector(`.stats > .${abilityName}`);
    const abilityModifier = Number(
      statDiv.querySelector(`div > .modifier`).textContent.slice(1, -1)
    );

    if (isNaN(abilityModifier)) {
      skillModifierEl.textContent = "-";
      return;
    }

    if (proficiencies.includes(skillNameEl.textContent)) {
      skillModifierEl.textContent =
        Number(profBonusSpan.textContent) + abilityModifier;
      skillNameEl.classList.add("profColor");
    } else {
      skillModifierEl.textContent = abilityModifier;
    }
  });
}

export function toggleProficiency(e) {
  // class='profColor';
  const targetDiv = e.target.closest("div");
  if (!targetDiv) return;

  const abilityNamePara = targetDiv.querySelector("p");
  const abilityName = abilityNamePara.textContent;
  if (proficiencies.includes(abilityName)) {
    proficiencies = proficiencies.filter((prof) => prof !== abilityName);
  } else {
    proficiencies.push(abilityName);
  }
  abilityNamePara.classList.toggle("profColor");
  localStorage.setItem("profsArray", JSON.stringify(proficiencies));

  calculateSkillModifiers();
  console.log(JSON.parse(localStorage.profsArray));
}

// localStorage.layOnHandsRemaining = 10;
export function layOnHandsHeal(e) {
  e.preventDefault();
  const healAmount = Number(layOnHandsInput.value);

  if (healAmount > Number(localStorage.layOnHandsRemaining)) {
    flashColor(layOnHandsRemainingEl, "red");
    return;
  }
  if (healAmount + Number(currentHPel.textContent) > localStorage.maxHP) return;

  currentHPel.textContent = Number(currentHPel.textContent) + healAmount;
  layOnHandsRemainingEl.textContent -= healAmount;
  layOnHandsInput.value = "";

  localStorage.layOnHandsRemaining = layOnHandsRemainingEl.textContent;
  localStorage.currentHP = currentHPel.textContent;
}

export function loadPage() {
  menuCharName.textContent = localStorage.charName;
  charName.textContent = localStorage.charName;
  charRace.textContent = localStorage.charRace;
  charClass.textContent = localStorage.charClass;
  charBackground.textContent = localStorage.charBackground;
  charAlignment.textContent = localStorage.charAlignment;
  charLevel.textContent = localStorage.charLevel;
  speedEl.textContent = localStorage.speed;
  initiativeEl.textContent = localStorage.initiative;
  armorClassEl.textContent = localStorage.armorClass;
  currentHPel.textContent = localStorage.currentHP;
  maxHPel.textContent = localStorage.maxHP;
  tempHPel.textContent = localStorage.tempHP;
  layOnHandsRemainingEl.textContent = localStorage.layOnHandsRemaining || 30;
  layOnHandsInput.max = localStorage.charLevel * 5;
  layOnHandsMaxEl.textContent = localStorage.charLevel * 5;
  allAbilityElements.forEach((el) => {
    const ability = el.querySelector("b").textContent;
    const spanEl = el.querySelector(".abilityScore");
    spanEl.textContent = localStorage.getItem(ability);
  });
  profBonusSpan.textContent = localStorage.profBonus;
  charDetailsSpanEls.forEach((span) => {
    checkForBorder(span);
  });
}

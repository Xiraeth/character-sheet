"use strict";

const MAIN_TEXT_COLOR = "rgb(230, 230, 250)";
// const SECONDARY_TEXT_COLOR = "#dd60dd";

const allAbilityElements = document.querySelectorAll(".stats > div");
const allSkills = document.querySelectorAll("#skills > div");
const allSavingThrows = document.querySelectorAll("#savingThrows > div");
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

const layOnHandsTarget = document.querySelector("#layOnHandsTarget");
const layOnHandsInput = document.querySelector("#layOnHandsInput");
const layOnHandsMaxEl = document.querySelector("#layOnHandsMaxValue");
const layOnHandsRemainingEl = document.querySelector(
  "#layOnHandsRemainingValue"
);

let proficiencies = JSON.parse(localStorage.profsArray ?? "[]");
let savingThrowProfs = JSON.parse(localStorage.savingThrowProfs ?? "[]");

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

  if (abilityScoreElement.textContent == "") {
    modifierSpan.textContent = "(-)";
    return;
  }

  let abilityScore = parseInt(content);
  let modifier = Math.floor((abilityScore - 10) / 2);

  modifierSpan.textContent = `(${modifier >= 0 ? "+" : ""}${modifier})`;
}

export function calculateSavingThrowModifiers() {
  allSavingThrows.forEach((savingThrow) => {
    const saveDiv = savingThrow;
    const abilityNameEl = saveDiv.querySelector("div");
    const abilityName = abilityNameEl.textContent.trim();
    const abilityNameShort = abilityNameEl.dataset.save;

    // The dot next to the abiliy name
    const iEl = saveDiv.querySelector("i");

    const savingThrowModifierEl = saveDiv.querySelector("span");

    const statDiv = document.querySelector(`.stats > .${abilityNameShort}`);
    const abilityModifier = Number(
      statDiv.querySelector(`div > .modifier`).textContent.slice(1, -1)
    );

    if (isNaN(abilityModifier)) {
      savingThrowModifierEl.textContent = "-";
      return;
    }

    if (savingThrowProfs.includes(abilityName)) {
      savingThrowModifierEl.textContent =
        Number(profBonusSpan.textContent) + abilityModifier;
      abilityNameEl.classList.add("profColor");
      iEl.className = "fa-solid fa-circle";
    } else {
      savingThrowModifierEl.textContent = abilityModifier;
      iEl.className = "fa-regular fa-circle";
    }
  });
}

export function calculateSkillModifiers() {
  allSkills.forEach((skill) => {
    const skillNameEl = skill.querySelector("div");
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
  const targetDiv = e.target.closest(".skillDiv");
  if (!targetDiv) return;

  console.log(targetDiv);

  const abilityNamePara = targetDiv.querySelector("div");

  const abilityName = abilityNamePara.textContent;
  if (proficiencies.includes(abilityName)) {
    proficiencies = proficiencies.filter((prof) => prof !== abilityName);
  } else {
    proficiencies.push(abilityName);
  }
  abilityNamePara.classList.toggle("profColor");
  localStorage.setItem("profsArray", JSON.stringify(proficiencies));

  calculateSkillModifiers();
}

export function toggleSaveProficiency(e) {
  const targetDiv = e.target.closest(".saveDiv");
  if (!targetDiv) return;

  const abilityNameEl = targetDiv.querySelector("div");
  const abilityName = abilityNameEl.textContent.trim();

  const iEl = targetDiv.querySelector("i");

  if (savingThrowProfs.includes(abilityName)) {
    savingThrowProfs = savingThrowProfs.filter((save) => save !== abilityName);
    iEl.className = "fa-regular fa-circle";
  } else {
    savingThrowProfs.push(abilityName);
    iEl.className = "fa-solid fa-circle";
  }

  abilityNameEl.classList.toggle("profColor");
  localStorage.setItem("savingThrowProfs", JSON.stringify(savingThrowProfs));

  calculateSavingThrowModifiers();
}

// localStorage.layOnHandsRemaining = 10;
export function layOnHandsHeal(e) {
  e.preventDefault();
  const healAmount = Number(layOnHandsInput.value);

  if (layOnHandsTarget.value == "Self") {
    if (healAmount > Number(localStorage.layOnHandsRemaining)) {
      flashColor(layOnHandsRemainingEl, "red");
      return;
    }
    if (healAmount + Number(currentHPel.textContent) > localStorage.maxHP)
      return;

    currentHPel.textContent = Number(currentHPel.textContent) + healAmount;
    layOnHandsRemainingEl.textContent -= healAmount;
    layOnHandsInput.value = "";
    flashColor(currentHPel, "springgreen");

    localStorage.layOnHandsRemaining = layOnHandsRemainingEl.textContent;
    localStorage.currentHP = currentHPel.textContent;
  } else {
    if (healAmount > Number(localStorage.layOnHandsRemaining)) {
      flashColor(layOnHandsRemainingEl, "red");
      return;
    }
    layOnHandsRemainingEl.textContent -= healAmount;
    layOnHandsInput.value = "";

    localStorage.layOnHandsRemaining = layOnHandsRemainingEl.textContent;
  }
}

export function toggleBackgroundColor(element) {
  if (element.textContent.trim() !== "") {
    element.style.backgroundColor = "transparent";
  } else element.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
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
    const ability = el.querySelector("b").textContent.toLowerCase();
    const spanEl = el.querySelector(".abilityScore");
    spanEl.textContent = localStorage.getItem(ability);
    toggleBackgroundColor(spanEl);
  });
  profBonusSpan.textContent = localStorage.profBonus;
  charDetailsSpanEls.forEach((span) => {
    toggleBackgroundColor(span);
  });
  checkForBackgroundColorOnLoad();
}

export function updateLayOnHandsValues() {
  layOnHandsInput.max = localStorage.charLevel * 5;
  layOnHandsMaxEl.textContent = localStorage.charLevel * 5;
}

function checkForBackgroundColorOnLoad() {
  toggleBackgroundColor(charName);
  toggleBackgroundColor(currentHPel);
  toggleBackgroundColor(maxHPel);
  toggleBackgroundColor(tempHPel);
  toggleBackgroundColor(armorClassEl);
  toggleBackgroundColor(initiativeEl);
  toggleBackgroundColor(speedEl);
  toggleBackgroundColor(profBonusSpan);
}

// Filter non-numbers for HP inputs:
export function filterNonNumbers(e) {
  let inputText = e.target.innerText;
  let caretPosition = getCaretPosition(e.target);
  let numericText = inputText.replace(/[^0-9]/g, "");
  e.target.innerText = numericText;
  setSelectionRange(e.target, caretPosition, caretPosition);
}

function getCaretPosition(element) {
  if (window.getSelection && window.getSelection().getRangeAt) {
    const range = window.getSelection().getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    return preCaretRange.toString().length;
  }
  return 0;
}

function setSelectionRange(element, start, end) {
  if (document.createRange && window.getSelection) {
    let range = document.createRange();
    range.selectNodeContents(element);
    let textNode = element.firstChild;

    // Ensure start and end are within valid bounds
    start = Math.min(start, textNode.length);
    end = Math.min(end, textNode.length);

    range.setStart(textNode, start);
    range.setEnd(textNode, end);

    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

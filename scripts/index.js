"use strict";
// localStorage.clear();

const MAIN_TEXT_COLOR = "lavender";
const SECONDARY_TEXT_COLOR = "#dd60dd";

const stats = document.querySelector(".stats");
const allAbilityElements = document.querySelectorAll(".stats > div");
const barsIcon = document.querySelector(".menuIcon i");
const xmarkIcon = document.querySelector(".leftNavbar i");
const menu = document.querySelector(".leftNavbar");
const takeDamageBtn = document.querySelector("#takeDamage > button");
const takeDamageInput = document.querySelector("#takeDamage > input");
const profBonusSpan = document.querySelector("#skillsContainer > h1 > span");

const charDetails = document.querySelector("#character-details");
const charDetailsSpanEls = charDetails.querySelectorAll("div > span");
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
const skillsDiv = document.querySelector("#skills");

const proficiencies = ["History", "Persuasion", "Insight", "Religion"];

window.addEventListener("load", (e) => {
  loadPage();
  allAbilityElements.forEach((el) => {
    const abilityScoreElement = el.querySelector(".abilityScore");
    getAbilityScoreModifier(abilityScoreElement);
  });
  calculateSkillModifiers();
});

charDetails.addEventListener("input", (e) => {
  const span = e.target.closest("span");
  generateBorder(span);
});

charName.addEventListener("input", () => {
  localStorage.setItem("charName", charName.textContent);
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
});
charAlignment.addEventListener("input", () => {
  localStorage.setItem("charAlignment", charAlignment.textContent);
});

armorClassEl.addEventListener("input", () => {
  localStorage.armorClass = armorClassEl.textContent;
});

initiativeEl.addEventListener("input", () => {
  localStorage.initiative = initiativeEl.textContent;
});

speedEl.addEventListener("input", () => {
  localStorage.speed = speedEl.textContent;
});

stats.addEventListener("input", (e) => {
  getAbilityScoreModifier(e.target);
  const ability = e.target.parentElement.parentElement.querySelector("b");
  localStorage.setItem(`${ability.textContent}`, e.target.textContent);
  calculateSkillModifiers();
});

profBonusSpan.addEventListener("input", () => {
  localStorage.profBonus = profBonusSpan.textContent;
});

barsIcon.addEventListener("click", showMenu);
xmarkIcon.addEventListener("click", hideMenu);
takeDamageBtn.addEventListener("click", takeDamage);

currentHPel.addEventListener("input", () => {
  localStorage.setItem("currentHP", currentHPel.textContent);
});

maxHPel.addEventListener("input", () => {
  localStorage.setItem("maxHP", maxHPel.textContent);
});

tempHPel.addEventListener("input", () => {
  localStorage.setItem("tempHP", tempHPel.textContent);
});

function generateBorder(element) {
  if (element.textContent === "") {
    element.style.border = "1px solid rgba(230, 230, 250, 0.5)";
  } else {
    element.style.border = "none";
  }
}

function checkForBorder(element) {
  if (element.textContent === "") {
    element.style.border = "1px solid rgba(230, 230, 250, 0.5)";
  } else {
    element.style.border = "none";
  }
}

function showMenu() {
  menu.style.transform = "translateX(0)";
}

function hideMenu() {
  menu.style.transform = "translateX(-100px)";
}

function flashColor(el, color) {
  el.style.color = color;
  setTimeout(function () {
    el.style.color = MAIN_TEXT_COLOR;
  }, 250);
}

function takeDamage() {
  if (takeDamageInput.value == "") return;
  const damage = Number(takeDamageInput.value);

  currentHPel.textContent = Number(currentHPel.textContent) - damage;

  if (Number(currentHPel.textContent) > Number(localStorage.maxHP)) {
    currentHPel.textContent = localStorage.maxHP;
  }

  if (damage < 0) {
    flashColor(currentHPel, "springgreen");
  } else if (damage > 0) {
    flashColor(currentHPel, "crimson");
  }

  localStorage.currentHP = currentHPel.textContent;
}

function getAbilityScoreModifier(abilityScoreElement) {
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

function calculateSkillModifiers() {
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
    } else {
      skillModifierEl.textContent = abilityModifier;
    }
  });
}

function loadPage() {
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

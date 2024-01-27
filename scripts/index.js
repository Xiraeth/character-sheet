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
    getModifier(abilityScoreElement);
  });
  calculateSkillModifiers();
});

window.addEventListener("input", (e) => {
  const target = e.target;

  let content = target.textContent;
  let numericContent = content.replace(/\D/g, "");
  target.textContent = numericContent;
});

initiativeEl.addEventListener("focus", (e) => {
  initiativeEl.textContent = initiativeEl.textContent.slice(1);
});
initiativeEl.addEventListener("blur", (e) => {
  initiativeEl.textContent = "+" + initiativeEl.textContent;
});

stats.addEventListener("input", (e) => {
  getModifier(e.target);
  const ability = e.target.parentElement.parentElement.querySelector("b");
  localStorage.setItem(`${ability.textContent}`, e.target.textContent);
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

function flashColor(el, color) {
  el.style.color = color;
  setTimeout(function () {
    el.style.color = MAIN_TEXT_COLOR;
  }, 250);
}

function loadPage() {
  currentHPel.textContent = localStorage.currentHP;
  maxHPel.textContent = localStorage.maxHP;
  tempHPel.textContent = localStorage.tempHP;
  allAbilityElements.forEach((el) => {
    const ability = el.querySelector("b").textContent;
    const spanEl = el.querySelector(".abilityScore");
    spanEl.textContent = localStorage.getItem(ability);
  });
  profBonusSpan.textContent = localStorage.profBonus;
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

function switchAbility(data) {
  switch (data) {
    case "str":
      return;
  }
}

function calculateSkillModifiers() {
  const allSkills = document.querySelectorAll("#skills > div");

  allSkills.forEach((skill) => {
    const skillNameEl = skill.querySelector("p");
    const skillModifierEl = skill.querySelector("span");

    const abilityName = skillNameEl.dataset.ability;

    const statDiv = document.querySelector(`.stats > .${abilityName}`);
    const abilityModifier = Number(
      statDiv.querySelector(`div > .modifier`).textContent.slice(1, 3)
    );

    if (proficiencies.includes(skillNameEl.textContent)) {
      skillModifierEl.textContent =
        Number(profBonusSpan.textContent) + abilityModifier;
    } else {
      skillModifierEl.textContent = abilityModifier;
    }
  });
}

"use strict";
// localStorage.clear();

const stats = document.querySelector(".stats");
const allAbilityElements = document.querySelectorAll(".stats > div");
const barsIcon = document.querySelector(".menuIcon i");
const xmarkIcon = document.querySelector(".leftNavbar i");
const menu = document.querySelector(".leftNavbar");

const currentHPel = document.querySelector("#currentHPdiv span");
const maxHPel = document.querySelector("#maximumHPdiv span");
const tempHPel = document.querySelector("#tempHPdiv span");
const armorClassEl = document.querySelector("#armorClass div:first-child");
const initiativeEl = document.querySelector("#initiative div:first-child");
const speedEl = document.querySelector("#speed div:first-child");

window.addEventListener("load", e => {
	loadPage();
	allAbilityElements.forEach(el => {
		const abilityScoreElement = el.querySelector(".abilityScore");
		getModifier(abilityScoreElement);
	})
});

window.addEventListener("input", e => {
	const target = e.target;

	let content = target.textContent;
	let numericContent = content.replace(/\D/g, "");
  target.textContent = numericContent;
})

initiativeEl.addEventListener("focus", e => {
	initiativeEl.textContent = initiativeEl.textContent.slice(1);
})
initiativeEl.addEventListener("blur", e => {
	initiativeEl.textContent = "+" + initiativeEl.textContent;
})

stats.addEventListener("input", (e) => {
  getModifier(e.target);
	const ability = e.target.parentElement.parentElement.querySelector("b");
	localStorage.setItem(`${ability.textContent}`, e.target.textContent);
});

barsIcon.addEventListener("click", showMenu);
xmarkIcon.addEventListener("click", hideMenu);

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
	setTimeout(function() {
		el.style.color = "initial";
	}, 1000)
}

function loadPage() {
  currentHPel.textContent = localStorage.currentHP;
  maxHPel.textContent = localStorage.maxHP;
  tempHPel.textContent = localStorage.tempHP;
	allAbilityElements.forEach(el => {
		const ability = el.querySelector("b").textContent;
		const spanEl = el.querySelector(".abilityScore");
		spanEl.textContent = localStorage.getItem(ability);
	})
}

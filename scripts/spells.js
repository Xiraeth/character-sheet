"use strict";

const menuCharName = document.querySelector("#menuCharName");
const spellSaveDC = document.querySelector("#spellSaveDC > span");
const spellAtkBns = document.querySelector("#spellAtkBns > span");
const toggleEditModeButton = document.querySelector(".editButtonContainer button");
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
const allAnchorElements = document.querySelectorAll('.spellsSection .spellList a')

let editMode = false;

toggleEditModeButton.addEventListener('click', () => {
  editMode = editMode === false ? true : false;
  if (editMode) toggleEditModeButton.style.backgroundColor = 'springgreen';
  else toggleEditModeButton.style.backgroundColor = 'var(--header-color)';
  allAnchorElements.forEach(el => {
    if (editMode) {
      el.a = "#";
    }
  })
})

window.addEventListener("load", function (e) {
  menuCharName.textContent = localStorage.charName || 'Character';
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

firstLvSpellSlots.addEventListener("input", (e) => {
  filterNonNumbers(e);
  localStorage.setItem("firstLvSpellSlots", firstLvSpellSlots.textContent);
});

firstLvExpended.addEventListener("input", (e) => {
  filterNonNumbers(e);
  localStorage.setItem("firstLvExpended", firstLvExpended.textContent);
});

secondLvSpellSlots.addEventListener("input", (e) => {
  filterNonNumbers(e);
  localStorage.setItem("secondLvSpellSlots", secondLvSpellSlots.textContent);
});

secondLvExpended.addEventListener("input", (e) => {
  filterNonNumbers(e);
  localStorage.setItem("secondLvExpended", secondLvExpended.textContent);
});

spellSaveDC.addEventListener("input", (e) => {
  filterNonNumbers(e);
  localStorage.setItem("spellSaveDC", spellSaveDC.textContent);
});

spellAtkBns.addEventListener("input", (e) => {
  filterNonNumbers(e);
  localStorage.setItem("spellAtkBns", spellAtkBns.textContent);
});

function filterNonNumbers(e) {
  let inputText = e.target.innerText;
  let caretPosition = getCaretPosition(e.target);
  let numericText = inputText.replace(/[^0-9-]/g, "");
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

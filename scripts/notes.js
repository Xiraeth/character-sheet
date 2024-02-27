'use strict';

const textarea = document.getElementById("notebook");
const colorPickerInput = document.getElementById("colorPicker");
const menuCharName = document.querySelector("#menuCharName");

let color = localStorage.textareaColor || document.documentElement.style.getPropertyValue('--notebook-text-color');

window.addEventListener('load', loadNotebook);

textarea.addEventListener('input', e => {
  changeColor();
  localStorage.notebook = e.target.value;
})

colorPickerInput.addEventListener('input', (e) => {
  color = e.target.value;
  localStorage.textareaColor = color;  
});

colorPickerInput.addEventListener('blur', (e) => textarea.focus());

function changeColor() {
  const color = colorPickerInput.value;
  document.documentElement.style.setProperty('--notebook-text-color', color);
}

function loadNotebook() {
  menuCharName.textContent = localStorage.charName || 'Character';
  textarea.value = localStorage.notebook || '';
  colorPickerInput.value = localStorage.textareaColor;
  document.documentElement.style.setProperty('--notebook-text-color', color);
}


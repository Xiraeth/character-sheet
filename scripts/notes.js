'use strict';

const textarea = document.getElementById("notebook");
const colorPickerInput = document.getElementById("colorPicker");
let color = localStorage.textareaColor || document.documentElement.style.getPropertyValue('--notebook-text-color');

window.addEventListener('load', loadNotebook);

textarea.addEventListener('input', e => {
  const content = e.target.value;
  changeColor(); 
  localStorage.notebook = content;

  // THIS IS REALLY BAD, CHANGE ACCORDING TO 'TODO'
  const spanEl = document.createElement('span');
  spanEl.textContent = e.target.value;
  textarea.insertAdjacentElement('beforeend', spanEl);
})

colorPickerInput.addEventListener('focus', () => {});
colorPickerInput.addEventListener('blur', () => {});
colorPickerInput.addEventListener('input', (e) => {
  color = e.target.value;
  localStorage.textareaColor = color;
});

function changeColor() {
  const color = colorPickerInput.value;
  document.documentElement.style.setProperty('--notebook-text-color', color);
}

function loadNotebook() {
  textarea.value = localStorage.notebook;
  colorPickerInput.value = localStorage.textareaColor;
  document.documentElement.style.setProperty('--notebook-text-color', color);
}

////// TODO:
/*
  1) Textarea starts with 1 empty span (if it is empty or when opening the app for the first time)
  2) When user edits textarea, it's the span inside the area that is edited.
  3) The first time the user sets a color, it changes the span element's "color: ...;" style attribute.
  4) Everytime the color picker gets input, create a new span and append it to <textarea>. It's this span now that gets editted.
  5) Every time this happens, the editting target changes to be the lastly created span.
  *6) If the user changes the color BEFORE editting the last span (if textContent === ''), DO NOT create a new span, but change it's color attribute.
  ?7) WHAT IF the user wants to change some of the text that has already been written? That is, edit an existing span.
    -> potentially get the color of the span onFocus, and set the color variable to that.
    --> have a variable called activeSpan to keep track of which span is being editted every time, to keep track of the color.
    [this might fail at step 1, not sure how textarea editting works.]

*/
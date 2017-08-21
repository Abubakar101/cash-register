/* eslint-env browser */

"use strict";

// Let's get a reference to all our DOM elements
// and store them in an object
// @hint: use document.querySelector()

let total = 0;
const $els = {

  total: document.querySelector('#total'),
  entries: document.querySelector('#entries'),
  entryForm: document.querySelector('#entry'),
  inputField: document.querySelector('#entry input'),

};



$els.inputField.setAttribute("onkeypress", "return onlyNum(event)");
let onlyNum = event => ((!isNaN(event.key) || event.key === '.' || event.key === '-' || event.key === 'Enter') && event.code !== 'Space');
// const button = document.createElement("BUTTON");
// $els.entryForm.insertBefore( button, $els.entryForm.firstChild);
// button.innerHTML = "Submit";


// helper values

/**
 * @func addRow
 * @desc creates a table row and cell, and injects content into the cell
 * @param {String} content
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/insertRow
 * @return {HTMLTableRowElement} a reference to the new row created
 */
const addRow = function (content) {
  let row = $els.entries.insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(0);
  cell1.innerHTML = content;
};

/**
 * @func removeDecimal
 * @desc parses a string and converts it to a whole number (decimal removed)
 * @param {String} str
 * @returns {Number} the incoming number multiplied by 100
 */
const removeDecimal = function (str) {
  //1.1 -> 110
  //1.23456 -> 123

  // 1) remove symbols. 2) str->float * 100 : 1.234 123.4 3) toFixed-> "123" 4) 123 
  return parseInt(
    (parseFloat(str.replace(/[^\d\.-]+/gi, "")) * 100).toFixed(0)
  );
};

/**
 * @func dollarFormat
 * @desc takes an integer and formats a string in dollar format
 * @param {numeric} num -
 * @returns {string} 0000 -> '$00.00'
 */
const dollarFormat = function (num) {
  let str = num.toString();
  return `$${str.substr(0, str.length - 2)}.${str.substr(-2)}`;
};

/**
 * @func handleFormSubmit
 * @desc get the value of the entry field
 * @param {submit} event - the 'submit' event that was triggered when the form was submitted
 * @returns {undefined}
 */
const handleFormSubmit = function (event) {

  // stop the event from happening
  event.preventDefault();


  // note: remember that form fields ALWAYS contain text
  let value = $els.inputField.value;
  value = removeDecimal(value);
  let formatted_value = dollarFormat(value);

  // add a row with the data
  // our design dictates that this row should have two cells
  // let's insert the new empty cell BEFORE the existing one
  addRow(formatted_value);


  // update the total price
  // and
  // update the display total
  total += value;
  $els.total.innerHTML = dollarFormat(total);

  // reset the form to clear out anything previously typed
  $els.entryForm.reset();



};

// event handlers
/**
 * Listen for submit events from the form
 */

$els.entryForm.addEventListener("submit", handleFormSubmit);
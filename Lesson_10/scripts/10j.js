/*
  If calculation is not stored in localStorage,
  create a default '' value
*/
let calculation = localStorage.getItem('calculation') || '';
let display = document.querySelector('.js-display');

// Display calculation when the page loads
displayCalculation();

function displayCalculation() {
  display.innerHTML = calculation;
}

function updateCalculation(value) {
  if (value === '=') {
    calculation = eval(calculation);
    displayCalculation();
  } else if (value === '') {
    calculation = '';
    console.log('Cleared');
    displayCalculation();
  } else {
    calculation += value;
    displayCalculation();
  }

  localStorage.setItem('calculation', calculation);
}
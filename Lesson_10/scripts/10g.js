function toggle(name) {
  button = document.querySelector(`.js-${name}`)

  if (button.classList.contains('is-toggled')) {
    button.classList.remove('is-toggled');
  } else {
    turnOffPreviousButton();
    button.classList.add('is-toggled');
  }
}

function turnOffPreviousButton() {
  const toggledButton = document.querySelector('.is-toggled');
  if (toggledButton) {
    toggledButton.classList.remove('is-toggled');
  }
}
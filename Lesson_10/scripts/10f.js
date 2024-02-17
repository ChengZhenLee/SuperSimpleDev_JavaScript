function toggle(name) {
  button = document.querySelector(`.js-${name}`)
  if (button.classList.contains('is-toggled')) {
    button.classList.remove('is-toggled');
  } else {
    button.classList.add('is-toggled');
  }
}
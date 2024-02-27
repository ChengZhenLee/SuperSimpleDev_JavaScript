import {updateQuantity} from "../../data/cart.js";
import {renderCheckoutHeader} from "../checkout/checkoutHeader.js";
import {renderOrderSummary} from "../checkout/orderSummary.js";

let timeOutId;

export function validateQuantity(value, productId) {
  let newQuantity;
  if (value === '') {
    newQuantity = +document.querySelector('.js-quantity-label').innerHTML;
  } else {
    newQuantity = +value;
  }

  if (newQuantity < 0 || newQuantity >= 1000) {
    const errorMessage = document.querySelector('.js-error-message');
    errorMessage.classList.add('error-message-appear');
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      errorMessage.classList.remove('error-message-appear');
    }, 1000);
  } else {
    updateQuantity(productId, newQuantity);
    renderOrderSummary();
    renderCheckoutHeader();
  }
}
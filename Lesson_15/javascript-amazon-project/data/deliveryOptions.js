import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import isWeekend from '../scripts/utils/date.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption;
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  let deliveryDays = deliveryOption.deliveryDays;
  let numberOfDays = 0;

  while (deliveryDays > 0) {
    let curDay = today.add(numberOfDays, 'days');
    if (!isWeekend(curDay)) {
      deliveryDays--;
    }
    numberOfDays++;
  }

  const deliveryDate = today.add(numberOfDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');

  return dateString;
}
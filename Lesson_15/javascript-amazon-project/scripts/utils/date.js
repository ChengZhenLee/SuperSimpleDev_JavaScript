function isWeekend(date) {
  date = date.format('dddd');
  if (date === 'Saturday' || date === 'Sunday') {
    return true;
  }
  return false;
}

export default isWeekend;
import ReservationDayValidator from './validator/ReservationDayValidator.js';
import calender from './constants/calendar.js';

class ReservationDay {
  #day;

  constructor(day) {
    ReservationDayValidator.validate(day);
    this.#day = Number(day);
  }

  isChristmasEvent() {
    return calender.CHRISTMAS_D_DAY.includes(this.#day);
  }
}

export default ReservationDay;
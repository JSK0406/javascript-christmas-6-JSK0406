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

  isWeekdayEvent() {
    return calender.WEEKDAY.includes(this.#day);
  }

  isWeekendEvent() {
    return calender.WEEKEND.includes(this.#day);
  }

  isSpecialEvent() {
    return calender.SPECIAL_DAY.includes(this.#day);
  }
}

export default ReservationDay;
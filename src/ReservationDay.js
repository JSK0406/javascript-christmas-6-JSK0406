import ReservationDayValidator from './validator/ReservationDayValidator.js';

class ReservationDay {
  #day;

  constructor(day) {
    ReservationDayValidator.validate(day);
    this.#day = Number(day);
  }
}

export default ReservationDay;
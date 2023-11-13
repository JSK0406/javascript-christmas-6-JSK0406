import calender from '../constants/calendar.js';
import errorMessage from '../constants/errorMessage.js';

class ReservationDayValidator {
  static validate(day) {
    const reservationDayValidator = new ReservationDayValidator();
    const reservationDayError = new Error(errorMessage.RESERVATION_DAY);
    reservationDayValidator.#validateInRange(day, reservationDayError);
    reservationDayValidator.#validateIsNumber(day, reservationDayError);
    reservationDayValidator.#validateNaturalNumber(day, reservationDayError);
    reservationDayValidator.#validateNotUnusualCase(day, reservationDayError);
  }

  #validateIsNumber(day, reservationDayError) {
    if (Number.isNaN(Number(day))) {
      throw reservationDayError;
    }
  }

  #validateInRange(day, reservationDayError) {
    if (Number(day) < calender.DECEMBER_START || Number(day) > calender.DECEMBER_END) {
      throw reservationDayError;
    }
  }

  #validateNotUnusualCase(day, reservationDayError) {
    if (day !== Number(day).toString()) {
      throw reservationDayError;
    }
  }

  #validateNaturalNumber(day, reservationDayError) {
    if (!Number.isInteger(Number(day))) {
      throw reservationDayError;
    }
  }
}

export default ReservationDayValidator;
class ReservationDay {
  #day;

  constructor(day) {
    this.#validate(day);
    this.#day = day;
  }

  #validate(day) {
    this.#validateInRange(day);
    this.#validateIsNumber(day);
    this.#validateNaturalNumber(day);
    this.#validateNotUnusualCase(day);
  }

  #validateIsNumber(day) {
    if (Number.isNaN(Number(day))) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  }

  #validateInRange(day) {
    if (Number(day) < 1 || Number(day) > 31) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  }

  #validateNotUnusualCase(day) {
    if (day !== Number(day).toString()) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  }

  #validateNaturalNumber(day) {
    if (!Number.isInteger(Number(day))) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  }
}

export default ReservationDay;
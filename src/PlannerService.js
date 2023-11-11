import Event from './Event.js';
import Discount from './Discount.js';

class PlannerService {
  #reservationDay;
  #orders;
  #discount;
  #event;

  constructor(reservationDay, orders) {
    this.#reservationDay = reservationDay;
    this.#orders = orders;
    this.#event = new Event();
    this.#discount = new Discount(this.getChristmasDiscount(), this.getWeekdayDiscount(), this.getWeekendDiscount(), this.getSpecialDiscount());
  }
  
  getChristmasDiscount() {
    if (this.#reservationDay.isChristmasEvent) {
      return this.#event.calculateChristmasDiscount(this.#reservationDay.getDay());
    }
    return 0;
  }

  getWeekdayDiscount() {
    if (this.#reservationDay.isWeekdayEvent) {
      return this.#event.calculateWeekdayDiscount(this.#orders.calculateDessertCount());
    }
    return 0;
  }

  getWeekendDiscount() {
    if (this.#reservationDay.isWeekendEvent) {
      return this.#event.calculateWeekendDiscount(this.#orders.calculateMainCount());
    }
    return 0;
  }

  getSpecialDiscount() {
    if (this.#reservationDay.isSpecialEvent) {
      return this.#event.calculateSpecialDiscount();
    }
    return 0;
  }
}

export default PlannerService;
import Event from './Event.js';
import Discount from './Discount.js';
import restaurantRule from './constants/restaurantRule.js';

class PlannerService {
  #reservationDay;
  #orders;
  #discount;
  #event;

  constructor(reservationDay, orders) {
    this.#reservationDay = reservationDay;
    this.#orders = orders;
    this.#event = new Event();
    this.#discount = new Discount(this.getChristmasDiscount(), this.getWeekdayDiscount(), this.getWeekendDiscount(), this.getSpecialDiscount(), this.getGiveAwayDiscount());
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

  getGiveawayDiscount() {
    if (this.getIsGiveawayEvent()) {
      return restaurantRule.GIVE_AWAY_DISCOUNT();
    }
    return 0;
  }

  getReservationDay() {
    return this.#reservationDay.getDay();
  }

  getOrderHistory() {
    return this.#orders.getOrders();
  }

  getBeforeDiscountPrice() {
    return this.#orders.calculateTotalPrice();
  }

  getIsGiveawayEvent() {
    return this.#event.isGiveawayEvent(this.#orders.calculateTotalPrice());
  }

  getDiscountHistory() {
    return {
      christmas: this.getChristmasDiscount(),
      weekday: this.getWeekdayDiscount(),
      weekend: this.getWeekendDiscount(),
      specialDay: this.getSpecialDiscount(),
      giveaway: this.getGiveAwayDiscount(),
    };
  }

  getTotalDiscountPrice() {
    return this.#discount.calculateTotalDiscount();
  }

  getAfterDiscountPrice() {
    return this.getBeforeDiscountPrice() - this.getTotalDiscountPrice();
  }

  getBadge() {
    if (this.#discount.isPossibleReceivingBadge()) {
      return this.#discount.getBadge();
    }
    return null;
  }
}

export default PlannerService;
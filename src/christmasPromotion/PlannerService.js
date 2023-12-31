import Event from './domain/Event.js';
import Discount from './domain/Discount.js';
import restaurantRule from '../constants/restaurantRule.js';

class PlannerService {
  #reservationDay;
  #orders;
  #event;
  #discount;

  constructor(reservationDay, orders) {
    this.#reservationDay = reservationDay;
    this.#orders = orders;
    this.#event = new Event();
    this.#discount = new Discount(this.getChristmasDiscount(), this.getWeekdayDiscount(), this.getWeekendDiscount(), this.getSpecialDiscount(), this.getGiveawayDiscount());
  }

  getIsDiscountPossible() {
    if (this.#orders.calculateTotalPrice() >= restaurantRule.EVENT_LEAST_PRICE) {
      return true;
    }
    return false;
  }

  getChristmasDiscount() {
    if (this.getIsDiscountPossible() && this.#reservationDay.isChristmasEvent()) {
      return this.#event.calculateChristmasDiscount(this.#reservationDay.getDay());
    }
    return 0;
  }

  getWeekdayDiscount() {
    if (this.getIsDiscountPossible() && this.#reservationDay.isWeekdayEvent()) {
      return this.#event.calculateWeekdayDiscount(this.#orders.calculateDessertCount());
    }
    return 0;
  }

  getWeekendDiscount() {
    if (this.getIsDiscountPossible() && this.#reservationDay.isWeekendEvent()) {
      return this.#event.calculateWeekendDiscount(this.#orders.calculateMainCount());
    }
    return 0;
  }

  getSpecialDiscount() {
    if (this.getIsDiscountPossible() && this.#reservationDay.isSpecialEvent()) {
      return this.#event.calculateSpecialDiscount();
    }
    return 0;
  }

  getIsGiveawayEvent() {
    return this.getIsDiscountPossible() && this.#event.isGiveawayEvent(this.#orders.calculateTotalPrice());
  }

  getGiveawayDiscount() {
    if (this.getIsDiscountPossible() && this.getIsGiveawayEvent()) {
      return restaurantRule.GIVE_AWAY_DISCOUNT;
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

  getDiscountHistory() {
    return {
      christmas: this.getChristmasDiscount(),
      weekday: this.getWeekdayDiscount(),
      weekend: this.getWeekendDiscount(),
      specialDay: this.getSpecialDiscount(),
      giveaway: this.getGiveawayDiscount(),
    };
  }

  getTotalDiscountPrice() {
    return this.#discount.calculateTotalDiscount();
  }

  getTotalDiscountWithoutGiveaway() {
    return this.#discount.calculateTotalDiscount() - this.getGiveawayDiscount();
  }

  getAfterDiscountPrice() {
    return this.getBeforeDiscountPrice() - this.getTotalDiscountWithoutGiveaway();
  }

  getBadge() {
    if (this.#discount.isPossibleReceivingBadge()) {
      return this.#discount.checkEventBadge();
    }
    return null;
  }
}

export default PlannerService;
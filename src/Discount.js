import restaurantRule from './constants/restaurantRule.js';

class Discount {
  #totalDiscount;
  constructor(christmasDiscount, weekdayDiscount, specialDiscount, giveawayDiscount) {
    this.#totalDiscount = christmasDiscount + weekdayDiscount + specialDiscount + giveawayDiscount;
  }

  calculateTotalDiscount() {
    return this.#totalDiscount;
  }

  isPossibleReceivingBadge() {
    if (this.#totalDiscount >= restaurantRule.EVENT_BADGE_LEAST_DISCOUNT_PRICE) {
      return true;
    }
    return false;
  }

  checkEventBadge() {
    if (this.#totalDiscount > restaurantRule.EVENT_BADGE.SANTA) {
      return '산타';
    } else if (this.#totalDiscount > restaurantRule.EVENT_BADGE.TREE) {
      return '트리';
    }
    return '별';
  }
}

export default Discount;
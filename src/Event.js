import restaurantRule from './constants/restaurantRule.js';

class Event {
  isGiveawayEvent(totalPrice) {
    if (totalPrice >= restaurantRule.GIVE_AWAY_MIN_PRICE) {
      return true;
    }
    return false;
  }

  calculateChristmasDiscount(day) {
    return restaurantRule.CHRISTMAS_EVENT_LEAST_DISCOUNT + restaurantRule.CHRISTMAS_EVENT_DISCOUNT_INCREMENT_BY_DAY * (day - 1);
  }
}

export default Event;
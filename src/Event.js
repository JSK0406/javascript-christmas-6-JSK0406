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

  calculateWeekdayDiscount(dessertCount) {
    return dessertCount * restaurantRule.WEEKDAY_DISCOUNT_BY_COUNT;
  }

  calculateWeekendDiscount(mainCount) {
    return mainCount * restaurantRule.WEEKEND_DISCOUNT_BY_COUNT;
  }
  
  calculateSpecialDiscount() {
    return restaurantRule.SPECIAL_DISCOUNT;
  }
}

export default Event;
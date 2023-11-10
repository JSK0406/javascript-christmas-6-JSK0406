import restaurantRule from './constants/restaurantRule.js';

class Event {
  isGiveawayEvent(totalPrice) {
    if (totalPrice >= restaurantRule.GIVE_AWAY_MIN_PRICE) {
      return true;
    }
    return false;
  }
}

export default Event;
import menu from './constants/menu.js';
import OrdersValidator from './validator/OrdersValidator.js';
import restaurantRule from './constants/restaurantRule.js';

class Orders {
  #orders;

  constructor(orders) {
    OrdersValidator.validate(orders);
    this.#orders = this.#changeFormatToObject(orders);
  }

  #changeFormatToObject(orders) {
    return orders.split(',').map((order) => {
      const [menuName, count] = order.split('-');
      return { menuName: menuName, orderedCount: Number(count) };
    });
  }

  calculateTotalPrice() {
    return this.#orders.reduce((totalPrice, { menuName, orderedCount }) => {
      return totalPrice + menu[menuName].price * orderedCount;
    }, 0);
  }

  calculateMainCount() {
    return this.#orders.reduce((count, { menuName, orderedCount }) => {
      if (menu[menuName].category === '메인') {
        return count + orderedCount;
      }
      return count;
    }, 0);
  }

  calculateDessertCount() {
    return this.#orders.reduce((count, { menuName, orderedCount }) => {
      if (menu[menuName].category === '디저트') {
        return count + orderedCount;
      }
      return count;
    }, 0);
  }

  calculateTotalCount() {
    return this.#orders.reduce((count, { orderedCount }) => {
      return count + orderedCount;
    }, 0);
  }

  extractMenuName() {
    return this.#orders.map(({ menuName }) => menuName);
  }
}

export default Orders;
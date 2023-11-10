import menu from './constants/menu.js';
import OrdersValidator from './validator/OrdersValidator.js';
import restaurantRule from './constants/restaurantRule.js';
import errorMessage from './constants/errorMessage.js';

class Orders {
  #orders;

  constructor(orders) {
    OrdersValidator.validate(orders);
    this.#orders = this.#changeFormatToObject(orders);
    const ordersError = new Error(errorMessage.ORDERS);
    this.#validateAfterAssign(ordersError);
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

  #validateAfterAssign(ordersError) {
    this.#validateNotOnlyDrink(ordersError);
    this.#validateTotalCount(ordersError);
    this.#validateDuplicatedMenu(ordersError);
  }

  #validateTotalCount(ordersError) {
    if (this.calculateTotalCount() < restaurantRule.ORDER_MIN_COUNT || this.calculateTotalCount() > restaurantRule.ORDER_MAX_COUNT) {
      throw ordersError;
    }
  }

  #validateDuplicatedMenu(ordersError) {
    const menuNames = this.extractMenuName();
    if (menuNames.length !== (new Set(menuNames)).size) {
      throw ordersError;
    }
  }

  #validateNotOnlyDrink(ordersError) {
    const menuNames = this.extractMenuName();
    for (const menuName of menuNames) {
      if (menu[menuName].category !== '음료') {
        return;
      }
    }
    throw ordersError;
  }
}

export default Orders;
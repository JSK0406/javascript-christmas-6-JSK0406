import errorMessage from '../constants/errorMessage.js';
import menu from '../constants/menu.js';

class OrdersValidator {
  static validate(orders) {
    const ordersValidator = new OrdersValidator();
    const ordersError = new Error(errorMessage.ORDERS);
    orders = orders.split(',');
    ordersValidator.#validateCountRange(orders, ordersError);
    ordersValidator.#validateInMenuList(orders, ordersError);
    ordersValidator.#validateIsCountNaturalNumber(orders, ordersError);
    ordersValidator.#validateIsCountNumber(orders, ordersError);
    ordersValidator.#validateIsNotUnusualCount(orders, ordersError);
  }

  #validateInMenuList(orders, ordersError) {
    orders.forEach((order) => {
      const menuName = order.split('-')[0];
      if (menu[menuName] === undefined) {
        throw ordersError;
      }
    });
  }

  #validateCountRange(orders, ordersError) {
    orders.forEach((order) => {
      const count = Number(order.split('-')[1]);
      if (count < 1 || count > 20) {
        throw ordersError;
      }
    });
  }

  #validateIsCountNumber(orders, ordersError) {
    orders.forEach((order) => {
      const count = Number(order.split('-')[1]);
      if (Number.isNaN(count)) {
        throw ordersError;
      }
    });
  }

  #validateIsNotUnusualCount(orders, ordersError) {
    orders.forEach((order) => {
      const countString = order.split('-')[1];
      if (countString !== Number(countString).toString()) {
        throw ordersError;
      }
    });
  }

  #validateIsCountNaturalNumber(orders, ordersError) {
    orders.forEach((order) => {
      const count = Number(order.split('-')[1]);
      if (!Number.isInteger(count)) {
        throw ordersError;
      }
    });
  }
}

export default OrdersValidator;
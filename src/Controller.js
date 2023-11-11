import PlannerService from './PlannerService.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import ReservationDay from './ReservationDay.js';
import Orders from './Orders.js';

class Controller {
  #plannerService;

  async #assignPlannerService() {
    this.#plannerService = new PlannerService(await this.#createReservationDayFromUser(), await this.#createOrdersFromUser());
  }

  async #createReservationDayFromUser() {
    try {
      return new ReservationDay(await InputView.inputReservationDayAsync());
    } catch (error) {
      OutputView.printError(error.message);
      return await this.createReservationDayFromUser();
    }
  }

  async #createOrdersFromUser() {
    try {
      return new Orders(await InputView.inputOrdersAsync());
    } catch (error) {
      OutputView.printError(error.message);
      return await this.createOrdersFromUser();
    }
  }

  async takeReservation() {
    OutputView.printProgramInit();
    this.assignPlannerService();
  }

  showStartingIntroduction() {
    OutputView.printIntroduce(this.#plannerService.getReservationDay());
    OutputView.printNewLine();
  }

  showOrderedMenu() {
    OutputView.printOrderedMenuInit();
    OutputView.printOrderedMenu(this.#plannerService.getOrderHistory());
    OutputView.printNewLine();
  }

  showBeforeDiscount() {
    OutputView.printBeforeDiscountInit();
    OutputView.printBeforeDiscount(this.#plannerService.getBeforeDiscountPrice());
    OutputView.printNewLine();
  }

  showGiveaway() {
    OutputView.printGiveawayInit();
    if (this.#plannerService.getIsGiveawayEvent()) {
      OutputView.printGiveaway();
      OutputView.printNewLine();
      return;
    }
    OutputView.printNothing();
    OutputView.printNewLine();
  }

  showDiscountHistory() {
    OutputView.printDiscountHistoryInit();
    if (this.#plannerService.getTotalDiscountPrice() > 0) {
      OutputView.printDiscountHistory(this.#plannerService.getDiscountHistory());
      OutputView.printNewLine();
      return;
    }
    OutputView.printNothing();
    OutputView.printNewLine();
  }

  showTotalDiscount() {
    OutputView.printTotalDiscountInit();
    OutputView.printTotalDiscount(this.#plannerService.getTotalDiscountPrice());
    OutputView.printNewLine();
  }

  showAfterDiscount() {
    OutputView.printAfterDiscountInit();
    OutputView.printAfterDiscount(this.#plannerService.getAfterDiscountPrice());
    OutputView.printNewLine();
  }
}

export default Controller;
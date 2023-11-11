import PlannerService from './christmasPromotion/PlannerService.js';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import ReservationDay from './christmasPromotion/domain/ReservationDay.js';
import Orders from './christmasPromotion/domain/Orders.js';

class Controller {
  #plannerService;

  async operate() {
    await this.takeReservation();
    this.showStartingIntroduction();
    this.showOrderedMenu();
    this.showBeforeDiscount();
    this.showGiveaway();
    this.showDiscountHistory();
    this.showTotalDiscount();
    this.showAfterDiscount();
    this.showBadge();
  }

  async #assignPlannerService() {
    this.#plannerService = new PlannerService(await this.#createReservationDayFromUser(), await this.#createOrdersFromUser());
  }

  async #createReservationDayFromUser() {
    try {
      return new ReservationDay(await InputView.inputReservationDayAsync());
    } catch (error) {
      OutputView.printError(error.message);
      return await this.#createReservationDayFromUser();
    }
  }

  async #createOrdersFromUser() {
    try {
      return new Orders(await InputView.inputOrdersAsync());
    } catch (error) {
      OutputView.printError(error.message);
      return await this.#createOrdersFromUser();
    }
  }

  async takeReservation() {
    OutputView.printProgramInit();
    await this.#assignPlannerService();
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

  showBadge() {
    OutputView.printBadgeInit();
    if (this.#plannerService.getBadge() === null) {
      OutputView.printNothing();
      return;
    }
    OutputView.printBadge(this.#plannerService.getBadge());
  }
}

export default Controller;
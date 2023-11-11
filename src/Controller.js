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
}

export default Controller;
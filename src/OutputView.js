import { OUTPUT_VIEW_MESSAGE } from './constants/viewMessage.js';
import { Console } from '@woowacourse/mission-utils';
import Formatting from './utils/Formatting.js';

const OutputView = {
  printNewLine() {
    Console.print('');
  },
  printProgramInit() {
    Console.print(OUTPUT_VIEW_MESSAGE.programInit);
  },
  printIntroduce(day) {
    Console.print(OUTPUT_VIEW_MESSAGE.introduceFn(day));
  },
  printOrderedMenuInit() {
    Console.print(OUTPUT_VIEW_MESSAGE.orderedMenusInit);
  },
  printOrderedMenu(orders) {
    orders.forEach(({ menuName, orderedCount }) => {
      Console.print(OUTPUT_VIEW_MESSAGE.orderedMenuFn(menuName, orderedCount));
    });
  },
  printBeforeDiscountInit() {
    Console.print(OUTPUT_VIEW_MESSAGE.beforeDiscountInit);
  },
  printBeforeDiscount(price) {
    Console.print(OUTPUT_VIEW_MESSAGE.afterDiscountFn(Formatting.insertCommasByThousandUnits(price)));
  },
  printGiveawayInit() {
    Console.print(OUTPUT_VIEW_MESSAGE.giveawayInit);
  },
  printGiveaway() {
    Console.print(OUTPUT_VIEW_MESSAGE.giveaway);
  },
  printDiscountHistoryInit() {
    Console.print(OUTPUT_VIEW_MESSAGE.discountsInit);
  },
  printDiscountHistory(discountHistory) {
    if (discountHistory.christmas > 0) {
      Console.print(OUTPUT_VIEW_MESSAGE.christmasDiscountFn(Formatting.insertCommasByThousandUnits(discountHistory.christmas)));
    }
    if (discountHistory.weekday > 0) {
      Console.print(OUTPUT_VIEW_MESSAGE.weekdayDiscountFn(Formatting.insertCommasByThousandUnits(discountHistory.weekday)));
    }
    if (discountHistory.weekend > 0) {
      Console.print(OUTPUT_VIEW_MESSAGE.weekendDiscountFn(Formatting.insertCommasByThousandUnits(discountHistory.weekend)));
    }
    if (discountHistory.specialDay > 0) {
      Console.print(OUTPUT_VIEW_MESSAGE.specialDiscountFn(Formatting.insertCommasByThousandUnits(discountHistory.specialDay)));
    }
    if (discountHistory.giveaway > 0) {
      Console.print(OUTPUT_VIEW_MESSAGE.christmasDiscountFn(Formatting.insertCommasByThousandUnits(discountHistory.giveaway)));
    }
  },
  printTotalDiscountInit() {
    Console.print(OUTPUT_VIEW_MESSAGE.totalDiscountInit);
  },
  printTotalDiscount(price) {
    Console.print(OUTPUT_VIEW_MESSAGE.totalDiscountFn(Formatting.insertCommasByThousandUnits(price)));
  },
  printAfterDiscountInit() {
    Console.print(OUTPUT_VIEW_MESSAGE.afterDiscountInit);
  },
  printAfterDiscount(price) {
    Console.print(OUTPUT_VIEW_MESSAGE.afterDiscountFn(Formatting.insertCommasByThousandUnits(price)));
  },
  printBadgeInit() {
    Console.print(OUTPUT_VIEW_MESSAGE.badgeInit);
  },
  printBadge(badge) {
    Console.print(badge);
  },
  printNothing() {
    Console.print(OUTPUT_VIEW_MESSAGE.nothing);
  },
  printError(error) {
    Console.print(error);
  }
};

export default OutputView;
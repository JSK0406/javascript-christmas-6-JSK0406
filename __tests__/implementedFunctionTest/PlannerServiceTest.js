import PlannerService from '../../src/christmasPromotion/PlannerService.js';
import ReservationDay from '../../src/christmasPromotion/domain/ReservationDay.js';
import Orders from '../../src/christmasPromotion/domain/Orders.js';
import restaurantRule from '../../src/constants/restaurantRule.js';
import menu from '../../src/constants/menu.js';

describe("PlannerService 테스트", () => {
  test("getIsDiscountPossible 테스트", () => {
    const inputs = [['3', '아이스크림-1'], ['3', '초코케이크-1']];
    
    const expectedResults = [false, true];
    const results = inputs.map((input) => (new PlannerService(new ReservationDay(input[0]), new Orders(input[1]))).getIsDiscountPossible());

    expect(results).toEqual(expectedResults);
  });

  test("getChristmasDiscount 테스트", () => {
    const inputs = [['3', '초코케이크-1'], ['25', '초코케이크-1'], ['31', '초코케이크-1']];
    
    const expectedResults = [1200, 3400, 0];
    const results = inputs.map((input) => (new PlannerService(new ReservationDay(input[0]), new Orders(input[1]))).getChristmasDiscount());

    expect(results).toEqual(expectedResults);
  });

  test("getWeekdayDiscount 테스트", () => {
    const inputs = [['1', '초코케이크-1'], ['25', '초코케이크-1'], ['31', '초코케이크-2'], ['31', '바비큐립-1']];

    const expectedResults = [0, 2023, 2023*2, 0];
    const results = inputs.map((input) => (new PlannerService(new ReservationDay(input[0]), new Orders(input[1]))).getWeekdayDiscount());

    expect(results).toEqual(expectedResults);
  });

  test("getWeekendDiscount 테스트", () => {
    const inputs = [['1', '초코케이크-1'], ['1', '바비큐립-1'], ['1', '바비큐립-2'], ['25', '바비큐립-1']];

    const expectedResults = [0, 2023, 2023 * 2, 0];
    const results = inputs.map((input) => (new PlannerService(new ReservationDay(input[0]), new Orders(input[1]))).getWeekendDiscount());

    expect(results).toEqual(expectedResults);
  });

  test("getSpecialDiscount 테스트", () => {
    const inputs = [['1', '초코케이크-1'], ['25', '초코케이크-1'], ['31', '초코케이크-1']];

    const expectedResults = [0, 1000, 1000];
    const results = inputs.map((input) => (new PlannerService(new ReservationDay(input[0]), new Orders(input[1]))).getSpecialDiscount());

    expect(results).toEqual(expectedResults);
  });

  test("getIsGiveawayEvent 테스트", () => {
    const inputs = [['1', '초코케이크-1'], ['1', '초코케이크-8'], ['25', '바비큐립-3']];

    const expectedResults = [false, true, true];
    const results = inputs.map((input) => (new PlannerService(new ReservationDay(input[0]), new Orders(input[1]))).getIsGiveawayEvent());

    expect(results).toEqual(expectedResults);
  });

  test("getGiveawayDiscount 테스트", () => {
    const inputs = [['1', '초코케이크-1'], ['1', '초코케이크-8'], ['25', '바비큐립-3']];

    const expectedResults = [0, restaurantRule.GIVE_AWAY_DISCOUNT, restaurantRule.GIVE_AWAY_DISCOUNT];
    const results = inputs.map((input) => (new PlannerService(new ReservationDay(input[0]), new Orders(input[1]))).getGiveawayDiscount());

    expect(results).toEqual(expectedResults);
  });

  test("getReservationDay 테스트", () => {
    const inputs = [['1', '초코케이크-1'], ['3', '초코케이크-8'], ['25', '바비큐립-3']];

    const expectedResults = [1, 3, 25];
    const results = inputs.map((input) => (new PlannerService(new ReservationDay(input[0]), new Orders(input[1]))).getReservationDay());

    expect(results).toEqual(expectedResults);
  });

  test("getOrderHistory 테스트", () => {
    const inputs = [['1', '초코케이크-1,샴페인-1'], ['3', '초코케이크-8,아이스크림-1,레드와인-1'], ['25', '바비큐립-3']];

    const expectedResults = [
      [{ menuName: '초코케이크', orderedCount: 1 }, { menuName: '샴페인', orderedCount: 1 }],
      [{ menuName: '초코케이크', orderedCount: 8 }, { menuName: '아이스크림', orderedCount: 1 }, { menuName: '레드와인', orderedCount: 1 }],
      [{ menuName: '바비큐립', orderedCount: 3 }],
    ];
    const results = inputs.map((input) => (new PlannerService(new ReservationDay(input[0]), new Orders(input[1]))).getOrderHistory());

    expect(results).toEqual(expectedResults);
  });

  test("getBeforeDiscountPrice 테스트", () => {
    const inputs = [['1', '초코케이크-1,샴페인-1'], ['3', '초코케이크-8,아이스크림-1,레드와인-1'], ['25', '바비큐립-3']];

    const expectedResults = [menu.초코케이크.price + menu.샴페인.price, menu.초코케이크.price * 8 + menu.아이스크림.price + menu.레드와인.price, menu.바비큐립.price * 3];
    const results = inputs.map((input) => (new PlannerService(new ReservationDay(input[0]), new Orders(input[1]))).getBeforeDiscountPrice());

    expect(results).toEqual(expectedResults);
  });

  test("getDiscountHistory 테스트", () => {
    const inputs = [['1', '초코케이크-1,샴페인-1,바비큐립-1'], ['3', '초코케이크-8,아이스크림-1,레드와인-1'], ['25', '바비큐립-3']];

    const expectedResults = [
      { christmas: 1000, weekday: 0, weekend: 2023, specialDay: 0, giveaway: 0 },
      { christmas: 1200, weekday: 2023*9, weekend: 0, specialDay: 1000, giveaway: 25000 },
      { christmas: 3400, weekday: 0, weekend: 0, specialDay: 1000, giveaway: 25000 },
    ];
    const results = inputs.map((input) => (new PlannerService(new ReservationDay(input[0]), new Orders(input[1]))).getDiscountHistory());

    expect(results).toEqual(expectedResults);
  });

  test("getTotalDiscountPrice 테스트", () => {
    const inputs = [['1', '초코케이크-1,샴페인-1,바비큐립-1'], ['3', '초코케이크-8,아이스크림-1,레드와인-1'], ['25', '바비큐립-3']];

    const expectedResults = [3023, 45407, 29400];
    const results = inputs.map((input) => (new PlannerService(new ReservationDay(input[0]), new Orders(input[1]))).getTotalDiscountPrice());

    expect(results).toEqual(expectedResults);
  });

  test("getTotalDiscountPrice 테스트", () => {
    const inputs = [['1', '초코케이크-1,샴페인-1,바비큐립-1'], ['3', '초코케이크-8,아이스크림-1,레드와인-1'], ['25', '바비큐립-3']];

    const expectedResults = [3023, 20407, 4400];
    const results = inputs.map((input) => (new PlannerService(new ReservationDay(input[0]), new Orders(input[1]))).getTotalDiscountWithoutGiveaway());

    expect(results).toEqual(expectedResults);
  });

  test("getAfterDiscountPrice 테스트", () => {
    const inputs = [['1', '초코케이크-1,샴페인-1,바비큐립-1'], ['3', '초코케이크-8,아이스크림-1,레드와인-1'], ['25', '바비큐립-3']];

    const expectedResults = [
      menu.초코케이크.price + menu.샴페인.price + menu.바비큐립.price - 3023,
      menu.초코케이크.price*8 + menu.아이스크림.price + menu.레드와인.price - 20407,
      menu.바비큐립.price*3 - 4400
    ];
    const results = inputs.map((input) => (new PlannerService(new ReservationDay(input[0]), new Orders(input[1]))).getAfterDiscountPrice());

    expect(results).toEqual(expectedResults);
  });

  test("getBadge 테스트", () => {
    const inputs = [['1', '초코케이크-1,샴페인-1,바비큐립-1'], ['3', '초코케이크-8,아이스크림-1,레드와인-1'], ['25', '바비큐립-1,아이스크림-1']];

    const expectedResults = [null, '산타', '별'];
    const results = inputs.map((input) => (new PlannerService(new ReservationDay(input[0]), new Orders(input[1]))).getBadge());

    expect(results).toEqual(expectedResults);
  });
});
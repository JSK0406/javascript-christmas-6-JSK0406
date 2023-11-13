import Event from '../../src/christmasPromotion/domain/Event.js';

describe('Event#domain 테스트', () => {
  const event = new Event();

  test('isGiveawayEvent 테스트', () => {
    const totalPrices = [150000, 120000, 90000, 0];
    
    const expectedResults = [true, true, false, false];

    const result = totalPrices.map((totalPrice) => {
      return event.isGiveawayEvent(totalPrice);
    });

    expect(result).toEqual(expectedResults);
  });

  test('calculateChristmasDiscount 테스트', () => {
    const days = [1, 5, 10, 24, 25];  // Controller에서 ChristmasDiscount에 대한 날짜 검증을 하기에 해당 조건이 충족되는 경우만 테스트

    const expectedResults = [1000, 1400, 1900, 3300, 3400];

    const result = days.map((day) => {
      return event.calculateChristmasDiscount(day);
    });

    expect(result).toEqual(expectedResults);
  });

  test('calculateWeekdayDiscount 테스트', () => {
    const dessertCounts = [1, 2, 3, 10];

    const expectedResults = [2023, 4046, 6069, 20230];

    const result = dessertCounts.map((count) => {
      return event.calculateWeekdayDiscount(count);
    });

    expect(result).toEqual(expectedResults);
  });

  test('calculateWeekendDiscount 테스트', () => {
    const mainCounts = [1, 2, 3, 10];

    const expectedResults = [2023, 4046, 6069, 20230];

    const result = mainCounts.map((count) => {
      return event.calculateWeekendDiscount(count);
    });

    expect(result).toEqual(expectedResults);
  });

  test('calculateSpecialDiscount 테스트', () => {
    const expectedResult = 1000;

    const result = event.calculateSpecialDiscount();

    expect(result).toEqual(expectedResult);
  });
});
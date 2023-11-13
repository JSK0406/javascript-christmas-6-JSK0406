import Discount from '../../src/christmasPromotion/domain/Discount.js';

describe('Discount#domain 테스트', () => {
  let discountArray;

  beforeEach(() => {
    const inputs = [
      [2000, 3000, 4000, 5000, 6000],
      [1000, 2000, 3000, 4000, 0],
      [1000, 2000, 2000, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    discountArray = inputs.map((input) => new Discount(...input));
  });

  test('calculateTotalDiscount 테스트', () => {
    const expectedResult = [20000, 10000, 5000, 0];

    const result = discountArray.map((discount) => {
      return discount.calculateTotalDiscount();
    });

    expect(result).toEqual(expectedResult);
  });

  test('isPossibleReceivingBadge 테스트', () => {
    const expectedResult = [true, true, true, false];

    const result = discountArray.map((discount) => {
      return discount.isPossibleReceivingBadge();
    });

    expect(result).toEqual(expectedResult);
  });

  test('checkEventBadge 테스트', () => {
    const expectedResult = ['산타', '트리', '별', null];

    const result = discountArray.map((discount) => {
      return discount.checkEventBadge();
    });

    expect(result).toEqual(expectedResult);
  });
});
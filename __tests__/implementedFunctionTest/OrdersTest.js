import Orders from '../../src/christmasPromotion/domain/Orders';
import errorMessage from '../../src/constants/errorMessage';

describe('Orders#domain 검증 테스트', () => {
  test('등록되지 않은 메뉴 입력 시 오류', () => {
    const inputs = ['치즈케이크-1,떡볶이-1', '초코케이크-1,떡볶이-1'];
    inputs.forEach((input) => {
      expect(() => new Orders(input)).toThrow(errorMessage.ORDERS);
    });
  });

  test('하나의 메뉴 수량이 20을 초과하거나 1미만일 때', () => {
    const inputs = ['초코케이크-1,샴페인-21', '초코케이크-1,샴페인-0'];
    inputs.forEach((input) => {
      expect(() => new Orders(input)).toThrow(errorMessage.ORDERS);
    });
  });

  test('하나의 메뉴 수량에 문자가 들어올 때', () => {
    const inputs = ['초코케이크-1,샴페인-a', '초코케이크-1,샴페인-*', '초코케이크-1,샴페인-!'];
    inputs.forEach((input) => {
      expect(() => new Orders(input)).toThrow(errorMessage.ORDERS);
    });
  });

  test('하나의 메뉴 수량에 정상적이지 않은 입력이 들어올 때', () => {
    const inputs = ['초코케이크-1,샴페인-02', '초코케이크-1,샴페인-+2', '초코케이크-1,샴페인-2.0'];
    inputs.forEach((input) => {
      expect(() => new Orders(input)).toThrow(errorMessage.ORDERS);
    });
  });

  test('하나의 메뉴 수량에 소수가 들어올 때', () => {
    const input = '초코케이크-1,샴페인-1.2';
    expect(() => new Orders(input)).toThrow(errorMessage.ORDERS);
  });

  test('하나의 메뉴 수량에 소수가 들어올 때', () => {
    const input = '초코케이크-1,샴페인-1.2';
    expect(() => new Orders(input)).toThrow(errorMessage.ORDERS);
  });

  test('음료만 시킬 경우', () => {
    const inputs = ['샴페인-1', '제로콜라-1'];
    inputs.forEach((input) => {
      expect(() => new Orders(input)).toThrow(errorMessage.ORDERS);
    });
  });

  test('메뉴의 총 개수가 20개 초과일 경우', () => {
    const inputs = ['샴페인-1,제로콜라-15,바비큐립-5', '제로콜라-1,초코케이크-20'];
    inputs.forEach((input) => {
      expect(() => new Orders(input)).toThrow(errorMessage.ORDERS);
    });
  });

  test('주문 목록에 겹치는 메뉴가 있을 경우', () => {
    const inputs = ['바비큐립-1,바비큐립-1', '바비큐립-1,제로콜라-2,바비큐립-1'];
    inputs.forEach((input) => {
      expect(() => new Orders(input)).toThrow(errorMessage.ORDERS);
    });
  });
});
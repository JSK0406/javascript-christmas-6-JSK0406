import Orders from '../../src/christmasPromotion/domain/Orders';
import errorMessage from '../../src/constants/errorMessage';
import menu from '../../src/constants/menu';

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

describe('Orders#domain 기능 테스트', () => {
  test('calculateTotalPrice 테스트', () => {
    const inputs = ['초코케이크-2,제로콜라-2', '바비큐립-1,해산물파스타-1,샴페인-1'];
    const expectedResults = [menu.초코케이크.price * 2 + menu.제로콜라.price * 2, menu.바비큐립.price + menu.해산물파스타.price + menu.샴페인.price];
    
    const results = inputs.map((input) => {
      return (new Orders(input)).calculateTotalPrice();
    });

    expect(results).toEqual(expectedResults);
  });

  test('calculateMainCount 테스트', () => {
    const inputs = ['초코케이크-2,제로콜라-2', '바비큐립-1,해산물파스타-1,샴페인-1'];
    const expectedResults = [0, 2];
    
    const results = inputs.map((input) => {
      return (new Orders(input)).calculateMainCount();
    });

    expect(results).toEqual(expectedResults);
  });

  test('calculateDessertCount 테스트', () => {
    const inputs = ['초코케이크-2,제로콜라-2', '바비큐립-1,해산물파스타-1,샴페인-1'];
    const expectedResults = [2, 0];
    
    const results = inputs.map((input) => {
      return (new Orders(input)).calculateDessertCount();
    });

    expect(results).toEqual(expectedResults);
  });

  test('calculateTotalCount 테스트', () => {
    const inputs = ['초코케이크-2,제로콜라-2', '바비큐립-1,해산물파스타-1,샴페인-1'];
    const expectedResults = [4, 3];
    
    const results = inputs.map((input) => {
      return (new Orders(input)).calculateTotalCount();
    });

    expect(results).toEqual(expectedResults);
  });

  test('getOrders 테스트', () => {
    const inputs = ['초코케이크-2,제로콜라-2', '바비큐립-1,해산물파스타-1,샴페인-1'];
    const expectedResults = [
      [{ menuName: '초코케이크', orderedCount: 2 }, { menuName: '제로콜라', orderedCount: 2 }],
      [{ menuName: '바비큐립', orderedCount: 1 }, { menuName:'해산물파스타', orderedCount: 1 }, { menuName: '샴페인', orderedCount: 1 }],
    ];
    
    const results = inputs.map((input) => {
      return (new Orders(input)).getOrders();
    });

    expect(results).toEqual(expectedResults);
  });

  test('extractMenuName 테스트', () => {
    const inputs = ['초코케이크-2,제로콜라-2', '바비큐립-1,해산물파스타-1,샴페인-1'];
    const expectedResults = [
      ['초코케이크', '제로콜라'],
      ['바비큐립', '해산물파스타', '샴페인'],
    ];
    
    const results = inputs.map((input) => {
      return (new Orders(input)).extractMenuName();
    });

    expect(results).toEqual(expectedResults);
  });
});
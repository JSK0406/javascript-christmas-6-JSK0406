import ReservationDay from '../../src/christmasPromotion/domain/ReservationDay';
import errorMessage from '../../src/constants/errorMessage';

describe('ReservationDay#domain 검증 테스트', () => {
  test('숫자가 아닌 문자 입력 시 오류', () => {
    const inputs = ['a', '-', '*', '1a', '1a1'];
    inputs.forEach((input) => {
      expect(() => new ReservationDay(input)).toThrow(errorMessage.RESERVATION_DAY);
    });
  });

  test('12월의 범위를 벗어난 날짜일 입력 시 오류', () => {
    const inputs = ['0', '32', '100'];
    inputs.forEach((input) => {
      expect(() => new ReservationDay(input)).toThrow(errorMessage.RESERVATION_DAY);
    });
  });

  test('정상적이지 않은 문자 입력 시 오류', () => {
    const inputs = ['01', '+1', '1.0'];
    inputs.forEach((input) => {
      expect(() => new ReservationDay(input)).toThrow(errorMessage.RESERVATION_DAY);
    });
  });

  test('소수 입력 시 오류', () => {
    const inputs = ['1.2', '29.9'];
    inputs.forEach((input) => {
      expect(() => new ReservationDay(input)).toThrow(errorMessage.RESERVATION_DAY);
    });
  });
});

describe('Orders#domain 기능 테스트', () => {
  test('isChristmasEvent 테스트', () => {
    const inputs = ['1', '2', '8', '9', '24', '25', '26', '27', '31'];
    const expectedResults = [true, true, true, true, true, true, false, false, false];
    
    const results = inputs.map((input) => {
      return (new ReservationDay(input)).isChristmasEvent();
    });

    expect(results).toEqual(expectedResults);
  });

  test('isWeekdayEvent 테스트', () => {
    const inputs = ['1', '2', '8', '9', '24', '25', '26', '27', '31'];
    const expectedResults = [false, false, false, false, true, true, true, true, true];
    
    const results = inputs.map((input) => {
      return (new ReservationDay(input)).isWeekdayEvent();
    });

    expect(results).toEqual(expectedResults);
  });

  test('isWeekendEvent 테스트', () => {
    const inputs = ['1', '2', '8', '9', '24', '25', '26', '27', '31'];
    const expectedResults = [true, true, true, true, false, false, false, false, false];
    
    const results = inputs.map((input) => {
      return (new ReservationDay(input)).isWeekendEvent();
    });

    expect(results).toEqual(expectedResults);
  });

  test('isSpecialEvent 테스트', () => {
    const inputs = ['1', '2', '8', '9', '24', '25', '26', '27', '31'];
    const expectedResults = [false, false, false, false, true, true, false, false, true];
    
    const results = inputs.map((input) => {
      return (new ReservationDay(input)).isSpecialEvent();
    });

    expect(results).toEqual(expectedResults);
  });

  test('getDay 테스트', () => {
    const inputs = ['1', '2', '8', '9', '24', '25', '26', '27', '31'];
    const expectedResults = inputs.map((num) => Number(num));
    
    const results = inputs.map((input) => {
      return (new ReservationDay(input)).getDay();
    });

    expect(results).toEqual(expectedResults);
  });
});
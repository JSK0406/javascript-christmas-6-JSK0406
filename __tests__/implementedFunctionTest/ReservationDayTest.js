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
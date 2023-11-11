import { Console } from '@woowacourse/mission-utils';
import { INPUT_VIEW_MESSAGE } from '../constants/viewMessage.js';

const InputView = {
  async inputReservationDayAsync() {
    return await Console.readLineAsync(INPUT_VIEW_MESSAGE.reservationDay);
  },
  async inputOrdersAsync() {
    return await Console.readLineAsync(INPUT_VIEW_MESSAGE.Orders);
  }
};

export default InputView;
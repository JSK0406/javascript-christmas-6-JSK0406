export const INPUT_VIEW_MESSAGE = Object.freeze({
  reservationDay: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  Orders: '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
});

export const OUTPUT_VIEW_MESSAGE = Object.freeze({
  programInit: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  introduceFn: (day) => `12월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  orderedMenusInit: '<주문 메뉴>',
  orderedMenuFn: (menuName, count) => `${menuName} ${count}개`,
  beforeDiscountInit: '<할인 전 총주문 금액>',
  beforeDiscountFn: (price) => `${price}원`,
  giveawayInit: '<증정 메뉴>',
  giveaway: '샴페인 1개',
  discountsInit: '<혜택 내역>',
  christmasDiscountFn: (price) => `크리스마스 디데이 할인: -${price}원`,
  weekdayDiscountFn: (price) => `평일 할인: -${price}원`,
  weekendDiscountFn: (price) => `주말 할인: -${price}원`,
  specialDiscountFn: (price) => `특별 할인: -${price}원`,
  giveawayDiscountFn: (price) => `증정 이벤트: -${price}원`,
  totalDiscountInit: '<총혜택 금액>',
  totalDiscountFn: (price) => `-${price}원`,
  afterDiscountInit: '<할인 후 예상 결제 금액>',
  afterDiscountFn: (price) => `${price}원`,
  badgeInit: '<12월 이벤트 배지>',
  nothing: '없음',
});
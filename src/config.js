// const BASELINE = 'http://10.58.6.7:8000';
const BASELINE_JINSUNG = 'http://10.58.7.250:8000';

export const API = {
  login: `${BASELINE_JINSUNG}/users/kakao/signin`,
  books: `${BASELINE_JINSUNG}/books/main`,
  book: `${BASELINE_JINSUNG}/books`,
  review: `${BASELINE_JINSUNG}/books/review`,
  purchase_books: `${BASELINE_JINSUNG}/orders/orderitems`,
  orders: `${BASELINE_JINSUNG}/orders`,
  carts: `${BASELINE_JINSUNG}/carts`,
};

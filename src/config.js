const BASELINE = 'http://3.36.72.182:8000';

export const API = {
  login: `${BASELINE}/users/kakao/signin`,
  books: `${BASELINE}/books/main`,
  book: `${BASELINE}/books`,
  review: `${BASELINE}/books/review`,
  purchase_books: `${BASELINE}/orders/orderitems`,
  orders: `${BASELINE}/orders`,
  carts: `${BASELINE}/carts`,
};

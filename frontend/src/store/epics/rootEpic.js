import { combineEpics } from 'redux-observable';
// import { signupEpic } from './signupEpic'
import { loginEpic } from './loginEpic'
import { userInfoChangeRequest } from './userEpic'
import { commentGetAllEpic, commentDeleteEpic, commentEditRequest } from './commentEpic'
import { productGetAllEpic, productGetOneEpic, addProductEpic, getProductByCategoryEpic } from './productEpic'
import { cartAddEpic, cartGetEpic, changeQuantityOfProductIntheCartEpic,
  subtractQuantityOfProductIntheCartEpic, removeProductFromCartEpic,
  increaseQuantityOfProductIntheCartEpic,
  emptyCartRequestEpic } from './cartEpic'
import { menuGetAllEpic } from './menuEpic'
import { paymentRequestEpic } from './paymentEpic'
import * as reviewEpic from './reviewEpic'
import { logoutEpic } from './logoutEpic'

export default combineEpics(
  // signupEpic,
  loginEpic,
  commentGetAllEpic,
  commentDeleteEpic,
  commentEditRequest,
  userInfoChangeRequest,
  productGetAllEpic,
  cartAddEpic,
  cartGetEpic,
  changeQuantityOfProductIntheCartEpic,
  subtractQuantityOfProductIntheCartEpic,
  productGetOneEpic,
  menuGetAllEpic,
  removeProductFromCartEpic,
  increaseQuantityOfProductIntheCartEpic,
  addProductEpic,
  getProductByCategoryEpic,
  paymentRequestEpic,
  emptyCartRequestEpic,
  paymentRequestEpic,
  reviewEpic.reviewSubmitRequestEpic,
  reviewEpic.getProductReviewEpic,
  reviewEpic.reviewDeleteRequestEpic,
  reviewEpic.reviewEditRequestEpic,
  logoutEpic,
);

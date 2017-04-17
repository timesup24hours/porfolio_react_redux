import { combineEpics } from 'redux-observable';
// import { signupEpic } from './signupEpic'
import { loginEpic } from './loginEpic'
import { userInfoChangeRequest } from './userEpic'
import * as commentEpic from './commentEpic'
import * as productEpic from './productEpic'
import * as cartEpic from './cartEpic'
import { menuGetAllEpic } from './menuEpic'
import { paymentRequestEpic } from './paymentEpic'
import * as reviewEpic from './reviewEpic'
import { logoutEpic } from './logoutEpic'
import * as departmentEpic from './departmentEpic'
import * as categoryEpic from './categoryEpic'
import * as subCategoryEpic from './subCategoryEpic'

export default combineEpics(
  // signupEpic,
  loginEpic,
  commentEpic.commentGetAllEpic,
  commentEpic.commentDeleteEpic,
  commentEpic.commentEditRequest,
  userInfoChangeRequest,
  cartEpic.cartAddEpic,
  cartEpic.cartGetEpic,
  cartEpic.changeQuantityOfProductIntheCartEpic,
  cartEpic.subtractQuantityOfProductIntheCartEpic,
  cartEpic.removeProductFromCartEpic,
  cartEpic.increaseQuantityOfProductIntheCartEpic,
  productEpic.addProductEpic,
  productEpic.productGetAllEpic,
  productEpic.productGetOneEpic,
  productEpic.getProductByCategoryEpic,
  cartEpic.emptyCartRequestEpic,
  paymentRequestEpic,
  reviewEpic.reviewSubmitRequestEpic,
  reviewEpic.getProductReviewEpic,
  reviewEpic.reviewDeleteRequestEpic,
  reviewEpic.reviewEditRequestEpic,
  menuGetAllEpic,
  logoutEpic,
  departmentEpic.addDepartmentRequestEpic,
  departmentEpic.deleteDepartmentRequestEpic,
  departmentEpic.eidtDepartmentRequestEpic,
  categoryEpic.addCategoryRequestEpic,
  categoryEpic.eidtCategoryRequestEpic,
  categoryEpic.deleteCategoryRequestEpic,
  subCategoryEpic.addSubCategoryRequestEpic,
  subCategoryEpic.eidtSubCategoryRequestEpic,
  subCategoryEpic.deleteSubCategoryRequestEpic,
  productEpic.getProductByOwnserEpic,
);

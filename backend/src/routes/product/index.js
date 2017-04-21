import getAllProduct from './getAllProduct'
import getOneProduct from './getOneProduct'
import addProduct from './addProductS3'
import deleteProduct from './deleteProduct'
import getProductsByowner from './getProductsByowner'
import putProduct from './putProductS3'
import getCurrentEditProductByOnwer from './getCurrentEditProductByOnwer'

export default (app) => {
  getAllProduct(app)
  getOneProduct(app)
  addProduct(app)
  deleteProduct(app)
  getProductsByowner(app)
  putProduct(app)
  getCurrentEditProductByOnwer(app)
}

import getAllProduct from './getAllProduct'
import getOneProduct from './getOneProduct'
import addProduct from './addProduct'
import deleteProduct from './deleteProduct'
import getProductsByowner from './getProductsByowner'

export default (app) => {
  getAllProduct(app)
  getOneProduct(app)
  addProduct(app)
  deleteProduct(app)
  getProductsByowner(app)
}

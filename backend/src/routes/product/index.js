import getAllProduct from './getAllProduct'
import getOneProduct from './getOneProduct'
import addProduct from './addProduct'
import deleteProduct from './deleteProduct'
import getProductsByOwner from './getProductsByOwner'
import putProduct from './putProduct'
import getCurrentEditProductByOnwer from './getCurrentEditProductByOnwer'

export default (app) => {
  getAllProduct(app)
  getOneProduct(app)
  addProduct(app)
  deleteProduct(app)
  getProductsByOwner(app)
  putProduct(app)
  getCurrentEditProductByOnwer(app)
}

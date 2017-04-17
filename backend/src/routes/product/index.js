import getAllProduct from './getAllProduct'
import getOneProduct from './getOneProduct'
import addProduct from './addProduct'
import deleteProduct from './deleteProduct'
import getProductsByOwner from './getProductsByOwner'
import putProduct from './putProduct'

export default (app) => {
  getAllProduct(app)
  getOneProduct(app)
  addProduct(app)
  deleteProduct(app)
  getProductsByOwner(app)
  putProduct(app)
}

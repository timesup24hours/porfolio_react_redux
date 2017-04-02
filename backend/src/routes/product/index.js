import getAllProduct from './getAllProduct'
import getOneProduct from './getOneProduct'
import addProduct from './addProduct'
import deleteProduct from './deleteProduct'
import getByCategoryProduct from './getByCategoryProduct'

export default (app) => {
  getAllProduct(app)
  getOneProduct(app)
  addProduct(app)
  deleteProduct(app)
  getByCategoryProduct(app)
}

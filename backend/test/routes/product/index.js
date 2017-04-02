import addProduct from './addProduct'
import getAllProduct from './getAllProduct'
import getOneProduct from './getOneProduct'
import getByCategoryProduct from './getByCategoryProduct'
import deleteProduct from './deleteProduct'

export default (app, test) => {
  addProduct(app, test)
  getAllProduct(app, test)
  getOneProduct(app, test)
  getByCategoryProduct(app, test)
  deleteProduct(app, test)
}

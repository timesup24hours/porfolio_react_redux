import getCategory from './getCategory'
import postCategory from './postCategory'
import putCategory from './putCategory'
import deleteCategory from './deleteCategory'
import getByCategoryProduct from './getByCategoryProduct'

export default (app) => {
  getCategory(app)
  postCategory(app)
  putCategory(app)
  deleteCategory(app)
  getByCategoryProduct(app)
}

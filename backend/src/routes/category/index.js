import getCategory from './getCategory'
import postCategory from './postCategory'
import putCategory from './putCategory'
import deleteCategory from './deleteCategory'

export default (app) => {
  getCategory(app)
  postCategory(app)
  putCategory(app)
  deleteCategory(app)
}

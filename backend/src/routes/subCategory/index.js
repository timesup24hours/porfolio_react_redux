import getSubCategory from './getSubCategory'
import postSubCategory from './postSubCategory'
import putSubCategory from './putSubCategory'
import deleteSubCategory from './deleteSubCategory'

export default (app) => {
  getSubCategory(app)
  postSubCategory(app)
  putSubCategory(app)
  deleteSubCategory(app)
}

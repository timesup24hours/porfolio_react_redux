import getCategory from './getCategory'
import postCategory from './postCategory'
import putCategory from './putCategory'

export default (app) => {
  getCategory(app)
  postCategory(app)
  putCategory(app)
}

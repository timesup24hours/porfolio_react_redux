import postReview from './postReview'
import getReview from './getReview'
import deleteReview from './deleteReview'
import putReview from './putReview'

export default (app) => {
  postReview(app)
  getReview(app)
  deleteReview(app)
  putReview(app)
}

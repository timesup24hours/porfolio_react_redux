import postComment from './postComment'
import getAllComment from './getAllComment'
import deleteComment from './deleteComment'
import putComment from './putComment'

export default (app) => {
  postComment(app)
  getAllComment(app)
  deleteComment(app)
  putComment(app)
}

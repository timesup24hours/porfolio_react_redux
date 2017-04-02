import postComment from './postComment'
import getAllComment from './getAllComment'
import putComment from './putComment'
import deleteComment from './deleteComment'

export default (app, test) => {
  postComment(app, test)
  getAllComment(app, test)
  putComment(app, test)
  deleteComment(app, test)
}

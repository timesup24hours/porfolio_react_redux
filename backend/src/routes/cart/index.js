import postCart from './postCart'
import getCart from './getCart'
import deleteCart from './deleteCart'
import putCart from './putCart'

export default (app) => {
  postCart(app)
  getCart(app)
  deleteCart(app)
  putCart(app)
}

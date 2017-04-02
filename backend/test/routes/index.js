import auth from './auth'
import user from './user'
import comment from './comment'
import product from './product'
// import cart from './cart'

export default (app, test) => {
  auth(app, test)
  user(app, test)
  comment(app, test)
  product(app, test)
  // cart(app, test)
}

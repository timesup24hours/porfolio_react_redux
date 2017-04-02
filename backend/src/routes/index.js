import auth from './auth'
import message from './message'
import comment from './comment'
import user from './user'
import product from './product'
import cart from './cart'
import department from './department'
import category from './category'
import subCategory from './subCategory'
import menu from './menu'

export default (app) => {
   auth(app)
   message(app)
   comment(app)
   user(app)
   product(app)
   cart(app)
   department(app)
   category(app)
   subCategory(app)
   menu(app)
}

import React from 'react'
import { Route, IndexRoute } from 'react-router'
// import { requireAuth } from '../utils'

import App from '../components/App'
import Home from '../components/home/Home'
import Login from '../components/login/Login'
import Signup from '../components/signup/Signup'
import Message from '../components/message/Message'
import Comment from '../components/comment/Comment'
import Learning from '../components/learning/Learning'
// import SmoothAutoScrollAnimation from '../components/learning/SmoothAutoScrollAnimation'
import Error404 from '../components/error404/Error404'
import Profile from '../components/profile/Profile'
import Shop from '../components/shop/Shop'
import ShopByCategory from '../components/shop/ShopByCategory'
import ShopByDepartment from '../components/shop/ShopByDepartment'
import Cart from '../components/cart/Cart' // eslint-disable-line
import ProductDetailPage from '../components/product/ProductDetailPage'
import AddProductFormMaterialUI from '../components/upload/AddProductFormMaterialUI'
import CategoryPage from '../components/category/CategoryPage'


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path='/login' component={Login} />
    <Route path='/signup' component={Signup} />
    <Route path='/message' component={Message} />
    <Route path='/comment' component={Comment} />
    <Route path='/learning' component={Learning} />
    <Route path='/profile' component={Profile} />
    <Route path='/shop' component={Shop} />
    <Route path='/cart' component={Cart} />
    <Route path='/upload_product' component={AddProductFormMaterialUI} />
    <Route path='/category_setup' component={CategoryPage} />
    <Route path='/product/:id' component={ProductDetailPage} />
    <Route path='/shop/:department/:category' component={ShopByCategory} />
    <Route path='/shop/:department' component={ShopByDepartment} />
    <Route path="*" component={Error404} />
  </Route>
)

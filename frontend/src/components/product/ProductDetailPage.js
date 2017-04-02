import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as productActions from '../../store/actions/productActions'
import ProductDetail from './ProductDetail'
import Spinner from '../spinner/Spinner'
import * as cartActions from '../../store/actions/cartActions'

class ProductDetailPage extends Component {

  componentDidMount() {
    this.props.getOneProductsRequest({ id: this.props.params.id })
  }

  render() {
    if(this.props.product.success) {
      return (
        <div className='ProductDetailPage-container'>
          <ProductDetail product={this.props.product.currentProduct} cart={this.props.cart}/>
        </div>
      )
    } else {
      return <Spinner />
    }
  }

  componentWillUnMount() {
    this.props.clearThrCurrentProductFromCart()
  }

}

const mapStateToProps = state => ({
  product: state.product,
  cart: state.cart,
})
const mapDispatchToProps = dispatch => ({
  getOneProductsRequest: payload => dispatch(productActions.getOneProductsRequest(payload)),
  clearThrCurrentProductFromCart: payload => dispatch(cartActions.clearThrCurrentProductFromCart(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage)

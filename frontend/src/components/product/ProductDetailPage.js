import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as productActions from '../../store/actions/productActions'
import ProductDetail from './ProductDetail'
import Spinner from '../spinner/Spinner'
import * as cartActions from '../../store/actions/cartActions'
import * as reviewActions from '../../store/actions/reviewActions'

class ProductDetailPage extends Component {

  componentDidMount() {
    this.props.getOneProductsRequest({ id: this.props.params.id })
    this.props.getProductReviewRequest({ id: this.props.params.id })
  }

  render() {
    if(this.props.product.currentProduct) {
      return (
        <div className='ProductDetailPage-container'>
          <ProductDetail
            product={this.props.product.currentProduct}
            review={this.props.review.currentProductReview || []}
            cart={this.props.cart}
            auth={this.props.auth}
            deleteRequest={this.props.reviewtDeleteRequest}
            editRequest={this.props.reviewtEditRequest}
          />
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
  review: state.review,
  cart: state.cart,
  auth: state.auth,
})
const mapDispatchToProps = dispatch => ({
  reviewtDeleteRequest: paypload => dispatch(reviewActions.reviewtDeleteRequest(paypload)),
  reviewtEditRequest: paypload => dispatch(reviewActions.reviewtEditRequest(paypload)),
  getOneProductsRequest: payload => dispatch(productActions.getOneProductsRequest(payload)),
  clearThrCurrentProductFromCart: payload => dispatch(cartActions.clearThrCurrentProductFromCart(payload)),
  getProductReviewRequest: payload => dispatch(reviewActions.getProductReviewRequest(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as cartActions from '../../store/actions/cartActions'
import ProductInTheCart from './ProductInTheCart'
import Calculator from '../calculator/Calculator'
// import StripePay from './StripePay'
import LoadingMask from '../mask/LoadingMask'

const mapStateToProps = state => ({
  cart: state.cart,
  totalQuantity: state.cart.totalQuantity,
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  getCartRequest: () => dispatch(cartActions.getCartRequest()),
})

export class Cart extends Component {

  static propTypes = {
    cart: PropTypes.object,
    totalQuantity: PropTypes.number,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    this.props.getCartRequest()
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.context.router.push('/');
    }
  }

  render() {
    const cart = this.props.cart.cart.map((p, i) => {
      return (
        <ProductInTheCart
          key={i}
          product={p}
        />
      )
    })

    return (
      <div className='Cart-container'>
        {this.props.cart.pending
          ? <LoadingMask />
          : this.props.cart.cart.length === 0
            ? <div className='Cart-no-items'>No items</div>
            : (<div className='Cart-wrapper'>

                <div className='Cart-calculator'>
                  <Calculator cart={this.props.cart} />
                </div>

                <div className='Cart-order-holder'>
                  <div className='Cart-order-title'>Review Your Order:</div>
                  {cart}
                </div>

              </div>)
        }


      </div>
    )

  }
}
// {this.props.cart.creditCardForm.show ? <StripePay cart={this.props.cart}  /> : null}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

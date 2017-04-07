import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as cartActions from '../../store/actions/cartActions'
import ProductInTheCart from './ProductInTheCart'
import Calculator from '../calculator/Calculator'
import StripePay from './StripePay'

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
    cart: React.PropTypes.object,
    totalQuantity: React.PropTypes.number,
  }

  static contextTypes = {
    router: React.PropTypes.object,
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
        {this.props.totalQuantity === 0
          ? <div className='Cart-no-items'>No items</div>
          : (<div className='Cart-wrapper'>
              <div className='Cart-order-holder'>
                <div className='Cart-order-title'>Review Your Order:</div>
                {cart}
              </div>
              <div className='Cart-calculator'>
                <Calculator cart={this.props.cart} />
                {this.props.cart.creditCardForm.show ? <StripePay cart={this.props.cart}  /> : null}
              </div>
            </div>)
        }
      </div>
    )

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

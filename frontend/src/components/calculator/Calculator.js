import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showCreditCardForm } from '../../store/actions/cartActions'

class Calculator extends Component {

  render() {
    return (
      <div className='Calculator-container'>

        <div className='Calculator-button'>
          {this.props.cart.creditCardForm.show}
          <button
            id='Calculator-button'
            className='btn btn-primary'
            onClick={() => this.props.showCreditCardForm()} >
            Place your order
          </button>
        </div>

        <div className='Calculator-holder'>
          <div className='Calculator-div Calculator-order-summary'>Order Summary</div>
          <div className='Calculator-div'>
            <div>Items ({this.props.cart.totalQuantity}):</div>
            <div>$ {this.props.cart.total}</div>
          </div>
          <div className='Calculator-div Calculator-shipping-handling'>
            <div>Shipping & handling:</div>
            <div>$ </div> {/* shipping fee calcu function needed */}
          </div>
          <div className='Calculator-divider'>
            <div></div>
          </div>
          <div className='Calculator-div'>
            <div>Total before tax:</div>
            <div>$ </div> {/* total + shipping */}
          </div>
          <div className='Calculator-div'>
            <div>Estimated tax to be collected:</div>
            <div>$ </div> {/* tax */}
          </div>
          <div className='Calculator-divider'>
            <div></div>
          </div>
          <div className='Calculator-div Calculator-total-summary'>
            <div>Order Total: </div>
            <div>$ {this.props.cart.total}</div> {/* order total */}
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({
  showCreditCardForm: () => dispatch(showCreditCardForm())
})

export default connect(mapStateToProps, mapDispatchToProps)(Calculator)

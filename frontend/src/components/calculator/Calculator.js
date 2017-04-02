import React from 'react'

const Calculator = props => {
  return (
    <div className='Calculator-container'>
      <div className='Calculator-button'>
        <button
          className='waves-effect waves-light btn blue'
          onClick={() => console.log('Calculator.js place order implementation needed!')} >
          Place your order
        </button>
      </div>
      <div className='Calculator-holder'>
        <div className='Calculator-div Calculator-order-summary'>Order Summary</div>
        <div className='Calculator-div'>
          <div>Items ({props.cart.totalQuantity}):</div>
          <div>$ {props.cart.total}</div>
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
          <div>Order Total:</div>
          <div>$</div> {/* order total */}
        </div>
      </div>
    </div>
  )
}

export default Calculator

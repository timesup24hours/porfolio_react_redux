import React from 'react'
import { connect } from 'react-redux'
import * as cartActions from '../../store/actions/cartActions'
import { browserHistory } from 'react-router'
import { sliceContent } from '../../utils'

const Product = props => {
  const { _id, name, desc, price, images } = props.product

  // const handleAddCard = e => {
  //   e.stopPropagation()
  //   props.increaseQuantityOfProductInTheCart({ productId: _id })
  // }

  return (
    <div className='Product-container' style={{ cursor: 'pointer' }}
      onClick={() => browserHistory.push(`/product/${_id}`)}>

            <div className="Product-image">
              <img
                src={`/images/products/${images[0]}`} alt=''/>
            </div>

            <div className="Product-content">
              <div className="Product-name grey-text text-darken-4">{sliceContent(name, 20)}</div>
              <div className='Product-price blue-text'>{`$ ${price}`}</div>
              <p className='Product-desc grey-text'>{sliceContent(desc, 100)}</p>
            </div>

          {/* Add Cart Button
            <div className='Product-addCard'>
              <button className="waves-effect waves-light btn" onClick={e => handleAddCard(e)} />Add Cart</button>
            </div>
          */}

    </div>
  )
}

const mapStateToProps = state => ({
  cart: state.cart,
})

const mapDispatchToProps = dispatch => ({
  increaseQuantityOfProductInTheCart: payload => dispatch(cartActions.increaseQuantityOfProductInTheCart(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)

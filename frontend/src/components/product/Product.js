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
      <div className='row'>
        <div className="col">

          <div className="card">
            <div className="card-image">
              <img style={{ maxWidth: '210px', minWidth: '210px', height: '210px' }} src={`/images/products/${images[0]}`} alt=''/>
            </div>
            <div className="card-content Product-content">
              <div className="Product-name grey-text text-darken-4">{name}</div>
              <div className='Product-price blue-text'>{`$ ${price}`}</div>
              <p className='Product-desc grey-text'>{sliceContent(desc, 100)}</p>
            </div>
          </div>

          {/* Add Cart Button
            <div className='Product-addCard'>
              <button className="waves-effect waves-light btn" onClick={e => handleAddCard(e)} />Add Cart</button>
            </div>
          */}

        </div>
      </div>
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

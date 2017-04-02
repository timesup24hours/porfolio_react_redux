import React, { Component } from 'react'
import { connect } from 'react-redux'
// import Add from 'material-ui/svg-icons/content/add'
// import Remove from 'material-ui/svg-icons/content/remove'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as cartActions from '../../store/actions/cartActions'
import { Link } from 'react-router'
// import { sliceContent } from '../../utils'

export class ProductInTheCart extends Component {
  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleAddQuantity = () => {
    this.props.increaseQuantityOfProductInTheCart({ productId: this.props.product.product._id })
  }

  handleSubtractQuantity = () => {
    this.props.subtractQuantityOfProductIntheCart({ productId: this.props.product.product._id })
  }

  handleConfirmRemoveItemFromCart = () => {
    this.props.removeProductFromCart({ productId: this.props.product.product._id })
    this.handleClose()
  }

  render() {
    const actions = [
      <FlatButton
        label='No'
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label='Yes'
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleConfirmRemoveItemFromCart}
      />,
    ]
    const { images, _id, name, price, soldBy  } = this.props.product.product
    return (
      <div className='ProductInTheCart-container'>

        <div className='ProductInTheCart-info-container'>
          <div className='ProductInTheCart-img'>
            <img src={`/images/products/${images[0]}`} alt=""/>
          </div>
          <div className='ProductInTheCart-info-holder'>
            <div className='ProductInTheCart-div ProductInTheCart-info-name'>
              <Link to={`/product/${_id}`}>{name}</Link>
            </div>
            <div className='ProductInTheCart-div ProductInTheCart-info-price'>${price}</div>
            {/*<div className='ProductInTheCart-div ProductInTheCart-info-desc'>{sliceContent(desc, 100)}</div>*/}

            <div className='ProductInTheCart-div ProductInTheCart-info-quantity-section'>
              <div className='ProductInTheCart-info-quantity'><strong>Quantity:</strong> {this.props.product.quantity}</div>
              <div className='ProductInTheCart-info-quantity-change' onClick={this.handleAddQuantity}>Add</div>
              {this.props.product.quantity === 1
                ? null
                : <div className='ProductInTheCart-info-quantity-change' onClick={this.handleSubtractQuantity}>Substract</div>
              }{/*? <div className='ProductInTheCart-info-quantity-change' onClick={this.handleOpen}>remove</div>*/}
            </div>
            <div className='ProductInTheCart-info-seller text-flow'>Sold by : {soldBy || ''}</div>
          </div>
        </div>

        <div className='ProductInTheCart-right-session'>
          <button
            className='waves-effect waves-light btn pink'
            onClick={this.handleOpen} >
            Remove
          </button>
        </div>

        <Dialog
          title={this.props.totalQuantity === 1 ? 'Remove and Redirect Confirmation' : 'Remove Confirmation'}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.props.totalQuantity === 1
            ? <div>Are you want to remove the last item from the cart, and Redirect to the Shop Page</div>
            : <div>Are you want to remove this item from the cart?</div>
          }
        </Dialog>

      </div>
    )
  }

}
const mapStateToProps = state => ({
  totalQuantity: state.cart.totalQuantity,
})

const mapDispatchToProps = dispatch => ({
  // changeQuantityOfProductIntheCart: payload => dispatch(cartActions.changeQuantityOfProductIntheCart(payload)),
  subtractQuantityOfProductIntheCart: payload => dispatch(cartActions.subtractQuantityOfProductIntheCart(payload)),
  increaseQuantityOfProductInTheCart: payload => dispatch(cartActions.increaseQuantityOfProductInTheCart(payload)),
  removeProductFromCart: payload => dispatch(cartActions.removeProductFromCart(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductInTheCart)

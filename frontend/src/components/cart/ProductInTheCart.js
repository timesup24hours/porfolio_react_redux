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
        id='ProductInTheCart-remove'
        label='Yes'
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleConfirmRemoveItemFromCart}
      />,
    ]
    const { images, _id, name, price, soldBy, deleted  } = this.props.product.product
    return (
      <div className='ProductInTheCart-container'>

        <div className='ProductInTheCart-info-container'>

          {deleted
            ? <div className='ProductInTheCart-product-deleted flexCenter'>
                <div>this product has been deleted by seller</div>
              </div>
            : null
          }
          <div className='ProductInTheCart-img'>
            {/* without s3
                <img src={`/images/products/${images[0]}`} alt=""/>
              */}
            <img src={images[0]} alt=""/>
          </div>
          <div className='ProductInTheCart-info-holder'>
            <div className='ProductInTheCart-div ProductInTheCart-info-name'>
              <Link to={`/product/${_id}`}>{name}</Link>
            </div>
            <div className='ProductInTheCart-div ProductInTheCart-info-price'>${price}</div>
            {/*<div className='ProductInTheCart-div ProductInTheCart-info-desc'>{sliceContent(desc, 100)}</div>*/}

            <div className='ProductInTheCart-div ProductInTheCart-info-quantity-section'>
              <div className='ProductInTheCart-info-quantity'><strong>Quantity:</strong> {this.props.product.quantity}</div>
              <span id='ProductInTheCart-add' className='ProductInTheCart-info-quantity-change glyphicon glyphicon-plus' aria-hidden="true" onClick={this.handleAddQuantity}></span>
              {this.props.product.quantity === 1
                ? null
                : <span id='ProductInTheCart-substract' className='ProductInTheCart-info-quantity-change glyphicon glyphicon-minus' onClick={this.handleSubtractQuantity}></span>
              }{/*? <div className='ProductInTheCart-info-quantity-change' onClick={this.handleOpen}>remove</div>*/}
            </div>
            <div className='ProductInTheCart-info-seller text-flow'>Sold by : {soldBy || ''}</div>
          </div>
        </div>

        <div className='ProductInTheCart-right-session'>
          <button
            id='ProductInTheCart-open-dialog'
            className='btn btn-danger'
            onClick={this.handleOpen}>
            Remove
          </button>
        </div>

        <Dialog
          id='ProductInTheCart-Dialog'
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

ProductInTheCart.propTypes = {
  totalQuantity: React.PropTypes.number.isRequired,
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

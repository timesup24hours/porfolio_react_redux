import React, { Component } from 'react'
import { connect } from 'react-redux'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import * as cartActions from '../../store/actions/cartActions'
import { isTheProductInTheCart, hundredArray } from '../../utils'
import { browserHistory } from 'react-router'
import { snackbarOpen } from '../../store/actions/snackbarActions'

class ProductDetailAddCart extends Component {
  state = {
    quantity: 1,
  }

  setTheQuantityOfTheProductToTheState = (props) => {
    let product = props.cart.cart.filter(c => c.product._id === props.product._id)
    if(product.length) {
      this.setState({ quantity: product[0].quantity })
    } else {
      this.setState({ quantity: 1 })
    }
  }

  componentDidMount() {
    this.setTheQuantityOfTheProductToTheState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setTheQuantityOfTheProductToTheState(nextProps)
  }

  handleChange = (event, index, quantity) => {
    this.setState({ quantity })
    if(isTheProductInTheCart(this.props.cart.cart, this.props.product._id)) {
      this.props.changeQuantityOfProductIntheCart({ productId: this.props.product._id, quantity })
      this.props.snackbarOpen(`Change ${quantity} quantity of this product in the Shopping Cart`)
    }
  }

  handleAddProductToTheCart = () => {
    this.props.addCartRequest({ productId: this.props.product._id, quantity: this.state.quantity })
    this.props.snackbarOpen(`Add ${this.state.quantity} quantity of this product into the Shopping Cart`)
  }

  handleRemoveProductFromCart = () => {
    this.props.removeProductFromCart({ productId: this.props.product._id })
    this.props.snackbarOpen(`Remove this product from the Shopping Cart`)
    this.setState({ quantity: 1 })
  }

  displayShippingAddress = () => {
    if(this.props.auth.user.address) {
      return (<div>
                <div>{this.props.auth.user.address.street}</div>
                <div>{this.props.auth.user.address.city}, {this.props.auth.user.address.state} {this.props.auth.user.address.zipcode}</div>
              </div>)
    } else {
      return null
    }
  }

  render() {

    const { _id } = this.props.product
    const { cart } = this.props.cart
    const menuItem = hundredArray().map(e => <MenuItem key={e} value={e} primaryText={e} />)
    return (
      <div className='ProductDetailAddCart-container'>

        <div>
          <SelectField
              floatingLabelText="Quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
              style={{ width: '100px' }}
              maxHeight={240}
            >
              {menuItem}
            </SelectField>
          {isTheProductInTheCart(cart, _id)
            ? <div>
                <button
                  className='waves-effect waves-light btn pink center ProductDetailAddCart-button'
                  onClick={this.handleRemoveProductFromCart} >
                  <i className="material-icons center">remove_shopping_cart</i><span>Remove</span>
                </button>
              </div>
            : <div>
                <button
                  disabled={ !this.props.auth.isAuthenticated }
                  className='waves-effect waves-light btn blue center ProductDetailAddCart-button'
                  onClick={this.handleAddProductToTheCart} >
                  <i className="material-icons center">add_shopping_cart</i><span>Add Cart</span>
                </button>
                { !this.props.auth.isAuthenticated ?
                  <div className='ProductDetailAddCart-login'>
                    <button
                      className='waves-effect waves-light btn blue center'
                      onClick={() => browserHistory.push('/login')} >
                      <span>LOGIN</span>
                    </button>
                  </div>
                : null }
              </div>
          }
        </div>

        { this.props.auth.user ?
          <div className='ProductDetailAddCart-ship-to'>
            <div><strong>Ship to :</strong></div>
            <div>{this.displayShippingAddress()}</div>
          </div>
        : null }

      </div>
    )
  }

  componentWillUnMount() {
    this.setState({ quantity: 1 })
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})
const mapDispatchToProps = dispatch => ({
  addCartRequest: payload => dispatch(cartActions.addCartRequest(payload)),
  changeQuantityOfProductIntheCart: payload => dispatch(cartActions.changeQuantityOfProductIntheCart(payload)),
  subtractQuantityOfProductIntheCart: payload => dispatch(cartActions.subtractQuantityOfProductIntheCart(payload)),
  removeProductFromCart: payload => dispatch(cartActions.removeProductFromCart(payload)),
  setThrCurrentProductFromCart: payload => dispatch(cartActions.setThrCurrentProductFromCart(payload)),
  clearThrCurrentProductFromCart: payload => dispatch(cartActions.clearThrCurrentProductFromCart(payload)),
  snackbarOpen: payload => dispatch(snackbarOpen(payload)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailAddCart)

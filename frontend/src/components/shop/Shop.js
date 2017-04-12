import React, { Component } from 'react'
import Product from '../product/Product'
import { connect } from 'react-redux'
import * as productActions from '../../store/actions/productActions'
import LeftSideBar from '../leftSideBar/LeftSideBar'

class Shop extends Component {

  componentDidMount() {
    this.props.getAllProductsRequest()
  }

  render() {
    const products = this.props.product.products.map((p, i) => {
      return (
        <Product key={i}
          product={p}
        />
      )
    })

    return (
      <div className='Shop-container'>
        <LeftSideBar />
        <div className='Shop-product-holder'>
          {products}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.product,
  cart: state.cart,
})

const mapDispatchToProps = dispatch => ({
  getAllProductsRequest: () => dispatch(productActions.getAllProductsRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Shop)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as productActions from '../../store/actions/productActions'
import CircularProgress from 'material-ui/CircularProgress'
import Product from '../product/Product'


class EditProductPage extends Component {

  componentDidMount() {
    this.props.getProductsByOwner()
  }

  render() {

    return this.props.product.onwerProducts ? (
      <div className='EditProductPage container' style={{ marginTop: '70px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {this.props.product.onwerProducts.map((p, i) => {
          return <Product key={i} product={p} />
        })}
      </div>
    ) : <div className="flexCenter"><CircularProgress size={50} thickness={3}/></div>
  }
}

const mapStateToProps = state => ({
  product: state.product
})
const mapDispatchToProps = dispatch => ({
  getProductsByOwner: () => dispatch(productActions.getProductsByOwner())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProductPage)

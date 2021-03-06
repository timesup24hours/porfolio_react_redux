import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../spinner/Spinner'
import * as productActions from '../../store/actions/productActions'
import { routeParamsFormatToName } from '../../utils'
import Product from '../product/Product'
import { Link } from 'react-router'

class ShopByCategory extends Component {

  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    this.props.setCurrentDepartmentAndCategory({
      department: { name: routeParamsFormatToName(this.context.router.params.department), to: this.context.router.params.department },
      category: { name: routeParamsFormatToName(this.context.router.params.category), to: this.context.router.params.category },
    })
    let category = this.props.category.filter(c => {
      if(c.to === this.context.router.params.category) {
        return c
      }
      return false
    })
    this.props.getCurrentCategoryProductsRequest(category[0]._id)
  }

  render() {
    return (
      <div className='ShopByCategory-container marginTop50px'>

        <ol className="breadcrumb">
          <li><Link to={`/shop/${this.context.router.params.department}`} className="breadcrumb">{routeParamsFormatToName(this.context.router.params.department)}</Link></li>
          <li><Link to={`/shop/${this.context.router.params.department}/${this.context.router.params.category}`} className="breadcrumb">{routeParamsFormatToName(this.context.router.params.category)}</Link></li>
        </ol>

        {this.props.product.currentCategoryProducts.length > 0 && !this.props.product.error
            ?
              (<div className='ShopByCategory-product-display'>
                {this.props.product.currentCategoryProducts.map((p, i) => {
                  return <Product key={i} product={p} />
                })}
              </div>)
            : this.props.product.error
              ? <div className='full-screen-center-sub-50px'>{this.props.product.errors.message}</div>
              : <div className='full-screen-center'><Spinner /></div>}
      </div>
    )
  }


  // render() {
  //   if(this.props.product.currentCategoryProducts.length > 0) {
  //     return (<div className='ShopByCategory-container container flexRowWrap marginTop50px'>
  //               {this.props.product.currentCategoryProducts.map((p, i) => {
  //                 return <Product key={i} product={p} />
  //               })}
  //             </div>)
  //   } else if(this.props.product.error) {
  //     return <div className='full-screen-center'>{this.props.product.errors.message}</div>
  //   } else {
  //     return <div className='full-screen-center'><Spinner /></div>
  //   }
  // }
}

const mapStateToProps = state => ({
  product: state.product,
})
const mapDispatchToProps = dispatch => ({
  getCurrentCategoryProductsRequest: payload => dispatch(productActions.getCurrentCategoryProductsRequest(payload)),
  setCurrentDepartmentAndCategory: payload => dispatch(productActions.setCurrentDepartmentAndCategory(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopByCategory)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from '../spinner/Spinner'
import * as productActions from '../../store/actions/productActions'
import { routeParamsFormatToName } from '../../utils'
import Product from '../product/Product'
import { Link } from 'react-router'

class ShopByCategory extends Component {

  static contextTypes = {
    router: React.PropTypes.object,
  }

  componentDidMount() {
    this.props.setCurrentDepartmentAndCategory({
      department: { name: routeParamsFormatToName(this.context.router.params.department), to: this.context.router.params.department },
      category: { name: routeParamsFormatToName(this.context.router.params.category), to: this.context.router.params.category },
    })
    this.props.getCurrentCategoryProductsRequest(routeParamsFormatToName(this.context.router.params.category))
  }

  render() {
    return (
      <div className='ShopByCategory-container marginTop50px'>
        <nav>
          <div className="nav-wrapper blue">
            <div className='row'>
              <div className="col">
                <Link to={`/shop/${this.context.router.params.department}`} className="breadcrumb">{routeParamsFormatToName(this.context.router.params.department)}</Link>
                <Link to={`/shop/${this.context.router.params.department}/${this.context.router.params.category}`} className="breadcrumb">{routeParamsFormatToName(this.context.router.params.category)}</Link>
              </div>
            </div>
          </div>
        </nav>
        {this.props.product.currentCategoryProducts.length > 0 && !this.props.product.error
            ?
              (<div className='flexRowWrap container'>
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

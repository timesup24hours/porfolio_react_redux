import React from 'react'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import { routeNameFormatBackToLink } from '../../utils'
import { Link } from 'react-router'
import ProductDescription from './ProductDescription'
import CustomerReview from './CustomerReview'

const ProductDetail = props => {
  const department = routeNameFormatBackToLink(props.product.department.name)
  const category = routeNameFormatBackToLink(props.product.category.name)

  return (
    <div className='ProductDetail-container'>

      <ol className="breadcrumb">
        <li><Link to={`/shop/${department}`} className="breadcrumb">{props.product.department.name}</Link></li>
        <li><Link to={`/shop/${department}/${category}`} className="breadcrumb">{props.product.category.name}</Link></li>
      </ol>

      <div className='ProductDetail-detail-holder'>
        <LeftPanel product={props.product} />
        <RightPanel product={props.product} cart={props.cart}/>
      </div>
      <ProductDescription desc={props.product.desc} />
      <hr/>
      <CustomerReview
        review={props.review}
        product={props.product}
        auth={props.auth}
        deleteRequest={props.deleteRequest}
        editRequest={props.editRequest}
      />
    </div>
  )
}

export default ProductDetail

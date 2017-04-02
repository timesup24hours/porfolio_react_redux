import React from 'react'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import { routeNameFormatBackToLink } from '../../utils'
import { Link } from 'react-router'

const ProductDetail = props => {
  const department = routeNameFormatBackToLink(props.product.department)
  const category = routeNameFormatBackToLink(props.product.category)
  return (
    <div className='ProductDetail-container'>
      <nav>
        <div className="nav-wrapper blue">
          <div className='row'>
            <div className="col">
              <Link to={`/shop/${department}`} className="breadcrumb">{props.product.department}</Link>
              <Link to={`/shop/${department}/${category}`} className="breadcrumb">{props.product.category}</Link>
            </div>
          </div>
        </div>
      </nav>
      <div className='ProductDetail-detail-holder'>
        <LeftPanel product={props.product} />
        <RightPanel product={props.product} cart={props.cart}/>
      </div>
    </div>
  )
}

export default ProductDetail

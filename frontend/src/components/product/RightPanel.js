import React from 'react'
import ProductDetailAddCart from './ProductDetailAddCart'
import ProductDetailInfo from './ProductDetailInfo'

const RightPanel = props => {
  return (
    <div className='RightPanel-container'>
      <ProductDetailInfo product={props.product} />
      <ProductDetailAddCart product={props.product} cart={props.cart} />
    </div>
  )
}

export default RightPanel

import React from 'react'
import Gallery from '../gallery/Gallery'
import ProductDetailFooter from './ProductDetailFooter'
// import ProductDetailHeader from './ProductDetailHeader'

const LeftPanel = props => {
  const { images } = props.product
  return (
    <div className='LeftPanel-container'>

      <Gallery images={images} />
      <ProductDetailFooter/>
    </div>
  )
}

export default LeftPanel
// <ProductDetailHeader product={props.product} />

import React from 'react'

const ProductDescription = props => {

  return (
    <div className='ProductDescription'>
      <div className='row'>
        <div className='col-sm-12'>
          <div>Description: </div>
          <p className='text-muted ProductDetailInfo-desc'>{props.desc}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDescription

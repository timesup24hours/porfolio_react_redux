import React from 'react'

const ProductDetailInfo = props => {
  const { brand, desc, name, listDesc, numberOfStock, onSale, price, salePrice, size, soldBy, stock } = props.product

  let listDescDom = null

  if(listDesc && listDesc.length) {
    listDescDom = listDesc.map((l, i) => {
      return <li key={i}><strong className='text-muted ProductDetailInfo-dot'>&bull;</strong>{l.name}</li>
    })
  }

  return (
    <div className='ProductDetailInfo-container container'>

      <div className='row'>
        <div className='col-sm-12'>
          <div className='text-primary ProductDetailInfo-name'>{brand} - {name}</div>
        </div>
        <div className='col-sm-12'>
          <div className='text-muted ProductDetailInfo-soldby'>{soldBy}</div>
        </div>
      </div>

      <br/>

      <div className='row'>
        <div className='col-sm-12'>
          {onSale
            ? <div>Price: <s className='text-muted'>$ {price}</s><span> <strong>$ {salePrice}</strong></span></div>
            : <span><strong>$ {price}</strong></span>
          }
        </div>
        <div className='col-sm-12'>
          {stock
            ? <div className='ProductDetailInfo-in-stock text-success'>In Stock</div>
            : <div className='ProductDetailInfo-out-of-stock text-danger'>Out of stock  </div>
          }
          {numberOfStock ? <div>Stock available: <strong>{numberOfStock}</strong></div> : null }
        </div>
        <div className='col-sm-12'>{size ? <div>Size: <strong>{size}</strong></div> : null}</div>
      </div>

      <br/>

      <div className='row'>
        <div className='col-sm-12'>
          <ul className='ProductDetailInfo-listDesc-ul'>
            {listDescDom}
          </ul>
        </div>
      </div>

      <br/>

      <div className='row'>
        <div className='col-sm-12'>
          <div>Description: </div>
          <p className='text-muted ProductDetailInfo-desc'>{desc}</p>
        </div>
      </div>

    </div>
  )
}

export default ProductDetailInfo

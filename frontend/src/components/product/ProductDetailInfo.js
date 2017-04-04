import React from 'react'

const ProductDetailInfo = props => {
  const { brand, desc, name, listDesc, numberOfStock, onSale, price, salePrice, size, soldBy, stock } = props.product

  let listDescDom = null

  if(listDesc && listDesc.length) {
    listDescDom = listDesc.map((l, i) => {
      return <li key={i}><strong className='grey-text ProductDetailInfo-dot'>&bull;</strong>{l.name}</li>
    })
  }

  return (
    <div className='ProductDetailInfo-container container'>

      <div className='row'>
        <div className='col s12'>
          <div className='title blue-text text-darken-2 ProductDetailInfo-name'>{brand} - {name}</div>
        </div>
        <div className='col s12'>
          <div className='grey-text text-darken-2 ProductDetailInfo-soldby'>{soldBy}</div>
        </div>
      </div>

      <div className='row'>
        <div className='col s12'>
          {onSale
            ? <div>Price: <span className='ProductDetailInfo-price grey-text'>$ {price}</span><span> <strong>$ {salePrice}</strong></span></div>
            : <span><strong>$ {price}</strong></span>
          }
        </div>
        <div className='col s12'>
          {stock
            ? <div className='ProductDetailInfo-in-stock green-text'>In Stock</div>
            : <div className='ProductDetailInfo-out-of-stock red-text'>Out of stock  </div>
          }
          {numberOfStock ? <div>Stock available: <strong>{numberOfStock}</strong></div> : null }
        </div>
        <div className='col s12'>{size ? <div>Size: <strong>{size}</strong></div> : null}</div>
      </div>

      <div className='row'>
        <div className='col'>
          <ul className='ProductDetailInfo-listDesc-ul'>
            {listDescDom}
          </ul>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <div>Description: </div>
          <div className='grey-text text-darken-2 ProductDetailInfo-desc'>{desc}</div>
        </div>
      </div>

    </div>
  )
}

export default ProductDetailInfo


import React from 'react'
import { connect } from 'react-redux'
import menuActions from '../../store/actions/menuActions'
import { Link } from 'react-router'
import * as productActions from '../../store/actions/productActions'

const Menu = props => {
  const menu = props.menu.categories.map((d, i) => {
    return (
      <li className='Menu-department-li' key={i}>{d.department}
        <ul className='Menu-category-ul'>
          <div className='Menu-triangle-face-left'></div>
          { d.category.map((c, i) => {
              if(c.title) return <div className='Menu-category-title' key={i}>{c.title}</div>
              return (
                <li className='Menu-category-li' key={i} onClick={() => props.getCurrentCategoryProductsRequest(c._id)}>
                  <Link to={`/shop/${d.to}/${c.to}`}>
                    {c.name}
                    {c.desc && <span className='Menu-category-span' key={i}>{c.desc}</span>}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </li>
    )
  })

  return (
    <ul className='Menu-container'>
      <div className='Menu-triangle-face-up'></div>
      {menu}
    </ul>
  )
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = dispatch => ({
  showMenu: () => dispatch(menuActions.showMenu()),
  hideMenu: () => dispatch(menuActions.hideMenu()),
  getCurrentCategoryProductsRequest: payload => dispatch(productActions.getCurrentCategoryProductsRequest(payload)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Menu)

// onMouseOver={() => props.showMenu()}
// onMouseOut={() => props.hideMenu()}

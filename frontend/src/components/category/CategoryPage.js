import React from 'react'
import { connect } from 'react-redux'
import CategoryForm from './CategoryForm'

export const CategoryPage = props => {

  return props.menu.categories ?
    (<div id='CategoryPage-container' className='CategoryPage-container'>
      <CategoryForm menu={props.menu} />
    </div>) : null

}

const mapStateToProps = state => ({
  menu: state.menu,
})
const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)

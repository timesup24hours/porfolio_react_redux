import React from 'react'
import { connect } from 'react-redux'
import CategoryForm from './CategoryForm'

const CategoryPage = props => {

  return !props.menu.pending ?
    (<div className='CategoryPage-container'>
      <CategoryForm menu={props.menu} />
    </div>) : null

}

const mapStateToProps = state => ({
  menu: state.menu,
})
const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)

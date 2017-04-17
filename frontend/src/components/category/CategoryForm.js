import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RenderInput from './RenderInput'
import * as menuActions from '../../store/actions/menuActions'
import * as actionTypes from '../../store/actions/actionTypes'

class CategoryForm extends Component {

  submit = e => {
    e.preventDefault()
  }

  handleFormOnChange = e => {
    if(e.target.name === 'department-selector') {
      this.props.setCategorySelectorValue('')
      this.props.setSubCategorySelectorValue('')
    }
    this.props.setSelectorValue({
      name: e.target.name,
      value: e.target.value
    })
  }

  render() {
    let departments = null
    let categories = null
    let subCategories = null

    departments = this.props.menu.categories.map((d, i) => {
      return <option key={i} value={d._id}>{d.department}</option>
    })

    categories = this.props.menu.categories.map((d, i) => {
      if(d._id ===  this.props.departmentSelector) {
        return d.category.map((d, i) => {
          return <option key={i} value={d._id}>{d.name}</option>
        })
      }
      return false
    })

    subCategories = this.props.menu.categories.map((d, i) => {
      if(d._id === this.props.departmentSelector) {
        return d.category.map((c, i) => {
          if(c._id === this.props.categorySelector) {
            return c.subcategory.map((c, i) => {
              return <option key={i} value={c._id}>{c.name}</option>
            })
          }
          return false
        })
      }
      return false
    })

    return (
      <div className='CategoryForm container'>

        <RenderInput
          selectorName='department-selector'
          selectorChildren={departments}
          selectorLabel='Departments'
          selectorValue={this.props.departmentSelector}
          inputName='department'
          inputLabel='Department'
          handleFormOnChange={this.handleFormOnChange}
          addRequest={this.props.addDepartmentRequest}
          eidtRequest={this.props.eidtDepartmentRequest}
          actionType={actionTypes.DEPARTMENT_DELETE_REQUEST}
          dialogContent='All the categories under this department would be delete also'
        />

        <RenderInput
          selectorName='category-selector'
          selectorChildren={categories}
          selectorLabel='Categories'
          selectorValue={this.props.categorySelector}
          inputName='category'
          inputLabel='Category'
          handleFormOnChange={this.handleFormOnChange}

          parentId={this.props.departmentSelector}
          addRequest={this.props.addCategoryRequest}
          eidtRequest={this.props.eidtCategoryRequest}
          actionType={actionTypes.CATEGORY_DELETE_REQUEST}
          dialogContent='All the subCategories under this category would be delete also'
        />

        <RenderInput
          selectorName='subCategory-selector'
          selectorChildren={subCategories}
          selectorLabel='SubCategories'
          selectorValue={this.props.subCategorySelector}
          inputName='subCategory'
          inputLabel='SubCategory'
          handleFormOnChange={this.handleFormOnChange}

          parentId={this.props.categorySelector}
          addRequest={this.props.addSubCategoryRequest}
          eidtRequest={this.props.eidtSubCategoryRequest}
          actionType={actionTypes.SUBCATEGORY_DELETE_REQUEST}
          dialogContent='Are you want to delte this subCategories'
        />

      </div>
    )
  }
}

CategoryForm.contextTypes = {
  router: PropTypes.object,
}

const mapStateToProps = state => ({
  departmentSelector: state.menu.manageMenu['department-selector'],
  categorySelector: state.menu.manageMenu['category-selector'],
  subCategorySelector: state.menu.manageMenu['subCategory-selector'],
})

const mapDispatchToProps = dispatch => ({
  addDepartmentRequest: payload => dispatch(menuActions.addDepartmentRequest(payload)),
  eidtDepartmentRequest: payload => dispatch(menuActions.eidtDepartmentRequest(payload)),
  addCategoryRequest: payload => dispatch(menuActions.addCategoryRequest(payload)),
  eidtCategoryRequest: payload => dispatch(menuActions.eidtCategoryRequest(payload)),
  addSubCategoryRequest: payload => dispatch(menuActions.addSubCategoryRequest(payload)),
  eidtSubCategoryRequest: payload => dispatch(menuActions.eidtSubCategoryRequest(payload)),
  setCategorySelectorValue: payload => dispatch(menuActions.setCategorySelectorValue(payload)),
  setSubCategorySelectorValue: payload => dispatch(menuActions.setSubCategorySelectorValue(payload)),
  setSelectorValue: payload => dispatch(menuActions.setSelectorValue(payload)),
})

CategoryForm.propTypes = {
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm)

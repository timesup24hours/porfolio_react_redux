import React, { Component } from 'react'

export class CategoryForm extends Component {

  render() {
    // const { categories, department, category, types } = this.props.menu
    return (
      <div className='CategoryForm-container'>
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input placeholder="Department" id="department" type="text" className="validate" />
                <label className='active' htmlFor="department">Department</label>
              </div>
              <div className="input-field col s6">
                <input placeholder="Category" id="category" type="text" className="validate" />
                <label className='active' htmlFor="category">Category</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input disabled value="I am not editable" id="disabled" type="text" className="validate" />
                <label className='active' htmlFor="disabled">Disabled</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="password" className="validate" />
                <label className='active' htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" className="validate" />
                <label className='active' htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                This is an inline input field:
                <div className="input-field inline">
                  <input id="email" type="email" className="validate" />
                  <label className='active' htmlFor="email" data-error="wrong" data-success="right">Email</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CategoryForm

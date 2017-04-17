import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as productActions from '../../store/actions/productActions'

class EditProductFormPage extends Component {

  componentDidMount() {
    this.props.getCurrentEditProductsByOwner(this.props.params.id)
  }

  render() {
    return (
      <div className='EditProductFormPage'>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.product,
})
const mapDispatchToProps = dispatch => ({
  getCurrentEditProductsByOwner: payload => dispatch(productActions.getCurrentEditProductsByOwner(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProductFormPage)

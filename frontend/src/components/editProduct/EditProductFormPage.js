import React, { Component } from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/CircularProgress'
import * as productActions from '../../store/actions/productActions'
import EditProductForm from './EditProductForm'
import { browserHistory } from 'react-router'
import LoadingMask from '../mask/LoadingMask'

class EditProductFormPage extends Component {

  componentDidMount() {
    this.props.getCurrentEditProductsByOwner(this.props.params.id)
  }

  // componentWillReceiveProps(nextProps) {
  //   if(this.props.product.currentEditProduct && nextProps.product.currentEditProduct === null) {
  //     browserHistory.push('/edit_product')
  //   }
  // }

  render() {
    return this.props.product.currentEditProduct && this.props.menu.categories ? (
      <div className='EditProductFormPage'>
        {this.props.product.pending ? <LoadingMask /> : null}

        <EditProductForm
          id={this.props.params.id}
          currentEditProduct={this.props.product.currentEditProduct}
          menu={this.props.menu}
        />
      </div>
    ) : <div className="flexCenter"><CircularProgress size={50} thickness={3}/></div>
  }
}

const mapStateToProps = state => ({
  menu: state.menu,
  product: state.product,
})
const mapDispatchToProps = dispatch => ({
  getCurrentEditProductsByOwner: payload => dispatch(productActions.getCurrentEditProductsByOwner(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProductFormPage)

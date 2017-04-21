import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddProductForm from './AddProductForm'
import CircularProgress from 'material-ui/CircularProgress'
import { browserHistory } from 'react-router'
import LoadingMask from '../mask/LoadingMask'

class AddProductPage extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.product.redirect) {
      browserHistory.push('/edit_product')
    }
  }
  
  render() {
    return this.props.menu.categories ? (
      <div className='AddProductPage'>
        {this.props.product.pending ? <LoadingMask /> : null}
        <AddProductForm menu={this.props.menu} />
      </div>
    ) : <div className="flexCenter"><CircularProgress size={50} thickness={3}/></div>
  }
}

const mapStateToProps = state => ({
  product: state.product,
  menu: state.menu
})
const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AddProductPage)

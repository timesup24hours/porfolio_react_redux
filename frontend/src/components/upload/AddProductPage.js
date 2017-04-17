import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddProductForm from './AddProductForm'
import CircularProgress from 'material-ui/CircularProgress'

class AddProductPage extends Component {

  render() {
    return this.props.menu.categories ? (
      <div className='AddProductPage'>
        <AddProductForm menu={this.props.menu} />
      </div>
    ) : <div className="flexCenter"><CircularProgress size={50} thickness={3}/></div>
  }
}

const mapStateToProps = state => ({
  menu: state.menu
})
const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AddProductPage)

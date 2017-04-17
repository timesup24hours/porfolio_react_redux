import React, { Component } from 'react'
import { connect } from 'react-redux'
import ShopByCategory from './ShopByCategory'
import CircularProgress from 'material-ui/CircularProgress'

class ShopByCategoryPage extends Component {

  render() {
    return (
      <div className='ShopByCategoryPage'>
        {
          this.props.menu.category
          ? <ShopByCategory category={this.props.menu.category} />
          : <CircularProgress size={50} thickness={3}/>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  menu: state.menu,
})
const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ShopByCategoryPage)

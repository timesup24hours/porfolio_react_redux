import React from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import { toggleLeftMenu, toggleMask } from '../../store/actions/navActions'

const RightSmallMenu = (props) => {
  const showLeftMenu = () => {
    props.toggleMask()
    props.toggleLeftMenu()
  }
  
  return(
    <div className='RightSmallMenu-container'>
      <IconButton onClick={showLeftMenu}><MenuIcon /></IconButton>
    </div>
  )
}

const mapStateToProps = state => ({
  nav: state.nav
})

const mapDispatchToProps = dispatch => ({
  toggleLeftMenu: () => dispatch(toggleLeftMenu()),
  toggleMask: () => dispatch(toggleMask())
})

export default connect(mapStateToProps, mapDispatchToProps)(RightSmallMenu)

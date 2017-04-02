import React from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
// import MenuIcon from 'material-ui/svg-icons/navigation/menu'
// import Clear from 'material-ui/svg-icons/content/clear'
import { toggleLeftMenu, toggleMask } from '../../store/actions/navActions'

const RightSmallMenu = (props) => {
  const showLeftMenu = () => {
    props.toggleMask()
    props.toggleLeftMenu()
  }

  return(
    <div className='RightSmallMenu-container'>
      <IconButton className='RightSmallMenu-navIcon'>
        <div id='nav-icon1' className={props.nav.mask.show ? 'open' : ''} onClick={showLeftMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

      </IconButton>
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
// {
//   props.nav.leftMenu.show
//   ? <Clear />
//   : <MenuIcon />
// }

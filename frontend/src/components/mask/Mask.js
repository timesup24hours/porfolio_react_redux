import React from 'react'
import { connect } from 'react-redux'
import { toggleLeftMenu, toggleMask } from '../../store/actions/navActions'

const Mask = (props) => {
  const toggleMask = () => {
    props.toggleMask()
    props.toggleLeftMenu()
  }
  let hide = props.nav.mask.show ? '' : 'hide'
  return(
    <div className={`Mask-container ${hide}`} onClick={toggleMask}>

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

export default connect(mapStateToProps, mapDispatchToProps)(Mask)

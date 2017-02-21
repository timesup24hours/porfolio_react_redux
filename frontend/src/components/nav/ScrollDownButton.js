import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
// import Arrow from './ic_keyboard_arrow_down_black_24px.svg'
import { connect } from 'react-redux'
import { scrollTo } from '../../utils'

const ScrollDownButton = props => {

  const handleScrollDown = () => {
    let elmIndex = 0
    const elm = document.querySelectorAll('#home')
    elm.forEach( (e, i) => {
      if(document.body.scrollTop >= e.offsetTop) {
        elmIndex = i + 1
      }
    })
    scrollTo(elm[elmIndex], 400, 'easeInCubic', () => ({}))
  }

  const hide = props.nav.scrollButton.show ? '' : 'hide'

  return(
    <div className={`ScrollDownButton-container ${hide}`}>
      <FloatingActionButton className='ScrollDownButton-button' onClick={handleScrollDown}>
        <ArrowDown style={{ width: '30px', marginTop: '2px' }}/>
      </FloatingActionButton>
    </div>
  )
}

const mapStateToProps = state => ({
  nav: state.nav
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ScrollDownButton)

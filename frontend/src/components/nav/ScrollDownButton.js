import React from 'react'
import { connect } from 'react-redux'
import { scrollTo } from '../../utils'
import FloatingActionButton from 'material-ui/FloatingActionButton';

const ScrollDownButton = props => {

  const handleScrollDown = () => {
    let elmIndex = 0
    const elm = document.querySelectorAll('#home')
    elm.forEach((e, i) => {
      if(document.body.scrollTop >= e.offsetTop) {
        elmIndex = i + 1
      }
    })
    scrollTo(elm[elmIndex], 400, 'easeInCubic', () => ({}))
  }

  return(
    <div className={`ScrollDownButton-container animated bounceIn`} onTouchTap={handleScrollDown}>
      <FloatingActionButton className='flexCenter blue'>
        <i className="material-icons ScrollDownButton-icon">keyboard_arrow_down</i>
      </FloatingActionButton>
    </div>
  )
}

const mapStateToProps = state => ({
  nav: state.nav,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ScrollDownButton)

import React from 'react'
import { connect } from 'react-redux'
import { scrollTo } from '../../utils'

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
      <button className='btn-floating btn-large blue'>
        <i className="material-icons ScrollDownButton-icon">keyboard_arrow_down</i>
      </button>
    </div>
  )
}

const mapStateToProps = state => ({
  nav: state.nav,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ScrollDownButton)

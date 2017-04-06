import React, { Component } from 'react'

class AnimatedLetter extends Component {

  AnimatedLetterAnimated = () => {
    let div = document.getElementsByClassName('AnimatedLetter')
    let container = document.querySelector('.AnimatedLetter-container')

    if(document.body.scrollTop + window.innerHeight >= container.offsetTop &&
      document.body.scrollTop <= container.offsetTop + container.offsetHeight
    ) {
      Array.prototype.forEach.call(div, function (e) {
          e.classList.add('AnimatedLetter-animated')
        }
      )
    } else if(document.body.scrollTop > container.offsetTop + container.offsetHeight ||
      document.body.scrollTop + window.innerHeight < container.offsetTop
    ) {
      Array.prototype.forEach.call(div, function (e) {
          e.classList.remove('AnimatedLetter-animated')
        }
      )
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.AnimatedLetterAnimated)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.AnimatedLetterAnimated)
  }

  render() {
    return (
      <div className='AnimatedLetter-container'>
        <div id='AnimatedLetter' className='AnimatedLetter AnimatedLetter-A'>A</div>
        <div id='AnimatedLetter' className='AnimatedLetter AnimatedLetter-B'>B</div>
        <div id='AnimatedLetter' className='AnimatedLetter AnimatedLetter-C'>C</div>
        <div id='AnimatedLetter' className='AnimatedLetter AnimatedLetter-D'>D</div>
        <div id='AnimatedLetter' className='AnimatedLetter AnimatedLetter-E'>E</div>
        <div id='AnimatedLetter' className='AnimatedLetter AnimatedLetter-F'>F</div>
      </div>
    )
  }
}

export default AnimatedLetter

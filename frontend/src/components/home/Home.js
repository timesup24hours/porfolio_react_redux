import React, { Component } from 'react'
import Home1 from './Home1'
import Home2 from './Home2'
import Home3 from './Home3'
// import { scrollIt } from './scrollIt'

class Home extends Component {
  // state = {
  //   scrollPosition: 0,
  // }

  // getOffsetTop = (el) => {
  //   return el.getBoundingClientRect().top + window.innerHeight
  // }
  //
  // // scroll handler
  // handleScroll = () => {
  //   const homeTop = this.getOffsetTop(document.querySelector('.Home'))
  //   const home1Top = this.getOffsetTop(document.querySelector('.Home1-container'))
  //   const home2Top = this.getOffsetTop(document.querySelector('.Home2-container'))
  //   const home3Top = this.getOffsetTop(document.querySelector('.Home3-container'))
  //   const currentPosition = document.body.scrollTop
  //   // console.log(this.state.scrollPosition, ' ', document.body.scrollTop);
  //   if(currentPosition > this.state.scrollPosition) {
  //     if(currentPosition <  home1Top) {
  //       scrollIt(document.querySelector('.Home2-container'), 400, 'easeInCubic')
  //     }
  //   } else {
  //
  //   }
  //   this.setState({ scrollPosition: currentPosition })
  // }
  //
  // componentDidMount() {
  //   window.addEventListener('scroll', this.handleScroll)
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll)
  // }

  render() {
    return (
      <div className='Home'>
        <Home1/>
        <Home2/>
        <Home3/>
      </div>
    )
  }
}

export default Home

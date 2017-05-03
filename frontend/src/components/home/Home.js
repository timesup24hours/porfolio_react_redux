import React, { Component } from 'react'
import Home1 from './Home1'
import Home2 from './Home2'
import Home3 from './Home3'
// import { scrollIt } from './scrollIt'


// const style = {
//   div1: {
//     zIndex: '500',
//     width: '100%',
//     height: '100%',
//     // borderTop: '80vh solid #303030',
//     borderTop: '80vh solid rgba(244,67,54 ,1)',
//     borderLeft: '100vw solid rgba(198,40,40 ,1)',
//     position: 'relative',
//   },
//   div2: {
//     zIndex: '500',
//     width: '100%',
//     height: '0',
//     borderBottom: '80vh solid rgba(255,82,82 ,1)',
//     borderRight: '100vw solid rgba(198,40,40 ,1)',
//     position: 'relative',
//   },
//   d2text: {
//     fontSize: '30px',
//     fontWeight: '20px',
//     marginTop: '30vh',
//     marginLeft: '10vh',
//     position: 'absolute',
//     border: '1px solid black',

//   }
// }

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


// <div style={style.div1}>
//   <div className='Home-div1-text'>
//     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
//   </div>
// </div>
//
//
// <div style={style.div2}>
//   <div className='Home-div-text'>
//     <div className='Home-text'>
//       <div className='Home-right-shape'></div>
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
//     </div>
//   </div>
// </div>

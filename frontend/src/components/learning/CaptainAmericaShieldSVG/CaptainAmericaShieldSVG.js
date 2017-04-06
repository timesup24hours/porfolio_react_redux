import React, { Component } from 'react'

class CaptainAmericaShieldSVG extends Component {

  scrollHolder = () => {
    this.animationSVG('CaptainAmericaShieldSVG-path1')
    this.animationSVG('CaptainAmericaShieldSVG-path2')
    this.animationSVG('CaptainAmericaShieldSVG-path3')
    this.animationSVG('CaptainAmericaShieldSVG-path4')
    this.animationSVG('CaptainAmericaShieldSVG-path5')
  }

  animationSVG = (className) => {
    let div = document.querySelector('.CaptainAmericaShieldSVG')
    let paths = document.querySelector(`.${className}`)
    let distanceFromTopOfElement = div.offsetTop
    let heightOfElement = div.offsetHeight
    let scollPosition = document.body.scrollTop


    // add classname when the botton of view is touching the top of the cap
    // add classname when the top of the view is touching the bottom of the cap
    if(scollPosition + window.innerHeight >= distanceFromTopOfElement
      && scollPosition <= distanceFromTopOfElement + heightOfElement
    ) {
      paths.classList.add("CaptainAmericaShieldSV-animation");

      // remove classname when top of the view is greater then the bottem of the cap
      // remove classname when the bottem of the view is less then the top of the cap
    } else if(scollPosition > distanceFromTopOfElement + heightOfElement
      || scollPosition + window.innerHeight < distanceFromTopOfElement
    ) {
      paths.classList.remove("CaptainAmericaShieldSV-animation");
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHolder)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHolder)
  }


  render () {
    return (
      <div className='CaptainAmericaShieldSVG'>
        <svg width="580" height="510" >
          <circle className="CaptainAmericaShieldSVG-path CaptainAmericaShieldSVG-path1" stroke="#D52120" fill="#D52120" cx="251" cy="251" r="250"></circle>
          <circle className="CaptainAmericaShieldSVG-path CaptainAmericaShieldSVG-path2" stroke="grey" fill="#F7F7F7" cx="251" cy="251" r="205"></circle>
          <path className="CaptainAmericaShieldSVG-path CaptainAmericaShieldSVG-path3" d="M251,411 C339.365564,411 411,339.365564 411,251 C411,162.634436 339.365564,91 251,91 C162.634436,91 91,162.634436 91,251 C91,339.365564 162.634436,411 251,411 Z" stroke="#D52120" fill="#D52120"></path>
          <circle className="CaptainAmericaShieldSVG-path CaptainAmericaShieldSVG-path4" stroke="#4990E2" fill="#4990E2" cx="251" cy="251" r="115"></circle>
          <polygon className="CaptainAmericaShieldSVG-path CaptainAmericaShieldSVG-path5" stroke="grey" fill="#F7F7F7" points="250.999997 308.5 183.404701 344.036958 196.314251 268.768479 141.6285 215.463048 217.202359 204.481515 251.000001 136 284.797664 204.481532 360.371518 215.463103 305.685744 268.768494 318.595296 344.03696 "></polygon>
        </svg>
      </div>
    )
  }
}

export default CaptainAmericaShieldSVG

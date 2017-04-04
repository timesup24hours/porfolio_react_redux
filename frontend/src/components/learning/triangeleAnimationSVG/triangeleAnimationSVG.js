import React, { Component } from 'react'
import _ from 'lodash'

// # demo #1 https://css-tricks.com/scroll-drawing/
// # demo #2 https://www.w3schools.com/howto/howto_js_scrolldrawing.asp
class TriangeleAnimationSVG extends Component {

  drawLine = (path, div) => {
    let length = 0;
    let pathLength = path.getTotalLength();
    let distanceFromTop = document.body.scrollTop + document.documentElement.scrollTop - div.scrollHeight
    let percentDone = 1 - distanceFromTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
    length = percentDone * pathLength ;
    path.style.strokeDasharray = [length,pathLength].join(' ');

    // parallax scrolling effect
    div.style.transform = `translate3d(0, ${window.scrollY * 0.3}px, 0`
  }

  onScroll = () => {
    let div = document.querySelector(".TriangeleAnimationSVG")
    let path = document.getElementById("triangle");
    if(document.body.scrollTop >= div.scrollTop) this.drawLine(path, div)
  }

  drawLineInital = path => {
    // Get the id of the <path> element and the length of <path>
    let length = path.getTotalLength();
    // The start position of the drawing
    path.style.strokeDasharray = length + ' ' + length;
    // Hide the path by offsetting dash. Remove this line to show the path before scroll draw
    path.style.strokeDashoffset = length;
  }

  componentDidMount() {

    let path = document.getElementById("triangle");
    this.drawLineInital(path)

    window.addEventListener("scroll", this.onScroll);

  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  render() {

    /* # Step 1: Get a <path> */
    return (
      <div className='TriangeleAnimationSVG' >
        <svg width="580" height="400" >
          <path id="triangle" d="m182.5,239.5l38.5,-96.5l41,94l-79.5,2.5z" strokeWidth="1.5" stroke="black" fill="#fff"/>
        </svg>
      </div>
    )
  }
}

export default TriangeleAnimationSVG

import React, { Component } from 'react'
import _ from 'lodash'

// # demo #1 https://css-tricks.com/scroll-drawing/
// # demo #2 https://www.w3schools.com/howto/howto_js_scrolldrawing.asp
class TriangeleAnimationSVG extends Component {

  w3Version = () => {

    let container = document.querySelector(".TriangeleAnimationSVG")
    let triangle = document.getElementById("triangle")
    var length = triangle.getTotalLength()
    var scrollpercent = 0

    // The start position of the drawing
    triangle.style.strokeDasharray = length

    // Hide the triangle by offsetting dash. Remove this line to show the triangle before scroll draw
    triangle.style.strokeDashoffset = length

    // Find scroll percentage on scroll (using cross-browser properties), and offset dash same amount as percentage scrolled
    window.addEventListener("scroll", myFunction)

    function myFunction() {

      // scrollpercent =  WhereTheScrollTopEnterThe'HowHeightYouWantToBe' / HowHeightYouWantToBe
      scrollpercent =
      (document.body.scrollTop + document.documentElement.scrollTop - container.offsetTop + container.offsetHeight / 4) / (container.offsetTop - container.offsetHeight / 1.2)
      // console.log('scrollpercent ', scrollpercent);

      var draw = length * scrollpercent

      if(scrollpercent >= 1) {
        triangle.style.strokeDasharray = 0
      } else if(scrollpercent >= 0 && scrollpercent <= 1) {
        // Reverse the drawing (when scrolling upwards)
        triangle.style.strokeDashoffset = length - draw
      } else if(scrollpercent < 0) {
        triangle.style.strokeDashoffset = -length
      }

      // When complete, remove the dash array, otherwise shape isn't quite sharp
      if (scrollpercent >= 0.99) {
        triangle.style.strokeDasharray = "none";
      } else {
        triangle.style.strokeDasharray = length + ' ' + length;
      }

    }

  }


  drawLine = (path, div) => {
    let length = 0
    // get the length of the path
    let pathLength = path.getTotalLength()
    // get the distance from the top
    let distanceFromTop = document.body.scrollTop + document.documentElement.scrollTop - div.scrollHeight
    let percentDone = 1 - distanceFromTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
    length = percentDone * pathLength
    path.style.strokeDasharray = [length, pathLength].join(' ')

    // parallax scrolling effect
    div.style.transform = `translate3d(0, ${window.scrollY * 0.4}px, 0)`
  }

  onScroll = () => {
    let div = document.querySelector(".TriangeleAnimationSVG")
    let path = document.getElementById("triangle")
    if(document.body.scrollTop >= div.scrollTop) this.drawLine(path, div)
  }

  drawLineInital = path => {
    // Get the id of the <path> element and the length of <path>
    let length = path.getTotalLength()
    // The start position of the drawing
    path.style.strokeDasharray = length + ' ' + length
    // Hide the path by offsetting dash. Remove this line to show the path before scroll draw
    path.style.strokeDashoffset = length
  }

  componentDidMount() {
    // this.w3Version()
    let path = document.getElementById("triangle")
    this.drawLineInital(path)

    window.addEventListener("scroll", this.onScroll)

  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll)
  }

  render() {

    /* # Step 1: Get a <path> */
    return (
      <div className='TriangeleAnimationSVG' >
        <svg width="400" height="400" >
          <path id="triangle" d="m182.5,239.5l38.5,-96.5l41,94l-79.5,2.5z" strokeWidth="1.5" stroke="black" fill="#fff"/>
        </svg>
      </div>
    )
  }
}

export default TriangeleAnimationSVG

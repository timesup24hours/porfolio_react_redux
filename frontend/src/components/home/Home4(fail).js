import React, { Component } from 'react'
import { connect } from 'react-redux'

// # demo https://css-tricks.com/scroll-drawing/
class Home4 extends Component {
  state = {
    path: 0,
    pathLength: 0
  }

  componentDidMount() {
    let scrollPercentage
    let drawLength
    // # Step 2: Find length of that path
    // Get a reference to the <path>
    var path = document.querySelector('#star-path');
    // Get length of path... ~577px in this demo
    var pathLength = path.getTotalLength();

    // # Step 3: Hide shape by offsetting dash
    // Make very long dashes (the length of the path itself)
    path.style.strokeDasharray = pathLength + ' ' + pathLength;
    // Offset the dashes so the it appears hidden entirely
    path.style.strokeDashoffset = pathLength;

    // # Step 4: When page scrolls, offset dash same amount as % scrolled
    // When the page scrolls...
    window.addEventListener("scroll", function(e) {
      // What % down is it?
      scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
      // Length to offset the dashes
      drawLength = pathLength * scrollPercentage;
      // Draw in reverse
      path.style.strokeDashoffset = pathLength - drawLength;
    })

    // # Step 5: If scrolled to bottom, remove dashing
    // When complete, remove the dash array, otherwise shape isn't quite sharp
    if (scrollPercentage >= 0.99) {
      path.style.strokeDasharray = "none";
    } else {
      path.style.strokeDasharray = pathLength + ' ' + pathLength;
    }
  }

  render() {

    /* # Step 1: Get a <path> */
    return (
      <div className='Home4'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.6 107.6" id="star-svg">
          <path id="star-path" fill="none" stroke="black" strokeWidth="2"  d="M150 0 L75 200 L225 200 Z" />
        </svg>
      </div>
    )
  }
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Home4)

import React from 'react'

const AnimatingTheMoments = props => {

  return (
    <div className='AnimatingTheMoments'>
      <div className="intro">
        <div className="titles">
          <div className="headline">When to Animate</div>
          <hr/><a className="title t1" href="#orientation">Orientation</a>
          <a className="title t2" href="#functional-change">Functional Change</a>
          <a className="title t3" href="#new-element">New Element</a>
          <a className="title t4" href="#highlight">Highlight</a>
          <a className="title t5" href="#visual-feedback">Visual Feedback</a>
          <a className="title t6" href="#system-status">System Status</a>
        </div>
      </div>
      {props.children}
    </div>
  )
}

export default AnimatingTheMoments

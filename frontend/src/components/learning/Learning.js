import React, { Component } from 'react'
// import FoldedCornerEffect from './foldedCornerEffect/FoldedCornerEffect'<FoldedCornerEffect></FoldedCornerEffect>
// import VideoBackground from './videoBackground/VideoBackground' // <VideoBackground></VideoBackground>
import TriangeleAnimationSVG from './triangeleAnimationSVG/triangeleAnimationSVG'
import CaptainAmericaShieldSVG from './CaptainAmericaShieldSVG/CaptainAmericaShieldSVG'
import RippleEffectButton from './RippleEffectButton/RippleEffectButton'
import FlyInText from './flyInText/FlyInText'

class Learning extends Component {

  render() {
    return (
      <div className='Learning' style={{ height: '1000vh', width: '100%', marginTop: '50px' }}>
        <FlyInText />
        <TriangeleAnimationSVG />
        <RippleEffectButton />
        <CaptainAmericaShieldSVG />
      </div>
    )
  }
}

export default Learning

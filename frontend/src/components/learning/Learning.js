import React, { Component } from 'react'
// import FoldedCornerEffect from './foldedCornerEffect/FoldedCornerEffect'<FoldedCornerEffect></FoldedCornerEffect>
// import VideoBackground from './videoBackground/VideoBackground' // <VideoBackground></VideoBackground>
// import TriangeleAnimationSVG from './triangeleAnimationSVG/triangeleAnimationSVG'
// <TriangeleAnimationSVG />
// import CaptainAmericaShieldSVG from './CaptainAmericaShieldSVG/CaptainAmericaShieldSVG'
import FlyInText from './flyInText/FlyInText'
import TriggerSvgWord from './TriggerSvgWord/TriggerSvgWord'
import KnockoutMaskEffect from './KnockoutMaskEffect/KnockoutMaskEffect'
import AnimatedLetter from './AnimatedLetter/AnimatedLetter'
import SourceTreeLoader from './SourceTreeLoader/SourceTreeLoader'
import ScrollControlledSVGLineAnimation from './ScrollControlledSVGLineAnimation/ScrollControlledSVGLineAnimation'
import LoadingSignature from './LoadingSignature/LoadingSignature'
// import DrawingAnimationsWithHTMLCSS3 from './DrawingAnimationsWithHTMLCSS3/DrawingAnimationsWithHTMLCSS3'
// <DrawingAnimationsWithHTMLCSS3 />
// <CaptainAmericaShieldSVG />
import StepByStepForm from './StepByStepForm/StepByStepForm'
import NotificationAlertModal from './NotificationAlertModal/NotificationAlertModal'

class Learning extends Component {

  render() {
    return (
      <div className='Learning'>
        <FlyInText />
        <LoadingSignature />
        <TriggerSvgWord />
        <SourceTreeLoader />
        <KnockoutMaskEffect />
        <AnimatedLetter />
        <ScrollControlledSVGLineAnimation />
        <StepByStepForm />
        <NotificationAlertModal />
      </div>
    )
  }
}

export default Learning

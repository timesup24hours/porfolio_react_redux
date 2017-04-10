import React from 'react'

const StepByStepForm = props => {

  const step1 = (allBody, span, currentIndex) => {
    allBody[currentIndex].classList.add('animate-out')
    // animate the step in
    setTimeout(() => {
      allBody[currentIndex].classList.remove('animate-out', 'is-showing')
      allBody[currentIndex].nextSibling.classList.add('animate-in');
      span[currentIndex].classList.remove('is-active')
      span[currentIndex].nextSibling.classList.add('is-active')
    }, 600);

    // after the animation, adjust the classes
    setTimeout(() => {
      allBody[currentIndex].nextSibling.classList.remove('animate-in')
      allBody[currentIndex].nextSibling.classList.add('is-showing');

    }, 1200);
  }

  const step3 = (allBody, span, currentIndex) => {
    // animate the step out
    document.querySelector('.StepByStepForm-modal-wrap').classList.add('animate-up')

    setTimeout(() => {
      document.querySelector('.StepByStepForm-return-button').style.display = 'inline-block'
    }, 300);

  }

  const handleOnClick = e => {
    e.preventDefault()
    const allBody = document.querySelectorAll('.StepByStepForm-modal-body')
    const allSpan = document.querySelectorAll('.StepByStepForm-modal-header span')
    let currentIndex = 0;

    allBody.forEach((el, i) => {
      if(el.contains(e.currentTarget)) {
        currentIndex = i
      }
    })

    if (currentIndex === 0 || currentIndex === 1) {
      step1(allBody, allSpan, currentIndex)
    } else {
      step3(allBody, allSpan, currentIndex);
    }

  }

  const handleOnClickReturn = e => {
    document.querySelector('.StepByStepForm-modal-wrap').classList.remove('animate-up')
    const allBody = document.querySelectorAll('.StepByStepForm-modal-body')
    const allSpan = document.querySelectorAll('.StepByStepForm-modal-header span')

    allBody.forEach((el, i) => {
      if(i === 0) {
        el.classList.add('is-showing')
      } else {
        el.classList.remove('is-showing');
      }
    })

    allSpan.forEach((el, i) => {
      if(i === 0) {
        el.classList.add('is-active')
      } else {
        el.classList.remove('is-active');
      }
    })
    document.querySelector('.StepByStepForm-return-button').style.display = 'none'
  }

  return (
    <div className='StepByStepForm'>

      {/* StepByStepForm-modal-wrap */}
      <div className='StepByStepForm-modal-wrap'>

        {/* StepByStepForm-modal-header */}
        <div className='StepByStepForm-modal-header'>
          <span className='is-active'></span>
          <span></span>
          <span></span>
        </div>

        {/* StepByStepForm-modal-bodies */}
        <div className='StepByStepForm-modal-bodies'>

          {/* modal-body-step-1 */}
          <div className='StepByStepForm-modal-body modal-body-step-1 is-showing'>
            <div className='StepByStepForm-title'>Step 1</div>
            <div className='StepByStepForm-description'>Hello there, Lets play a game.</div>
            <form>
              <input type="text" placeholder="Name"/>
              <input type="email" placeholder="Email"/>
              <div className='StepByStepForm-text-center'>
                <div className='StepByStepForm-button' onClick={e => handleOnClick(e)}>Start
                </div>
              </div>
            </form>
          </div>

          {/* modal-body-step-2 */}
          <div className="StepByStepForm-modal-body modal-body-step-2">
            <div className="StepByStepForm-title">Step 2</div>
            <div className="StepByStepForm-description">Would you rather</div>
            <form>
              <label>
                <input type="radio" name="radio"/>live one life that lasts 1,000 years?
              </label>
              <label>
                <input type="radio" name="radio" id="radio2"/>live 10 lives that last 100 years each?
              </label>
              <div className="StepByStepForm-text-center" onClick={e => handleOnClick(e)}>
                <div className="StepByStepForm-button">Next</div>
              </div>
            </form>
          </div>

          {/* modal-body-step-3 */}
          <div className="StepByStepForm-modal-body modal-body-step-3">
            <div className="StepByStepForm-title">Step 3</div>
            <div className="StepByStepForm-description">Check your email for the game results.</div>
            <div className="StepByStepForm-text-center" onClick={e => handleOnClick(e)}>
              <div className="StepByStepForm-button">Done!</div>
            </div>
          </div>

        </div>{/* StepByStepForm-modal-bodies */}

      </div>{/* StepByStepForm-modal-wrap */}

      {/* StepByStepForm-return-button */}
      <div className="StepByStepForm-text-center" onClick={e => handleOnClickReturn(e)}>
        <div className="StepByStepForm-return-button">ReRun</div>
      </div>

    </div>
  )
}

export default StepByStepForm

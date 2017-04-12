import React from 'react'

const Slides = props => {

  const handleOnClick = () => {
    document.querySelector('.example-1').classList.toggle('is-transitioned');
  }

  const handleOnClickSwitchClass = () => {
    document.querySelector('.switch').classList.toggle('is-transitioned');
  }

  const handleOnClickTrigger = () => {
    document.querySelector('.slide-alert').classList.toggle('is-open');
  }

  const handleOnClickSend = () => {
    const email = document.querySelector('.email')
    email.classList.add('is-sent');
    setTimeout(() => {
      email.classList.remove('is-sent');
    }, 1800);
  }


  return (
    <div className="slides">
      <div className="slide slide1"><a name="orientation"></a>
        <div className="blurb">
          <div className="title">Orientation</div>
          <div className="sub">Answers the Question: <strong>Where am I now?</strong></div>
        </div>
        <div className="example example-1 no-padding">
          <div className="belt">
            <div className="state state-1">
              <input placeholder="name"/>
              <div className="button" onClick={handleOnClick}>next</div>
            </div>
            <div className="state state-2">
              <div className="button" onClick={handleOnClick}>back</div>
            </div>
          </div>
        </div>
      </div>
      <div className="slide slide2"><a name="functional-change"></a>
        <div className="blurb">
          <div className="title">Functional Change</div>
          <div className="sub">Answers the Question: <strong>What does this element do now?</strong></div>
        </div>
        <div className="example example-2 no-padding">
          <div className="switch is-transitioned">
            <div className="on">on</div>
            <div className="off">off</div>
            <div className="handle" onClick={handleOnClickSwitchClass}></div>
          </div>
        </div>
      </div>

      <div className="slide slide3"><a name="new-element"></a>
        <div className="blurb">
          <div className="title">New Element</div>
          <div className="sub">Answers the Question: <strong>What should I look at?</strong></div>
        </div>
        <div className="example example-3">
          <div className="layout">
            <div className="header"></div>
            <div className="slide-alert"></div>
            <div className='col-wrapper'>
              <div className="slide-col col-1"></div>
              <div className="slide-col col-2"></div>
              <div className="slide-col col-3">
                <div className="slide-btn" onClick={handleOnClickTrigger}>trigger</div>
              </div>
            </div>
            <div className="footer"></div>
          </div>
        </div>
      </div>

      <div className="slide slide4"><a name="highlight"></a>
        <div className="blurb">
          <div className="title">Highlight</div>
          <div className="sub">Answers the Question: <strong>What is important here?</strong></div>
        </div>
        <div className="example example-4">
          <div className="ui">
            <div className="highlight1"></div>
            <div className="highlight2"></div>
            <div className="col col-1"></div>
            <div className="col col-2"></div>
          </div>
        </div>
      </div>

      <div className="slide slide5"><a name="visual-feedback"></a>
        <div className="blurb">
          <div className="title">Visual Feedback</div>
          <div className="sub">Answers the Question: <strong> Is the layout understanding what I am asking it to do?</strong></div>
        </div>
        <div className="example example-5">
          <div className="email">
            <div className="masthead"></div>
            <div className="send" onClick={handleOnClickSend}></div>
          </div>
        </div>
      </div>
      
      <div className="slide slide6"><a name="system-status"></a>
        <div className="blurb">
          <div className="title">System Status</div>
          <div className="sub">Answers the Question: <strong>Is this working? How long will it take?</strong></div>
        </div>
        <div className="example example-6">
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slides

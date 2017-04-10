import React from 'react'

const NotificationAlertModal = props => {

  const handleOnClickNavLi = e => {
    const allNavLi = document.querySelectorAll('.nav li')
    allNavLi.forEach((el, i) => {
      if(el.contains(e.target)) {
        el.classList.add('is-active')
      } else {
        el.classList.remove('is-active')
      }
    })
  }

  const handleOnClickToggleClass = e => {
    document.querySelector('.alert-element').classList.toggle('is-active')
  }

  const handleOnClickShowProfile = e => {
    document.querySelector('.NotificationAlertModal-overlay').classList.add('is-active')
    setTimeout(() => {
      document.querySelector('.NotificationAlertModal-overlay').classList.remove('is-active')
    }, 5000);
  }

  return (
    <div className='NotificationAlertModal'>
      {/*<!-- Section 1 - Notification-->*/}
      <section className="section-notification">
        <ul className="nav">
          <li onClick={e => handleOnClickNavLi(e)}><i className="material-icons">home</i></li>
          <li onClick={e => handleOnClickNavLi(e)}><i className="material-icons">search</i></li>
          <li onClick={e => handleOnClickNavLi(e)}
              className="is-active"><i className="material-icons">star
              <ul className="notifications">
                <li><i className="material-icons">remove_red_eye</i><span>9</span></li>
                <li><i className="material-icons">comment</i><span>4</span></li>
                <li><i className="material-icons">account_circle</i><span>6</span></li>
              </ul></i></li>
          <li onClick={e => handleOnClickNavLi(e)}><i className="material-icons">face</i></li>
        </ul>
      </section>
      {/*<!-- Section 2 - Alert-->*/}
      <section className="section-alert">
        <div className="website">
          <div className="title-block">
            <div className="title"><i className="material-icons site-icon">face</i>
              <span>Many faces of murray</span>
              <hr/>
            </div>
          </div>
          <div className="grid">
            <div className="item" onClick={e => handleOnClickToggleClass(e)}></div>
            <div className="item" onClick={e => handleOnClickToggleClass(e)}></div>
            <div className="item" onClick={e => handleOnClickToggleClass(e)}></div>
            <div className="item" onClick={e => handleOnClickToggleClass(e)}></div>
            <div className="item" onClick={e => handleOnClickToggleClass(e)}></div>
            <div className="item" onClick={e => handleOnClickToggleClass(e)}></div>
            <div className="item" onClick={e => handleOnClickToggleClass(e)}></div>
            <div className="item" onClick={e => handleOnClickToggleClass(e)}></div>
            <div className="item" onClick={e => handleOnClickToggleClass(e)}></div>
            <div className="item" onClick={e => handleOnClickToggleClass(e)}></div>
            <div className="item" onClick={e => handleOnClickToggleClass(e)}></div>
            <div className="item" onClick={e => handleOnClickToggleClass(e)}></div>
            <div className="item" onClick={e => handleOnClickToggleClass(e)}></div>
            <div className="item" onClick={e => handleOnClickToggleClass(e)}></div>
            <div className="item" onClick={e => handleOnClickToggleClass(e)}></div>
            <div className="item" onClick={e => handleOnClickToggleClass(e)}></div>
          </div>
          <div className="alert-element">
            <div className="icon"><i className="material-icons">notifications</i></div>
            <div className="section-text"><span>You clicked a Murray!!</span></div>
          </div>
        </div>
      </section>
      {/*<!-- Section 3 - Modal-->*/}
      <section className="section-modal">
        <div className="NotificationAlertModal-profile" onClick={e => handleOnClickShowProfile(e)}>
          <img src="http://www.fillmurray.com/130/130" alt="" />
          <div className="NotificationAlertModal-text">
            <div className="NotificationAlertModal-name">Bill Murray</div>
            <div className="NotificationAlertModal-meta">Click me!</div>
          </div>
        </div>
        <div className="NotificationAlertModal-overlay">
          <div className="NotificationAlertModal-modal">
            <div className="NotificationAlertModal-title">You clicked a Murray!</div>
            <div className="NotificationAlertModal-body">
              <div className="NotificationAlertModal-img" style={{ backgroundImage: "url(http://www.fillmurray.com/180/180)"}}></div>
              <div className="NotificationAlertModal-text">
                <p>Bill Murray loves you, and sends his most sincere regards.</p>
                <p>He also asks that you simply keep on hacking.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NotificationAlertModal

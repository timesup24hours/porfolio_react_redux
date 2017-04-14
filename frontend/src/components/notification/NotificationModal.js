import React from 'react'

const NotificationModal = props => {
  const active = props.show ? 'is-active' : ''

  return (
    <div className='NotificationModal'>
      <div className={`NotificationModal-overlay ${active}`}>
        <div className="NotificationModal-modal">
          <div className="NotificationModal-title">{props.title}</div>
          <div className="NotificationModal-body">
            <div
              className="NotificationModal-img"
              style={{ backgroundImage: "url(http://www.fillmurray.com/180/180)" }}>
            </div>
            <div className="NotificationModal-text">
              <p>{props.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationModal

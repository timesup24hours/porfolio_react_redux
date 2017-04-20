import React from 'react'
import CheckBox from 'material-ui/svg-icons/toggle/check-box'

const NotificationModal = props => {
  const active = props.show ? 'is-active' : ''

  return (
    <div className='NotificationModal'>
      <div className={`NotificationModal-overlay ${active}`}>
        <div className="NotificationModal-modal">
          <div className="NotificationModal-title">{props.title}</div>
          <div className="NotificationModal-body">
            <div
              className="NotificationModal-img flexCenter"
              >
              <CheckBox style={{ color: 'lightGreen', fontSize: '50px', height: '50px', width: '50px' }}/>
            </div>
            <div className="NotificationModal-text flexCenter">
              <p>{props.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationModal

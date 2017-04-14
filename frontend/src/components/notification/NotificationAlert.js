import React from 'react'

const NotificationAlert = props => {
  let active = props.show ? 'is-active' : ''

  return (
    <div className='NotificationAlert'>
      <div className={`NotificationAlert-element ${active}`}>
        <div className="NotificationAlert-icon"><i className="material-icons">notifications</i></div>
        <div className="NotificationAlert-text"><span>{props.content}</span></div>
      </div>
    </div>
  )
}

export default NotificationAlert

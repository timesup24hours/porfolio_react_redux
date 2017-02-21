import React from 'react'
import Cancel from 'material-ui/svg-icons/navigation/cancel'

export default (props) => {
  const { content, cancellable, show, email, handleHide, children } = props
  // let cancelHide = cancellable ? '' : 'cancel-hide'
  let notificationShow = show ? '' : 'hide'

  return (
    <div className={`animated fadeIn Notification-container ${notificationShow}`}>
      <div>
        {content}
        {children ? children : null}
        <strong>{email}</strong>
      </div>
      {cancellable
        ? <div onClick={handleHide} className={`cancel`}><Cancel /></div>
        : null }
    </div>
  )
}

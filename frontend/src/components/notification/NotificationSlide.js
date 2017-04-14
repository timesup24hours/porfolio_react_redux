import React from 'react'
import Clear from 'material-ui/svg-icons/content/clear'

const NotificationSlide = props => {
  const open = props.open ? 'is-open' : ''

  return (
    <div className={`NotificationSlide ${open}`}>
      {props.content}
      <div
        className='NotificationSlide-cancel pull-right flexCenter'
        onClick={props.cancel}
      >
        <Clear style={{ color: 'white' }} />
      </div>
    </div>
  )
}

export default NotificationSlide

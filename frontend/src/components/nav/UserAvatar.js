import React from 'react'

const UserAvatar = props => {
  return (
    <div className='UserAvatar-container' onClick={() => props.onClick()}>
      {props.user.local.nickname ? props.user.local.nickname.split('')[0].toUpperCase() : props.user.local.username.split('')[0].toUpperCase()}
    </div>
  )
}

export default UserAvatar

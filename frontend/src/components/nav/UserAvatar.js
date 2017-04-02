import React from 'react'

const UserAvatar = props => (
  <div className='UserAvatar-container'>
    {props.user.local.nickname ? props.user.local.nickname.split('')[0].toUpperCase() : props.user.local.username.split('')[0].toUpperCase()}
  </div>
)

export default UserAvatar

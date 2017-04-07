import React from 'react'

const UserPopUpProfile = props => {
  // const defaultAvatar = '/images/avatar/avatar.jpg'
  return (
    <div className='UserPopUpProfile'>
      <div className='UserPopUpProfile-mask' onClick={() => props.onClick()}></div>
      <div className='UserPopUpProfile-wrapper'>
        <div className='UserPopUpProfile-picture'>
          {props.user.avatar
            ? <img src={props.user.avatar} alt=""/>
            : <div className='UserPopUpProfile-default-avatar'>
                {props.user.local.nickname ? props.user.local.nickname.split('')[0].toUpperCase() : props.user.local.username.split('')[0].toUpperCase()}
              </div>
          }
        </div>
        <div className='UserPopUpProfile-username'>{props.user.local.nickname || props.user.local.username}</div>
      </div>
    </div>
  )
}

export default UserPopUpProfile

import React, { Component } from 'react'

class MessageList extends Component {

  render() {
    return(
      <div className='MessageList-container'>
        <div className='MessageList-user'>
          <div>{this.props.user}</div><div>:</div>
        </div>
        <div className='MessageList-content'>
          <div>{this.props.content}</div>
        </div>
      </div>
    )
  }
}

export default MessageList

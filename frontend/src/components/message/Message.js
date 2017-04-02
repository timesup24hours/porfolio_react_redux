import React from 'react'
import { connect } from 'react-redux'
import MessageForm from './MessageForm'
import MessageList from './MessageList'


const Message = props => {

  const messages = props.message.messages.map( (m, i) => {
    return <MessageList user={m.user.local.username} content={m.content} key={i} />
  })

  return (
    <div className='Message-container animated fadeIn'>
      <MessageForm />
      {messages ? messages : <div>No Message</div>}
    </div>
  )

}

const mapStateToProps = state => ({
  auth: state.auth,
  message: state.message
})

export default connect(mapStateToProps, {})(Message)

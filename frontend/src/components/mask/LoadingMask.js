import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const LoadingMask = props => {

  const style = {
    position: 'fixed',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    backgroundColor: 'rgba(204, 204, 204, .3)',
    zIndex: '100000',
  }

  return (
    <div className='LoadingMask flexCenter' style={style}>
      <CircularProgress size={50} thickness={3}/>
    </div>
  )
}

export default LoadingMask

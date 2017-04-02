import React from 'react'
// import CircularProgress from 'material-ui/CircularProgress';

const Spinner = () => (
  <div className='flexCenter'>
    <div className="preloader-wrapper big active">
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  </div>
)

export default Spinner

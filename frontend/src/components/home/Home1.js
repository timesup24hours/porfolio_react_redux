import React from 'react'
import home1Img from '../../../public/images/home1.jpg'

const Home1 = () => {
  return (
    <div className='Home1-container' id='home'>
      <div className='Home1-left'>
        <div className='Home1-left-img'>
          <img src={home1Img} alt=""/>
        </div>
      </div>
      <div className='Home1-right'>
        <div className='Home1-right-holder'>
          <div className='Home1-right-text'>
            <div className='Home1-right-text-header'>Build with</div>
            <div className='Home1-right-text-title'>Technologis: </div>
          </div>
          <div className='Home1-right-chip-wrapper'>
            <div className="chip">ReactJS</div>
            <div className="chip">Redux</div>
            <div className="chip">SASS</div>
            <div className="chip">NodeJS</div>
            <div className="chip">ExpressJS</div>
            <div className="chip">MongoDB</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home1

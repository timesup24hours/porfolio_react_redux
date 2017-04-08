import React from 'react'
import Home36Img from '../../../public/images/home36.png' //<img src={Home3Img} alt=""/>

const Home3 = () => {
  return (
    <div className='Home3-container' id='home'>
      <div className='Home3-left'>
        <div className='Home3-left-img' style={{ backgroundImage: `url(${Home36Img})` }}>
        </div>
      </div>
      <div className='Home3-right'>
        <div className='Home3-right-holder'>
          <div className='Home3-right-header'>Contact me</div>
          <div className='Home3-right-title'>
            <a href="https://boiling-headland-77828.herokuapp.com/">huanlinhuang@gmail.com</a>
            <br/><br/>
            <div className='Home3-right-phone'>415-361-9522</div>
          </div>
          <div className='Home3-right-text'>Available to Hire. <br/>Bay area, CA or Des Moines, IA</div>
        </div>
      </div>
    </div>
  )
}

export default Home3

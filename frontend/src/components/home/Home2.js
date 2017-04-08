import React from 'react'
import home2Img from '../../../public/images/home2.png' //<img src={home2Img} alt=""/>

const Home2 = () => {
  return (
    <div className='Home2-container' id='home'>
      <div className='Home2-left'>
        <div className='Home2-left-img' style={{ backgroundImage: `url(${home2Img})` }} >
        </div>
      </div>
      <div className='Home2-right'>
        <div className='Home2-right-holder'>
          <div className='Home2-right-holder-header'>MORE SITES</div>
          <div className='Home2-right-holder-title'>
            <a href="https://boiling-headland-77828.herokuapp.com/">www.huanlinhuang.com</a>
            <br/><br/>
            <a href="https://arcane-everglades-44901.herokuapp.com">https://arcane-everglades-44901.herokuapp.com</a>
          </div>
          <div className='Home2-right-holder-text'>Build with the some Technologis. They take 30 sec to load because host by heroku free plan.</div>
        </div>
      </div>
    </div>
  )
}

export default Home2

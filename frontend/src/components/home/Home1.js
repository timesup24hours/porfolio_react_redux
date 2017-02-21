import React from 'react'
import home1Img from '../../../public/images/home1.jpg'
import Chip from 'material-ui/Chip'

const styles = {
  chip: {
    margin: 4,
  }
}

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
            <Chip style={styles.chip}>ReactJS</Chip>
            <Chip style={styles.chip}>Redux</Chip>
            <Chip style={styles.chip}>SASS</Chip>
            <Chip style={styles.chip}>NodeJS</Chip>
            <Chip style={styles.chip}>ExpressJS</Chip>
            <Chip style={styles.chip}>MongoDB</Chip>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home1

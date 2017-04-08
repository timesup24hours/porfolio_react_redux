import React, { Component } from 'react'
import Home36Img from '../../../public/images/home36.png' //<img src={Home3Img} alt=""/> style={{ backgroundImage: `url(${Home36Img})` }}

class Home3 extends Component {

  handleCssImgToDomImg = () => {
    const imgTag = document.createElement("img")
    imgTag.setAttribute('src', Home36Img)
    imgTag.setAttribute('alt', '')

    const imgDiv = document.querySelector('#Home3-img')

    if(window.matchMedia("(max-width: 500px)").matches) {
      if(imgDiv.hasAttribute('style')) imgDiv.removeAttribute('style')
      if(imgDiv.classList.contains('Home3-left-img')) imgDiv.classList.remove('Home3-left-img')
      if(!imgDiv.hasChildNodes()) imgDiv.appendChild(imgTag)
    } else {
      if(imgDiv.hasChildNodes()) imgDiv.removeChild(imgDiv.firstChild)
      if(!imgDiv.hasAttribute('style')) imgDiv.setAttribute('style', `kbackgroundImage: url(${Home36Img})`)
      if(!imgDiv.classList.contains('Home3-left-img')) imgDiv.classList.add('Home3-left-img')

    }
  }

  // for learning purpose
  // detect resize width in js and change for backgroundImage from css url attribute to html dom
  componentDidMount() {
    window.addEventListener('resize', this.handleCssImgToDomImg)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleCssImgToDomImg)
  }

  render() {
    return (
      <div className='Home3-container' id='home'>
        <div className='Home3-left'>
          <div id='Home3-img' className='Home3-left-img' style={{ backgroundImage: `url(${Home36Img})` }} >
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
}

export default Home3

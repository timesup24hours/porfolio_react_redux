import React, { Component } from 'react'
import home2Img from '../../../public/images/home2.png' //<img src={home2Img} alt=""/>

class Home2 extends Component {

  handleCssImgToDomImg = () => {
    const imgTag = document.createElement("img")
    imgTag.setAttribute('src', home2Img)
    imgTag.setAttribute('alt', '')

    const imgDiv = document.querySelector('#Home2-img')

    if(window.matchMedia("(max-width: 500px)").matches) {
      if(imgDiv.hasAttribute('style')) imgDiv.removeAttribute('style')
      if(imgDiv.classList.contains('Home2-left-img')) imgDiv.classList.remove('Home2-left-img')
      if(!imgDiv.hasChildNodes()) imgDiv.appendChild(imgTag)
    } else {
      if(imgDiv.hasChildNodes()) imgDiv.removeChild(imgDiv.firstChild)
      if(!imgDiv.hasAttribute('style')) imgDiv.setAttribute('style', `kbackgroundImage: url(${home2Img})`)
      if(!imgDiv.classList.contains('Home2-left-img')) imgDiv.classList.add('Home2-left-img')

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
      <div className='Home2-container' id='home'>
        <div className='Home2-left'>
          <div id='Home2-img' className='Home2-left-img' style={{ backgroundImage: `url(${home2Img})` }} >
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
}

export default Home2

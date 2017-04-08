import React from 'react'
import Spinner from '../spinner/Spinner'
import { connect } from 'react-redux'
import * as galleryActions from '../../store/actions/galleryActions'
const Gallery = props => {

  if(props.images) {
    const thumbnails = props.images.map((img, i) => {
      return (<div key={i} className={`Gallery-thumbnail ${props.gallery.currentImageIndex === i ? 'active' : ''}`}
                onClick={() => props.setCurrentImage(i)}
                onMouseOver={() => props.setTempPreviewImageIndex(i)}
                onMouseOut={() => props.clearTempPreviewImageIndex()}>
                <img src={`/images/products/${img}`} alt=''/>
              </div>)
    })
    const previewImage = props.images.filter((img, i) => {
      return props.gallery.tempPreviewImageIndex !== undefined
              ? props.gallery.tempPreviewImageIndex === i
              : props.gallery.currentImageIndex === i
    })


    const onmouseover = () => {
      let floatBox = document.getElementById('float-box');
      let amplify = document.getElementById('Gallery-amplify');
      floatBox.style.display = 'block'
      amplify.style.display = 'block'
    }

    const onmouseout = () => {
      let floatBox = document.getElementById('float-box');
      let amplify = document.getElementById('Gallery-amplify');
      floatBox.style.display = 'none'
      amplify.style.display = 'none'
    }

    const onmousemove = (ev) => {
      let container = document.getElementById('Gallery-amplify-container');
      // let holder = document.getElementById('Gallery-img-preview-holder');
      let previewImg = document.getElementById('Gallery-preview-img');
      let mark = document.getElementById('mark');
      let floatBox = document.getElementById('float-box');
      let amplify = document.getElementById('Gallery-amplify');
      let amplifyImg = document.getElementById('Gallery-amplify-img')

      let _event = ev || window.event;  //兼容多个浏览器的event参数模式

      let left = _event.pageX - container.offsetLeft - previewImg.offsetLeft - floatBox.offsetWidth / 2  - 20;
      let top = _event.pageY - container.offsetTop - previewImg.offsetTop - floatBox.offsetHeight / 2 - 164;

      if (left < 0) {
        left = 0;
      } else if (left > (previewImg.offsetWidth - floatBox.offsetWidth)) {
        left = previewImg.offsetWidth - floatBox.offsetWidth;
      }

      if (top < 0) {
        top = 0;
      } else if (top > (previewImg.offsetHeight - floatBox.offsetHeight)) {
        top = previewImg.offsetHeight - floatBox.offsetHeight;

      }

      floatBox.style.left = left + 'px';
      floatBox.style.top = top + 'px';

      let percentX = left / (mark.offsetWidth - floatBox.offsetWidth);
      let percentY = top / (mark.offsetHeight - floatBox.offsetHeight);

      amplifyImg.style.left = -percentX * (amplifyImg.offsetWidth - amplify.offsetWidth) + 'px';
      amplifyImg.style.top = -percentY * (amplifyImg.offsetHeight - amplify.offsetHeight) + 'px';
    }


    return (
      <div className='Gallery-container'>
        <div className='Gallery-thumbnail-holder'>{thumbnails}</div>

          <div id='Gallery-amplify-container' className='Gallery-amplify-container'>
            <div id='Gallery-img-preview-holder' className='Gallery-img-preview-holder'>
              <div
                onMouseOver={onmouseover}
                onMouseOut={onmouseout}
                onMouseMove={onmousemove}
                id='mark'
                className='mark'></div>
              <div id='float-box' className='float-box'></div>
              <img id='Gallery-preview-img' src={`/images/products/${previewImage}`} alt=''/>
            </div>
            <div id='Gallery-amplify' className='Gallery-amplify'>
              <img id='Gallery-amplify-img' src={`/images/products/${previewImage}`} alt=''/>
            </div>
          </div>

      </div>
    )
  } else {
    return <Spinner />
  }
}

const mapStateToProps = state => ({
  gallery: state.gallery,
})
const mapDispatchToProps = dispatch => ({
  setCurrentImage: payload => dispatch(galleryActions.setCurrentImage(payload)),
  clearCurrentImage: () => dispatch(galleryActions.clearCurrentImage()),
  showAmplify: () => dispatch(galleryActions.showAmplify()),
  hideAmplify: () => dispatch(galleryActions.hideAmplify()),
  setTempPreviewImageIndex: payload => dispatch(galleryActions.setTempPreviewImageIndex(payload)),
  clearTempPreviewImageIndex: () => dispatch(galleryActions.clearTempPreviewImageIndex()),
})

Gallery.propTypes = {
  images: React.PropTypes.arrayOf(React.PropTypes.string),
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)

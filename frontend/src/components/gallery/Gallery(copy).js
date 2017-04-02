import React from 'react'
import Spinner from '../spinner/Spinner'
import { connect } from 'react-redux'
import * as galleryActions from '../../store/actions/galleryActions'
const Gallery = props => {

  const handleAmplify = e => {
    let el = document.getElementById('Gallery-amplify-img')
    el.style.transform = 'scale(1.8)'
    // console.log('getBoundingClientRect().width ', el.getBoundingClientRect().width); // get the width of the element
    // console.log('getBoundingClientRect().height ', el.getBoundingClientRect().height); // get the height of the element
    // console.log('getBoundingClientRect().top ', el.getBoundingClientRect().top); // get the distance of top from relative parent
    // console.log('getBoundingClientRect().top ', el.getBoundingClientRect().left); // get the distance of left from relative parent
    // console.log('e.pageY ', e.pageY); // get the mouse location of Y from the top of inside the browser
    // console.log('e.pageX ', e.pageX); // get the mouse location of X from the top of inside the browser
    el.style.transformOrigin =
    ((e.clientX - el.getBoundingClientRect().left) / el.getBoundingClientRect().width) * 100 + '% ' +
    ((e.clientY - el.getBoundingClientRect().top) / el.getBoundingClientRect().height) * 100 + '%'
  }

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
    return (
      <div className='Gallery-container'>
        <div className='Gallery-thumbnail-holder'>{thumbnails}</div>
        <div className='Gallery-preview-image' onClick={() => props.showAmplify()}>
          <img src={`/images/products/${previewImage}`} alt=""/>
        </div>
        {props.gallery.amplifyShow &&
          <div id='Gallery-amplify'
            className='Gallery-amplify'
            onMouseMove={e => handleAmplify(e)}
            onClick={() => props.hideAmplify()}>
            <img id='Gallery-amplify-img' src={`/images/products/${previewImage}`} alt=""/>
          </div>}
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

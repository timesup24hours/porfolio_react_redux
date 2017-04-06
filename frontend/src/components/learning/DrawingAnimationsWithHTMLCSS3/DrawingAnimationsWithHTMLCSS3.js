import React, { Component } from 'react'

class DrawingAnimationsWithHTMLCSS3 extends Component {

  render() {
    return (
      <div className='DrawingAnimationsWithHTMLCSS3'>
        <h1>"Drawing" animations with HTML & CSS3</h1>

         <div>
          	<p>I just use a "strokeDashoffset" transition on (svg) shapes and get this effect.</p>

          	<svg x="0px" y="0px" width="200px" height="200px" viewBox="0 0 200 200" enableBackground="new 0 0 200 200">
          		<path fill="#202020" stroke="#FFFFFF" strokeMiterlimit="10" strokeDasharray="680" strokeDashoffset="680" d="M180.315,5.078c-5.502-7.275-48.729,8.672-55.277,34.671
          		c-7.592-2.437-15.681-3.765-24.082-3.765c-11.218,0-21.883,2.358-31.542,6.585c0-0.002,0-0.004,0-0.006
          		c-3.975-27.65-50.146-45.02-55.843-37.485C5.354,15.945,20.18,68.245,26.519,88.974c-0.064,0.185-0.136,0.367-0.199,0.553
          		c-2.674,7.917-4.124,16.398-4.124,25.217c0,43.499,35.262,78.761,78.76,78.761c43.499,0,78.76-35.262,78.76-78.761
          		c0-13.274-3.299-25.774-9.1-36.747C177.572,53.742,187.323,14.345,180.315,5.078z"/>
        		</svg>

        		<p>Value of strokeDasharray & strokeDashoffset = perimeter of the shape </p>
        	</div>

        	<div>
           	<p>You can use it on text too.</p>

            	<svg x="0px" y="0px" width="540px" height="140px" viewBox="0 0 570 160" enableBackground="new 0 0 430 140">
        		    <text transform="matrix(1 0 0 1 23.6851 93.8193)" fill="#202020" stroke="#FFFFFF" strokeDasharray="640" strokeDashoffset="640" fontFamily="'Oswald-Regular'" fontSize="120">Awesome!</text>
        		  </svg>

        		<p>Value of strokeDasharray & strokeDashoffset = perimeter of the bigger letter</p>
         	</div>

      </div>
    )
  }
}

export default DrawingAnimationsWithHTMLCSS3

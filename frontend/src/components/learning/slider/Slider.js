import React from 'react'
import './Slider.scss'

const Slider = () => (
  <div className='Slider-container'>
    <header className='Slider-header'>
      <label htmlFor="Slider-1-trigger">Slide one</label>
      <label htmlFor="Slider-2-trigger">Slide two</label>
      <label htmlFor="Slider-3-trigger">Slide thrid</label>
      <label htmlFor="Slider-4-trigger">Slide four</label>
    </header>

    <input id='Slider-1-trigger' type="radio" name='sliders' checked/>
    <section className='slide slide-one'>
      <h1>Headline one</h1>
    </section>
    <input id='Slider-2-trigger' type="radio" name='sliders' />
    <section className='slide slide-two'>
      <h1>Headline two</h1>
    </section>
    <input id='Slider-3-trigger' type="radio" name='sliders' />
    <section className='slide slide-thrid'>
      <h1>Headline thrid</h1>
    </section>
    <input id='Slider-4-trigger' type="radio" name='sliders' />
    <section className='slide slide-four'>
      <h1>Headline four</h1>
    </section>
  </div>
)

export default Slider

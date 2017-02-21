import React, { Component } from 'react'
import Nav from './nav/Nav'
// import Block from './block/Block' <Block />
import NavLeftMenu from './nav/NavLeftMenu'
import Mask from './mask/Mask'
import Logo from './nav/Logo'

class App extends Component {
  render() {
    return (
      <div className='App-container'>
        <Nav />
        <Logo />
        <Mask />
        <NavLeftMenu />
        <div className=''>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App

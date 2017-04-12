import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import ArrowBack from 'material-ui/svg-icons/hardware/keyboard-backspace'
import CallReceived from 'material-ui/svg-icons/communication/call-received'
import { injectStyle } from '../../utils';

class LeftSideBar extends Component {
  constructor(props) {
    super(props);

    const keyframesStyle1 = `
      @-webkit-keyframes pulse {
        0%   { background-color: #fecd6d; }
        25%  { background-color: #ef7b88; }
        50%  { background-color: #acdacf; }
        75%  { background-color: #87c3db; }
        100% { background-color: #fecd6d; }
      }
    `;

    const keyframesStyle2 = `
      @-webkit-keyframes btnOpacity {
        0%   { opacity: 0; }
        100% { opacity: 1; }
      }
    `;

    injectStyle(keyframesStyle1);
    injectStyle(keyframesStyle2);

    this.state = {
      style: {
        button: {
          position: 'absolute',
          top: '-15px',
          height: '50px',
          width: '50px',
          left: '205px',
          transition: 'background-color 300ms linear',
          transition: 'opacity 3000ms linear',
          WebkitAnimation: 'pulse 2s linear infinite, btnOpacity 3000ms linear forwards 1000ms',
          opacity: '0',
        },
        icon: {
        }
      },
      navShow: false,
    }

  }

  static contextTypes = {
    router: React.PropTypes.object,
  }

  resizeListener = () => {
    if(window.matchMedia("(max-width: 500px)").matches) {
      this.setState({ navShow: true })
      document.querySelector('.LeftSideBar').style.left = '-220px'
    } else {
      this.setState({ navShow: false })
      document.querySelector('.LeftSideBar').style.left = '0px'
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener)
  }

  handleShowLeftSideBar = (e) => {
    if(document.querySelector('.LeftSideBar').style.left !== '0px') {
      document.querySelector('.LeftSideBar').style.left = '0px'
      document.querySelector('.LeftSideBar-mask').style.display = 'block'
      this.setState({ navShow: false })
    } else {
      document.querySelector('.LeftSideBar').style.left = '-220px'
      document.querySelector('.LeftSideBar-mask').style.display = 'none'
      this.setState({ navShow: true })
    }
  }

  render() {
    const { style } = this.state

    const menu = this.props.menu.department.map((d, di) => {
      return (<ListItem
                style={{ fontSize: '14px', hoverColor: 'grey' }}
                key={di}
                primaryText={d.name.name}
                initiallyOpen={false}
                primaryTogglesNestedList={false}
                nestedItems={
                  d.children.map((c, ci) => {
                    return c.name ?
                    (<ListItem
                        onClick={() => this.context.router.push(`/shop/${d.name.to}/${c.to}`)}
                        style={{ fontSize: '12px' }}
                        key={ci}
                        primaryText={c.name}
                     />) : null
                  })

                }
               />)
    })

    return (
      <div className='LeftSideBar'>
        <div className='LeftSideBar-mask' onClick={() => this.handleShowLeftSideBar()}></div>
        {this.state.navShow
          ? <FloatingActionButton
              id='LeftSideBar-btn'
              style={style.button}
              iconStyle={style.icon}
              onClick={(e) => this.handleShowLeftSideBar(e)}
            >
              <ArrowForward style={{ transform: 'rotate(45deg)' }} />
            </FloatingActionButton>
          : null
        }
        <br />
          <List>
            <Subheader>Departments</Subheader>
            {menu}
          </List>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  menu: state.menu,
})
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideBar)

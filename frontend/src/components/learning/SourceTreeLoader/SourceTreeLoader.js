import React, { Component } from 'react'

class SourceTreeLoader extends Component {

  render() {
    return (
      <div className='SourceTreeLoader'>
        <svg version="1.1" id="sourcetree_loader" style={{ width: '150px', height: '150px' }}>
          <g className="rotate-group" transform="translate(75, 75)">
            <g className="border-group">
              <circle className="border" cx="0" cy="0" r="70" />
            </g>
          </g>
          <g className="stems">
            <polyline className="st1" points="76,143.5 76,30" />
            <polyline className="st2" points="65,143.5 65,110.1 43,100" />
            <polyline className="st3" points="76,94.8 49,82.4 49,72.8 34,65" />
            <polyline className="st4" points="76,76.8 60.9,69 60.9,50.9 46,41" />
            <polyline className="st5" points="76,62.4 94.9,53 95,41" />
            <polyline className="st6" points="76,106.3 88.5,100.4 88.5,80.9 111.1,68.3 111,58" />
            <polyline className="st7" points="76,122 106.2,106.5 106,95" />
          </g>
          <g className="circles">
            <g transform="translate(76, 30)">
              <circle className="c1" cx="0" cy="0" r="6.4" />
            </g>
            <g transform="translate(43, 100)">
              <circle className="c2" cx="0" cy="0" r="6.4" />
            </g>
            <g transform="translate(34, 65)">
              <circle className="c3" cx="0" cy="0" r="6.4" />
            </g>
            <g transform="translate(46, 41)">
              <circle className="c4" cx="" cy="" r="6.4" />
            </g>
            <g transform="translate(95, 41)">
              <circle className="c5" cx="" cy="" r="6.4" />
            </g>
            <g transform="translate(111, 58)">
              <circle className="c6" cx="0" cy="0" r="6.4" />
            </g>
            <g transform="translate(106, 95)">
              <circle className="c7" cx="0" cy="0" r="6.4" />
            </g>
          </g>
        </svg>
      </div>
    )
  }
}

export default SourceTreeLoader

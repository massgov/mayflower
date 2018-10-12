import React from 'react'
import './style.css'
//import { animatePageScroll } from './scroll'

class Footnote extends React.Component {
    handleScroll = (id) => {
      const element = document.getElementById(id);
      element.scrollIntoView({block: 'end', behavior: 'smooth'})
    }
    render() {
      const {children, i} = this.props
      return(
        <div className="ma__footnote-item">
          <p id={`footnotemsg${i}`} onClick={() => this.handleScroll(`footnoteref${i}`)}>
            <span>{children}</span>
            <a>&uarr;</a>
          </p>
        </div>
      )
    }
  }

export default Footnote;

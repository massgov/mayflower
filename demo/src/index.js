import React, {Component} from 'react'
import {render} from 'react-dom'

// Import styles from @massds/mayflower npm package
import '../../node_modules/@massds/mayflower/css/index-generated.css'
import '../../node_modules/@massds/mayflower/css/base-theme-generated.css'

// Import vendor JS from @massds/mayflower npm package
// import '../node_modules/@massds/mayflower/js/vendor-generated.js'

// Import components for page scaffolding
import Footer from '../../src/components/organisms/Footer'

// Define styles for placeholder blocks
const placeHolderStyle = {
  color:'#bbb',
  minHeight:'200px',
  border:'4px dashed #ddd',
  fontSize:'2rem',
  lineHeight:'200px',
  textAlign:'center'
};

// Set up main content row
const Main = (props) => {
  return (
      <div className="main-content main-content--two">
      {/*
        Corresponds to @templates/two-column
        See: https://mayflower.digital.mass.gov/?p=templates-two-column
      */}
        <div className="page-content">
          <section className="ma__placeholder" style={placeHolderStyle}>
            Page content
          </section>
        </div>
        <aside className="sidebar ">
          <section className="ma__placeholder" style={placeHolderStyle}>
            Right Rail
          </section>
        </aside>
      </div>
  )
};

class Demo extends Component {
  render() {
    return (
      <main className="main-content">
      {/*
        Corresponds to @templates/two-column
        See: https://mayflower.digital.mass.gov/?p=templates-two-column
      */}
        <div className="pre-content">
          <section className="ma__placeholder" style={placeHolderStyle}>
            Pre Content
          </section>
        </div>
        {/*
            Add logic for sidebar layout modifier prop.
            See: https://github.com/massgov/massgov-search-poc/blob/dev/src/App.js#L16
        */}
        <Main />
        <div className="post-content">
          <section className="ma__placeholder" style={placeHolderStyle}>
            Post Content
          </section>
        </div>
        <Footer />
      </main>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'));

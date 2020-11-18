import React from 'react';
import Heading from '@massds/mayflower-react/dist/Heading';
import ColoredHeading from '@massds/mayflower-react/dist/ColoredHeading';
import CompHeading from '@massds/mayflower-react/dist/CompHeading';
import SidebarHeading from '@massds/mayflower-react/dist/SidebarHeading';
import { attachHTML, attachCSS } from '../../util/renderCode';

const coloredHeading = (
  <>
    <ColoredHeading
      color="blue"
      level="2"
      text="Colored Heading (Primary)"
    />
    <ColoredHeading
      color="green"
      sidebar={true}
      level="2"
      text="Colored Heading (Primary Alt)"
    />
    <ColoredHeading
      color=""
      level="2"
      text="Colored Heading (Gray)"
    />
  </>

)

const compHeading = (
  <>
    <CompHeading
      centered={false}
      color=""
      id=""
      level={3}
      sidebar={false}
      title="Comp Heading (Primary Alt | H3)"
      titleContext=""
    />
    <CompHeading
      centered={false}
      color="yellow"
      id=""
      level={4}
      sidebar={false}
      title="Comp Heading (Highlight | H4)"
      titleContext=""
    />
    <CompHeading
      centered={false}
      color="gray"
      id=""
      level={5}
      sidebar={false}
      title="Comp Heading (Gray | H5)"
      titleContext=""
    />
  </>
)


const sidebarHeading = (
  <SidebarHeading
    level={2}
    title="List Heading"
  />
)

export const headingColored = () => coloredHeading;
attachHTML(headingColored, coloredHeading)


export const headingComp = () => compHeading;
attachHTML(headingComp, compHeading)


export const headingSidebar = () => sidebarHeading;
attachHTML(headingSidebar, sidebarHeading)



const cssHeading = '// Link to CSS: <link rel="stylesheet" href="https://unpkg.com/@massds/mayflower-assets@[version]/css/heading.css">'

const cssHeadingColored = '// Link to CSS: <link rel="stylesheet" href="https://unpkg.com/@massds/mayflower-assets@[version]/css/colored-heading.css">'

const cssHeadingComp = '// Link to CSS: <link rel="stylesheet" href="https://unpkg.com/@massds/mayflower-assets@[version]/css/comp-heading.css">'

const cssHeadingSidebar = '// Link to CSS: <link rel="stylesheet" href="https://unpkg.com/@massds/mayflower-assets@[version]/css/sidebar-heading.css">'


// exported story names must be unique
export const headingCSS = () => null;
attachCSS(headingCSS, cssHeading)

export const headingColoredCSS = () => null;
attachCSS(headingColoredCSS, cssHeadingColored)

export const headingCompCSS = () => null;
attachCSS(headingCompCSS, cssHeadingComp)


export const headingSidebarCSS = () => null;
attachCSS(headingSidebarCSS, cssHeadingSidebar)

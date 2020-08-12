import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SidebarHeading from '../../atoms/headings/SidebarHeading';
import { ColorSwatch, GradientSpectrum } from './index';
import { themeColors, grayScaleColors, utilityColors, primaryColors, primaryAltColors, highLightColors } from './colors.json';


import ColorGradientsDocs from './ColorGradients.md';

import './styles.scss';

storiesOf('brand/colors', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Colors', (() => (
    <React.Fragment>
      <SidebarHeading title="Mayflower Brand Colors" level={2} />
      <ul className="sg-colors">
        {
          // eslint-disable-next-line react/no-array-index-key
          themeColors.map((color, i) => <ColorSwatch key={`themeColors${i}`} {...color} variable={color.token} />)
        }
      </ul>
      <SidebarHeading title="Theme Colors Usage" level={2} />
      <ul className="sg-colors">
        {
          // eslint-disable-next-line react/no-array-index-key
          primaryColors.map((color, i) => <ColorSwatch key={`primaryColors${i}`} {...color} />)
        }
      </ul>
      <ul className="sg-colors">
        {
          // eslint-disable-next-line react/no-array-index-key
          primaryAltColors.map((color, i) => <ColorSwatch key={`primaryAltColors${i}`} {...color} />)
        }
      </ul>
      <ul className="sg-colors">
        {
          // eslint-disable-next-line react/no-array-index-key
          highLightColors.map((color, i) => <ColorSwatch key={`highLightColors${i}`} {...color} />)
        }
      </ul>
      <SidebarHeading title="Gray Scale Colors" level={2} />
      <ul className="sg-colors">
        {
          // eslint-disable-next-line react/no-array-index-key
          grayScaleColors.map((color, i) => <ColorSwatch key={`grayScaleColors${i}`} {...color} />)
        }
      </ul>
      <SidebarHeading title="Utility Colors" level={2} />
      <ul className="sg-colors">
        {
          // eslint-disable-next-line react/no-array-index-key
          utilityColors.map((color, i) => <ColorSwatch key={`utilityColors${i}`} {...color} />)
        }
      </ul>
    </React.Fragment>
  )))
  .add(
    'Gradients (Light)', (() => (
      <React.Fragment>
        {
          themeColors.map(({ token, name }, i) => {
            const props = {
              token: token.match(/\$(.*)/)[1],
              name,
              effect: 'tint'
            };
            return(
              // eslint-disable-next-line react/no-array-index-key
              <GradientSpectrum {...props} key={`spectrum_${token}${i}`} />
            );
          })
        }
      </React.Fragment>
    )),
    { info: ColorGradientsDocs }
  )
  .add(
    'Gradients (Dark)', (() => (
      <React.Fragment>
        {
          themeColors.map(({ token, name }, i) => {
            const props = {
              token: token.match(/\$(.*)/)[1],
              name,
              effect: 'shade'
            };
            return(
              // eslint-disable-next-line react/no-array-index-key
              <GradientSpectrum {...props} key={`spectrum_${token}${i}`} />
            );
          })
        }
      </React.Fragment>
    )),
    { info: ColorGradientsDocs }
  );

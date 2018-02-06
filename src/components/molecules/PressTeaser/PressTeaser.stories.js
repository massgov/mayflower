import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object } from '@storybook/addon-knobs/react';

import PressTeaser from './index';
//import orgSelectorOptions from './OrgSelector.knobs.options';
//import selectBoxOptions from '../../atoms/forms/SelectBox/SelectBox.knobs.options';

const props = {
    "image": {
      "src":"/assets/images/placeholder/320x180.png",
      "alt": "placeholder image"
    },
    "eyebrow": "Press Release",
    "title" : {
      "href":"#",
      "text":"MassParks",
      "info": "",
      "property": ""
    },
    "level": "",
    "date": "4/3/2017",
    "org": "Org Name",
    "description": {
      "rteElements": [{
        "path": "@atoms/11-text/paragraph.twig",
        "data": {
          "paragraph" : {
            "text": "Optional description"
          }
        }
      }]
    }
  };

storiesOf('molecules', module).addDecorator(withKnobs)
  .add(
    'PressTeaser',
    withInfo(``)(() => {
      const props = {
    "image": {
      "src":"https://mayflower.digital.mass.gov/assets/images/placeholder/320x180.png",
      "alt": "placeholder image"
    },
    "eyebrow": "Press Release",
    "title" : {
      "href":"#",
      "text":"MassParks",
      "info": "",
      "property": ""
    },
    "level": "",
    "date": "4/3/2017",
    "org": "Org Name",
    "description": {
      "rteElements": [{
        "path": "@atoms/11-text/paragraph.twig",
        "data": {
          "paragraph" : {
            "text": "Optional description"
          }
        }
      }]
    }
  };

      return(<PressTeaser {...props} />);
    })
  );

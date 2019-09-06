import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean, number, object, array } from '@storybook/addon-knobs';

import { Paragraph, DecorativeLink, ContactGroup, IconLink, Link, Icon } from '../../../index';
import { svgOptions } from '../../atoms/icons/Icon/Icon.knob.options';
import ReactHtmlParser from 'react-html-parser';
import ButtonWithIcon from '../../atoms/buttons/ButtonWithIcon';
import GenTeaser from './index';

// The default rendered date needs to be constant for visual regression tests.
const defaultDate = new Date('2018-02-02');

storiesOf('organisms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'GenTeaser', () => {
      const subLinks = [{
          text: "this is a link",
          href: "this is information",
          description: "this is description"
        },{
          text: "this is a link",
          href: "this is information",
          description: "this is description"
        },{
          text: "this is a link",
          href: "this is information",
          description: "this is description"
        }]
      const title = {
        info: 'Title info here',
        text: 'Lorem ipsum dolor sit amet',
        href: '#',
        showFileIcon: false
      }
      const description = "A paragraph (from the Greek paragraphos, \"to write beside\" or \"written beside\") is a self-contained unit of a discourse in <b>writing dealing with a particular</b> point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose."
      const eyebrow = 'press-release';
      const date = '01/01/2019';
      const orgs = 'Massachusetts Department Of Environmental Protection,Massachusetts Department Of Environmental Protection,Massachusetts Department Of Environmental Protection,Massachusetts Department Of Environmental Protection';
      return(
        <GenTeaser>
          <GenTeaser.Eyebrow eyebrow={eyebrow} />
          <GenTeaser.Title title={title} />
          <GenTeaser.Emphasis>
            <GenTeaser.Date date={date}/>
            <GenTeaser.Org orgs={orgs}/>
          </GenTeaser.Emphasis>
          <GenTeaser.Description description={description} />
          <GenTeaser.SubLinks>
            {subLinks.map(action => <GenTeaser.KeyAction {...action}/>)}
          </GenTeaser.SubLinks>
          <GenTeaser.MoreInfo>
            <GenTeaser.PrimaryInfo>
              {subLinks.map(action => <GenTeaser.KeyAction {...action}/>)}
            </GenTeaser.PrimaryInfo>
            <GenTeaser.SecondaryInfo>
              {subLinks.map(action => <GenTeaser.KeyAction {...action}/>)}
            </GenTeaser.SecondaryInfo>
          </GenTeaser.MoreInfo>
        </GenTeaser>
      );
    }
  );

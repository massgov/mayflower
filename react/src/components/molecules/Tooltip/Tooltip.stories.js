import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Tooltip from './index';

storiesOf('molecules', module)
  .add('Tooltip', withInfo('<div></div>')(() => {
    const props = {
      /** Text to display when open */
      openText: "Open message text is very long and stuff",
      /** Text to display when closed. */
      closeText: "closed is smaller",
      /** Tooltip Message */
      message: "Big long messages are messagey",
      /** Unique ID of tooltip */
      controlId: "uniqueid1",
      /** Position of tip ('' or above) */
      location: "",
      /** description on link for screen readers */
      info: "Description on link for screen",
      /** Path to icon */
      openIcon: "path to icon?",
      /** Title */
      title: "Title",
      /** Heading level of title. Default h2 */
      level: 2,
      /** Message of tooltip. */
      message: "Required message"
    };
    return(<Tooltip {...props} />);
  }));

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import FooterSlim from './index';

storiesOf('organisms', module)
  .addDecorator(withKnobs)
  .add('FooterSlim', withInfo('{ FooterReadme }')(() => {
    const props = {
      FooterSlimTitle: "Massachusetts Executive Office of Eductation (EDU)",
      FooterSlimDescription: "The Department of Early Education and Care'&apos;'s mission is to support the healthy growth and development of all children by providing high quality programs and resources for families",
      FooterSlimAddress: "51 Sleeper St. 4th Floor, Boston, MA 02210",
      FooterSlimPhone: "(617) 988-6600",
      FooterSlimLink: {
        href: "#",
        title: "EEC Official Website"
      }
    }
    return(<FooterSlim {...props} />);
  }));

import React, { lazy, Suspense } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import compHeadingOptions from './CompHeading.knob.options';
import CompHeadingDocs from './CompHeading.md';

storiesOf('atoms/headings', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Comp Heading', ( () => {
      const CompHeading = lazy(() => import('./index'));
      const defaultProps = {
        titleContext: '',
        level: 2,
        sub: false,
        color: '',
        id: '',
        centered: false,
        sidebar: false
      };
      const compOptionsWithKnobs = Object.assign(...Object.entries(compHeadingOptions).map(([k, v]) => (
        { [k]: v(defaultProps[k]) })));
      return(
        <Suspense fallback={<div>Loading...</div>}>
          <CompHeading {...compOptionsWithKnobs} />
        </Suspense>
      );
    }),
    { info: CompHeadingDocs }
  );

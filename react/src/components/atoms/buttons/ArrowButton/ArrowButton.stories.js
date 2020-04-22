import React, { lazy, Suspense } from 'react';

import { withKnobs, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import ArrowButtonDocs from './ArrowButton.md';
const ArrowButton = lazy(() => import('./index'));
export default {
  title: 'atoms/buttons/ArrowButton',
  component: ArrowButton,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false
    },
    info: {
      text: ArrowButtonDocs
    }
  }
};

export const Default = () => {
  const props = {
    direction: select('direction', ['left', 'right']),
    href: text('href', ''),
    info: text('info', 'Left'),
    onClick: action('Button Clicked')
  };
  return(
    <Suspense fallback={<>Loading...</>}>
      <ArrowButton {...props} />
    </Suspense>
  );
};

// defaultStory.story = {
//   name: 'ArrowButton'
// };


// storiesOf('atoms/buttons', module)
//   .addDecorator(withKnobs({ escapeHTML: false }))
//   .add(
//     'ArrowButton', (() => {
//       const props = {
//         direction: select('direction', ['left', 'right']),
//         href: text('href', ''),
//         info: text('info', 'Left'),
//         onClick: action('Button Clicked')
//       };
//       return(
//         <ArrowButton {...props} />
//       );
//     }),
//     { info: ArrowButtonDocs }
//   );

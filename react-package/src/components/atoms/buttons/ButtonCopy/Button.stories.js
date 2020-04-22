import React, { lazy, Suspense } from 'react';

import { withKnobs, text } from '@storybook/addon-knobs';

const ButtonCopy = lazy(() => import('./index'));
export default {
  title: 'atoms/buttons/ButtonCopy',
  component: ButtonCopy,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false
    }
  }
};


export const Default = () => {
  const props = {
    content: text('content', 'this is the content string that will be copied into the clipboard')
  };
  return(
    <Suspense fallback={<>Loading...</>}>
      <ButtonCopy {...props} />
    </Suspense>
  );
};

import React from 'react';
import { useStorybookApi, useChannel, addons, types, makeDecorator } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { STORY_CHANGED } from '@storybook/core-events';

const ADDON_ID = 'render-html';
const PANEL_ID = `${ADDON_ID}/panel`;

export default makeDecorator({
  name: 'withRenderedHTML',
  wrapper: (storyFn, context, { parameters }) => {
    // Do something with `parameters`, which are set via { something: ... }

    // Note you may alter the story output if you like. 
    // Although generally that's not advised.
    console.log(context);
    return storyFn(context);
  }
})
export const MyPanel = ({ api }) => {
  console.log(api);
  console.log(api.emit('test'));
  
  return <div>Foo</div>;
};

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Rendered HTML',
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <MyPanel api={api} active={active} key={key}/>
      </AddonPanel>
    ),
  });
});
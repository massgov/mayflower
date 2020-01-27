import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import './styles.css';

const Color = ({ color, value, name }) => {
  return (
    <li style={{ width: 300, margin: 20, padding: 10 }}>
      <h2 className="ma__sidebar-heading">{color}</h2>
      <div className="sg-swatch" style={{ background: value, borderRadius: 0 }} />
      <div className="sg-info">
        <span>{value}</span>
        <br />
        <code style={{ fontSize: '1rem' }}>{name}</code>
      </div>
    </li>
  );
};

storiesOf('base', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Colors', (() => {
      const props = {
        name: "$c-primary",
        color: "Bay Blue",
        value: "#14558f"
      };
      return(
        <ul className="sg-colors">
          <Color {...props} />
        </ul>
      );
    }));

import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const OrderedList = (props) => subList(props);

OrderedList.propTypes = {
  /** The text displayed. */
  sublist: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.required,
    sublist: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.required
    }))
  }))
};

OrderedList.defaultProps = {
  sublist: [{
    text: 'This is a list item in an ordered list'
  }, {
    text: 'An ordered list is a list in which the sequence of items is important.'
  }, {
    text: 'Lists can be nested inside of each other',
    sublist: [{
      text: 'This is a nested list item'
    }, {
      text: 'This is another nested list item in an ordered list'
    }]
  }, {
    text: 'This is the last list item'
  }]
};

const listItem = (props, itemIndex, olIndex) => {
  const raw = {
    __html: props.text
  };
  const key = `li.${olIndex}.${itemIndex}`;
  /* eslint-disable-next-line react/no-danger */
  return(<li key={key} dangerouslySetInnerHTML={raw} />);
};

listItem.propTypes = {
  text: PropTypes.string
};

const subList = (props) => {
  const newProps = Object.assign({}, props);
  if (!Object.prototype.hasOwnProperty.call(newProps, 'olIndex')) {
    newProps.olIndex = 0;
  }
  const olId = `ol.${newProps.olIndex}`;
  newProps.olIndex += 1;
  const list = newProps.sublist;
  return(
    <ol key={olId}>
      {list && list.map((item, itemIndex) => {
        if (item.sublist) {
          const subitem = [listItem(item, itemIndex, olId)];
          subitem.push(subList(item));
          return subitem;
        }
        return listItem(item, itemIndex, olId);
      })}
    </ol>);
};

export default OrderedList;

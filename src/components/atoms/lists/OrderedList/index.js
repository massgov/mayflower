import React from 'react';
import PropTypes from 'prop-types';
import keyIndex from 'react-key-index';

const OrderedList = (props) => {
  this.listIndex = 1;
  return subList(props);
};

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

const listItem = (props) => {
  const raw = {
    __html: props.text
  };
  return(<li key={props._textId} dangerouslySetInnerHTML={raw} />);
};

const subList = (props) => {
  const list = keyIndex(props.sublist, this.listIndex);
  this.listIndex += 1;
  const ulId = list._sublistId || null;
  return(
    <ol key={ulId}>
      {list && list.map((item) => {
        if (item.sublist) {
          const subitem = [listItem(item)];
          subitem.push(subList(item));
          return subitem;
        }
        return listItem(item);
      })}
    </ol>);
};

export default OrderedList;

import React from 'react';
import PropTypes from 'prop-types';
import keyIndex from 'react-key-index';

const UnorderedList = (props) => {
  this.listIndex = 1;
  return subList(props);
};

UnorderedList.propTypes = {
  /** The text displayed. */
  sublist: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.required,
    sublist: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.required
    }))
  }))
};

UnorderedList.defaultProps = {
  sublist: [{
    text: 'This is a list item in an unordered list'
  }, {
    text: 'An unordered list is a list in which the sequence of items is not important. Sometimes, an unordered list is a bulleted list. And this is a long list item in an unordered list that can wrap onto a new line.'
  }, {
    text: 'Lists can be nested inside of each other',
    sublist: [{
      text: 'This is a nested list item'
    }, {
      text: 'This is another nested list item in an unordered list'
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
    <ul key={ulId}>
      {list && list.map((item) => {
        if (item.sublist) {
          const subitem = [listItem(item)];
          subitem.push(subList(item));
          return subitem;
        }
        return listItem(item);
      })}
    </ul>);
};

export default UnorderedList;

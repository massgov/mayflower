import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const UnorderedList = (props) => subList(props);

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

const listItem = (props, itemIndex, ulIndex) => {
  const raw = {
    __html: props.text
  };
  const key = `li.${ulIndex}.${itemIndex}`;
  /* eslint-disable-next-line react/no-danger */
  return(<li key={key} dangerouslySetInnerHTML={raw} />);
};

listItem.propTypes = {
  text: PropTypes.string
};

const subList = (props) => {
  const newProps = Object.assign({}, props);
  if (!Object.prototype.hasOwnProperty.call(newProps, 'ulIndex')) {
    newProps.ulIndex = 0;
  }
  const ulId = `ul.${newProps.ulIndex}`;
  newProps.ulIndex += 1;
  const list = newProps.sublist;
  return(
    <ul key={ulId}>
      {list && list.map((item, itemIndex) => {
        if (item.sublist) {
          const subitem = [listItem(item, itemIndex, ulId)];
          subitem.push(subList(item));
          return subitem;
        }
        return listItem(item, itemIndex, ulId);
      })}
    </ul>);
};

export default UnorderedList;

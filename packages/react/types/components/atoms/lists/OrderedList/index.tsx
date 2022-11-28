// @ts-nocheck
/**
 * OrderedList module.
 * @module @massds/mayflower-react/OrderedList
 */
import React from 'react';

export interface OrderedListProps {
  /** The text displayed. */
  sublist?: {
    text?: unknown
    sublist?: {
      text?: unknown
    }[]
  }[]
}

const OrderedList = (props: OrderedListProps) => subList(props);

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

export interface listItemProps {
  text?: string
}

const listItem = (props: listItemProps, itemIndex, olIndex) => {
  const raw = {
    __html: props.text
  };
  const key = `li.${olIndex}.${itemIndex}`;
  /* eslint-disable-next-line react/no-danger */
  return(<li key={key} dangerouslySetInnerHTML={raw} />);
};

const subList = (props) => {
  const newProps = { ...props };
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
    </ol>
  );
};

export default OrderedList;

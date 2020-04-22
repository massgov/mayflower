import { text } from '@storybook/addon-knobs';

const list = [{
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
}];

export default {
  sublist: (value) => {
    const orderedList = (value.length) ? value : list;
    const newList = [];
    orderedList.forEach((listItem, idx) => {
      const newItem = listItem;
      newItem.text = text(`OrderedList Item${idx}: text`, listItem.text, 'OrderedList');
      if (listItem.sublist) {
        listItem.sublist.forEach((subItem, subIdx) => {
          newItem.sublist[subIdx] = subItem;
          newItem.sublist[subIdx].text = text(`OrderedList SubItem${subIdx}: text`, subItem.text, 'OrderedList');
        });
      }
      newList.push(newItem);
    });
    return newList;
  }
};

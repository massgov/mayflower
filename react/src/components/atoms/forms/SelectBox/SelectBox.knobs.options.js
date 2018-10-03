/**
 * Option definitions for the Select Box's enumerable properties (imported in stories)
 */
export default {
  options: {
    topics: [
      { text: 'Select', value: '' },
      { text: 'Topic 1', value: 'topic1' },
      { text: 'Topic 2', value: 'topic2' },
      { text: 'Topic 3', value: 'topic3' }
    ],
    pressTypes: [
      { text: 'Select', value: '' },
      { text: 'Press Release', value: 'press-release' },
      { text: 'Press Statement', value: 'press-statement' },
      { text: 'News Article', value: 'news-article' },
      { text: 'Blog Post', value: 'blog-poast' },
      { text: 'Speech', value: 'speech' }
    ],
    colors: [
      { text: 'Green', value: 'green' },
      { text: 'Blue', value: 'blue' }
    ],
    orgSelector: [
      { value: '', text: 'All Organizations' },
      { value: 'attorney-general-office', text: "Attorney General's Office" },
      { value: 'governors-office', text: "Governor's Office" }
    ],
    distance: [
      { value: 1, text: 'within 1 mile' },
      { value: 5, text: 'within 5 miles' },
      { value: 15, text: 'within 15 miles' },
      { value: 30, text: 'within 30 miles' }
    ],
    typeOfCare: [
      { text: 'All Child Care Programs', value: '' },
      { text: 'Group Child Care', value: 'group-child-care' },
      { text: 'Family Child Care', value: 'family-child-care' },
      { text: 'Center Based Programs', value: 'center-based-programs' }
    ]
  }
};

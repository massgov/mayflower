export default {
  budgetTabs: [
    {
      tab: 'Budget Summary',
      content: 'This is my first tab.'
    },
    {
      tab: 'Historical Budget',
      content: 'This is my second tab.'
    },
    {
      tab: 'Historical Spending',
      content: '',
      subTabs: [
        {
          tab: 'All Categories',
          content: 'Tabs have unique ids that are tracked locally without state.'
        },
        {
          tab: 'Wages & Salaries',
          content: 'Tabs have unique ids that are tracked locally without state.'
        },
        {
          tab: 'Employment Benefits',
          content: 'Tabs have unique ids that are tracked locally without state.'
        },
        {
          tab: 'Operating Expenses',
          content: 'Tabs have unique ids that are tracked locally without state.'
        },
        {
          tab: 'Grants & Subsidies',
          content: 'Tabs have unique ids that are tracked locally without state.'
        },
        {
          tab: 'Debt Service',
          content: 'Tabs have unique ids that are tracked locally without state.'
        }
      ]
    },
    {
      tab: 'Employment Levels',
      content: 'Tab Content'
    },
    {
      tab: 'Org Chart',
      content: 'Last Tab!'
    }
  ]
};

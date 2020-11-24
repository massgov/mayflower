const storyKindOrder = [
  'Get Started',
  ['Introduction', 'Install Mayflower', 'Examples'],
  'Design Principles',
  ['Brand Pillars'],
  'Design Tokens',
  'Branding Components',
  'Base Elements'
];

export const parameters = {
  options: {
    storySort: {
      order: storyKindOrder
    },
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  previewTabs: {
      canvas: { hidden: true }
  },
  viewMode: 'docs'
}

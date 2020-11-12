const storyKindOrder = [
  'Get Started',
  'Design Principles',
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
  canvas: { hidden: true },
  viewMode: 'docs'
}

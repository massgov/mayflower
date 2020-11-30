import mayflowerTheme from './mayflowerTheme';

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
  previewTabs: {
      canvas: { hidden: true }
  },
  viewMode: 'docs',
	docs: {
    theme: mayflowerTheme,
  }
}

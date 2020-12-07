import mayflowerTheme from './mayflowerTheme';

export const parameters = {
  options: {
    storySort: {
      order: [
				'Get Started', [
					'Introduction',
					'Examples'
				],
				'Get Started',
				'Principles', [
					'Brand Pillars',
					'Accessibility'
				],
				'Foundation', [
					'Logo',
					'Color',
					'Typography',
					'Iconography'
				],
				'Elements',
				'Components', [
					'Header',
					'Footer'
				],
			],
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

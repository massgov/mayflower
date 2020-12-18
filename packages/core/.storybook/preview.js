import mayflowerTheme from './mayflowerTheme';

export const parameters = {
	options: {
    storySort: {
      order: [
		'Overview', [
			'Introduction',
			'Get Started',
			'Examples'
		],
		'Principles', [
			'Brand Pillars',
			'Accessibility',
			'Resources'
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
			'Footer',
        'Template'
		]
	  ]
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

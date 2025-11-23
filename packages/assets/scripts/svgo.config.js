module.exports = {
  plugins: [
    // Remove unnecessary metadata
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeTitle',
    'removeDesc',
    
    // Clean up attributes
    'removeUselessDefs',
    'removeEmptyAttrs',
    'removeEmptyText',
    'removeEmptyContainers',
    
    // Optimize paths and shapes
    'convertShapeToPath',
    'mergePaths',
    'convertPathData',
    'removeDimensions', // Remove width/height to make SVGs scalable
    
    // Clean up IDs and classes
    'cleanupIds',
    'removeUselessStrokeAndFill',
    
    // Remove fills and strokes using SVGO
    {
      name: 'removeAttrs',
      params: {
        attrs: ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin']
      }
    },
    
    // Preserve viewBox for proper scaling
    {
      name: 'removeViewBox',
      active: false // Keep viewBox for proper scaling
    },
    
    // Add custom attributes
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          { 'aria-hidden': 'true' },
          { 'fill': 'currentColor' }
        ]
      }
    }
  ]
};
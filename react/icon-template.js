// Generates Icon components using SVGR.
// https://react-svgr.com/docs/custom-templates/
function defaultTemplate(
  { template },
  opts,
  { imports, interfaces, componentName, props, jsx, exports },
) {
  const plugins = ['jsx']
  if (opts.typescript) {
    plugins.push('typescript')
  }
  const typeScriptTpl = template.smart({ plugins })
  return typeScriptTpl.ast`import React from 'react';
import PropTypes from 'prop-types';
${interfaces}

const ${componentName} = (${props}) => {
  return ${jsx};
}

${componentName}.propTypes = {
  title: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  fill: PropTypes.string
};

${exports}
  `
}
module.exports = defaultTemplate
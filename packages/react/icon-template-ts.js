// Generates Icon components using SVGR.
// https://react-svgr.com/docs/custom-templates/
function defaultTemplate(
  { template },
  opts,
  { imports, interfaces, componentName, props, jsx, exports }
) {
  const plugins = ['jsx'];
  if (opts.typescript) {
    plugins.push('typescript');
  }
  const typeScriptTpl = template.smart({ plugins });
  return typeScriptTpl.ast`
import React from 'react';

${interfaces}

const ${componentName} = (${props}) => {
  return ${jsx};
}

${exports}
`;
}
module.exports = defaultTemplate;

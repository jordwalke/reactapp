var fs = require('fs');
var reactTools = require('react-tools');
require.extensions['.jsx'] = function(module) {
  module._compile(reactTools.transform(fs.readFileSync(module.filename, 'utf8')), module.filename);
};

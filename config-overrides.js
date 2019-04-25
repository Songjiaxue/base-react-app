const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
       javascriptEnabled: true,
       modifyVars: { 
          "@layout-header-background": "#fff",
          "@layout-body-background": '#fff',
          "@layout-header-padding": 0,
        },
    }),
  addDecoratorsLegacy()
);
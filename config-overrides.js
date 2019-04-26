const path = require('path');
const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy, addWebpackAlias } = require('customize-cra');
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
          "@layout-footer-background": '#f0f2f5'
        },
    }),
  addDecoratorsLegacy(),
  addWebpackAlias({
    "@assets": path.resolve(__dirname, "src/assets"),
    "@app": path.resolve(__dirname, "src/app"),
    "@components": path.resolve(__dirname, "src/components"),
    "@store": path.resolve(__dirname, "src/store"),
    "@util": path.resolve(__dirname, "src/util"),
  })
);
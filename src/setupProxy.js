const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://192.168.1.246:8888',
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': ''
      // }
      router: function (req) {
        if (req.url.indexOf('/api/test') > -1) {
          return 'http://192.168.1.192:9797';
        }
      }
    }),
  )
};

var Mock = require('mockjs')
module.exports.login = function (req, res) {
  // if (res.headers.authorization) {

  // }
  var data = Mock.mock({
    data: Mock.Random.string( 'lower', 15 ),
    status: 200,
    message: '登陆成功',
})
  res.json(data);
}
module.exports.getUser = function (req, res) {
  var data;
  console.log(res);
  if (!req.headers.authorization) {
    data = {
      status: 1001,
      message: '请先登录！',
      data: null,
    };
  } else {
    data = Mock.mock({
      data: Mock.mock({
        name: Mock.Random.name(),
        username: Mock.Random.name(),
      }),
      status: 200,
      message: '',
    })
  }
  res.json(data);
}
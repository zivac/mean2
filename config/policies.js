module.exports = {

  '*': true,

  'TestController': {
    'magic': 'testAuth'
  },

  BananaController: {
    '*': ['testAuth']
  }

}

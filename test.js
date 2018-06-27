const config = require('config')
const {post} = require('./fetchHelper')
let appKey = config.ios
let clientId = 'testA'
let experimentIds = []
// 开始获取ABTest指标
post(config.uri.getABTest, {
  'app_key': appKey,
  'client_id': clientId,
  'summary': {},
  'custom': {}
}).then(ret => {
  console.log(ret)
  if (ret.experiments) {
    ret.experiments.forEach(experiment => {
      experimentIds.push(experiment.id)
    })
  }
  // 记录UV数据
  return post(config.uri.postABTest, {
    'app_key': appKey,
    'client_id': clientId,
    'summary': {},
    'custom': {},
    'stats': [{
      'key': 'Event-GET_EXPERIMENT_FLAGS',
      'value': 1,
      'timestamp': parseInt(Date.now() / 1000),
      'experiment_ids': experimentIds
    }, {
      'key': 'checkTimes',
      'value': 1,
      'timestamp': parseInt(Date.now() / 1000),
      'experiment_ids': experimentIds
    }]
  })
}).then(ret => {
  console.log(ret)
})

// 记录指标数据

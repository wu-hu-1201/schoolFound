// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'wu-haibing-c2elw'

cloud.init()
const db = cloud.database({ env })  //连接当前这个数据库

// 云函数入口函数
exports.main = async (event, context) => {
  const inputValue = event.inputValue
  const kind = event.kind
  const checkGroupList = await db.collection('groupList').where({
    title: inputValue,
    // title: RegExp({
    //   regexp: inputValue,
    //   options: 'i',
    // }),
    kind: kind
  }).get()
  let result = []
  for(let item of checkGroupList.data) {
    result.push(item)
  }
  return result
  
}
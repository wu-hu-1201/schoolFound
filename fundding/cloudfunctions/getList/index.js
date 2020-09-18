// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'wu-haibing-c2elw'
const db = cloud.database({ env })


cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const openId = cloud.getWXContext().OPENID
  let groupList = await db.collection('lostList')
  .where({
    userInfo: openId
  })

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
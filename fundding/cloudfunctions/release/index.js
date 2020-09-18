const utils = require('../../miniprogram/common/util')

// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'wu-haibing-c2elw'

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = cloud.getWXContext().OPENID

  return {
    event,
    openid: openid,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
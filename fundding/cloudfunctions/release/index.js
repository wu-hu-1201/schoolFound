// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'wu-haibing-c2elw'


cloud.init()
const db = cloud.database({ env })


// 云函数入口函数
exports.main = async (event, context) => {
  const openId = cloud.getWXContext().OPENID
  let groupList = await db.collection('users')
  .where({
    OPENID: openId
  })
  .get()
  let name = groupList.data[0].name
  let avatar = groupList.data[0].avatar
  
  await db.collection('groupList').add({
    data: {
      name,
      avatar,
      OPENID: event.userInfo.openId,
      images: event.images,
      intro: event.intro,
      kind: event.kind,
      title: event.title,
      date: event.date,
      tag: event.tag
    }
  })
  
}
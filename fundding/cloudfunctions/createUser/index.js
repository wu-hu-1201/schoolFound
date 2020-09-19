// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'wu-haibing-c2elw'


cloud.init()
const db = cloud.database({ env })


// 云函数入口函数
exports.main = async (event, context) => {
  const userInfo = event.userInfo
  const checkUser = await db.collection('users').where({
    OPENID: userInfo.openId
  }).get()

  if (checkUser.data.length > 0) {
    await db.collection('users').doc(checkUser.data[0]._id)
    .update({
      data: {
        avatar : event.avatar,
        name: event.name,
      }
    })
  } else {
    const inserResult = await db.collection('users').add({
      data:{
        avatar : event.avatar,
        name: event.name,
        OPENID: userInfo.openId
      }
    })
  }
}
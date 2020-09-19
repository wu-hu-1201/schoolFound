// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'wu-haibing-c2elw'


cloud.init()
const db = cloud.database({ env })


// 云函数入口函数
exports.main = async (event, context) => {
  const _id = event._id
  let list = await db.collection('groupList').doc(_id)
  .get()
  
  return list
  // for (let item of list.data) {
  //   if(item.tag != tag ){Result1.push(item)}
      
    
  // }
  // return Result1
 
  
}
// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'wu-haibing-c2elw'


cloud.init()
const db = cloud.database({ env })


// 云函数入口函数
exports.main = async (event, context) => {
  const kind = event.kind
  const tag = event.tag
  let list = await db.collection('groupList')
  .where({
    kind: kind
  })
  .get()
  
  let Result0 = []
  let Result1 = []
  let Result2 = []
  let Result3 = []
  let Result4 = []

  for (let item of list.data) {
    if(tag != item.tag) {
      Result0.unshift(item)
    } else {
      if(tag =='证件' ){Result1.unshift(item)}
      if(tag =='书籍' ){Result2.unshift(item)}
      if(tag =='伞' ){Result3.unshift(item)}
      if(tag =='其他' ){Result4.unshift(item)}
    }
  }
  if (tag =='全部') {
    return Result0
  }
  if (tag == '证件') {
    return Result1
  }
  if (tag == '书籍') {
    return Result2
  }
  if (tag == '伞') {
    return Result3
  }
  if (tag == '其他') {
    return Result4
  }
  
  
  
}
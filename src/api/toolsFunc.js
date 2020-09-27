export const validatFunc = (dataObj, type) => {
  const length = dataObj[type].length
  const errMSgArr =['标题', '内容', '地点', '时间']
  const errMsgType =['error', 'ok']

  switch (type) {
    case 'title':
      if (!dataObj.title) {
        dataObj.errMsg = '请输入标题'
        dataObj.errMsgType = 'error'
      } else if (length < 2) {
        dataObj.errMsg = '请输入的标题字符数大于2'
        dataObj.errMsgType = 'error'
      } else {
        dataObj.errMsg = '添加标题正确'
        dataObj.errMsgType = 'ok'
      }
      break
    case 'content':
      if (!dataObj.content) {
        dataObj.errMsg = '请输入内容'
        dataObj.errMsgType = 'error'
      } else {
        dataObj.errMsg = '标题添加成功'
        dataObj.errMsgType = 'ok'
      }
      break
    case 'pos':
      if (!dataObj.pos) {
        dataObj.errMsg = '请输入地点'
        dataObj.errMsgType = 'error'
      } else {
        dataObj.errMsg = '地点添加成功'
        dataObj.errMsgType = 'ok'
      }
      break
    case 'time':
      if (!dataObj.time) {
        dataObj.errMsg = '请输入地点'
        dataObj.errMsgType = 'error'
      } else {
        dataObj.errMsg = '地点添加成功'
        dataObj.errMsgType = 'ok'
      }
      break
    default:
      break
  }
}

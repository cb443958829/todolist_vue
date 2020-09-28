import Vue from 'vue'
import Vuex from 'vuex'
import { data } from '../assets/data'
Vue.use(Vuex)

const vuex = new Vuex.Store({
  state: {
    data: [],
    dataObj: {
      title: '',
      content: '',
      time: '',
      pos: '',
      isDone: false
    },
    // 修改页面的数据对象
    dataObj2: {
      title: '',
      content: '',
      time: '',
      pos: '',
      isDone: false
    },
    errMsg: '',
    errMsgType: '',
    // 修改页面错信息对象
    errMsgModify: '',
    errMsgModifyType: '',
    // 控制验正区的开关变量
    areaType: '',
    // 控制不同组件验正区的开关变量
    switchAreaType: 'Header',
    unDoneCount: 0,
    // 信息弹出框数据
    dataView: [],
    confirmAddDataFlag: {
      title: false,
      time: false,
      pos: false,
      content: false
    }
  },
  mutations: {
    // 初始化数据
    initData(state) {
      // console.log(data)
      state.data = data
      state.dataView = state.data
    },
    // 初始化对话框对象数据
    initModalData(state, initModalData) {
      const { dataObj2 } = state
      console.log(initModalData[0])
      Object.keys(initModalData[0]).forEach(key => {
        if (key !== 'id') {
          dataObj2[key] = initModalData[0][key]
        }
      })
      Object.keys(state.confirmAddDataFlag).forEach(item => {
        state.confirmAddDataFlag[item] = true
      })
    },
    // 绑定输入框内容
    inputContent(state, data) {
      state.switchAreaType = 'Header'
      const { type, value } = data
      state.dataObj[type] = value
    },
    validate(state, pramas) {
      const { type, switchAreaType } = pramas
      state.switchAreaType = switchAreaType
      state.areaType = type
      // 添加页面验正
      if (switchAreaType === 'Header') {
        const { dataObj } = state
        if (type !== 'add') {
          const length = dataObj[type].length
          switch (type) {
            case 'title':
              state.confirmAddDataFlag.title = false
              if (!dataObj.title) {
                state.errMsg = '请输入标题'
                state.errMsgType = 'error'
              } else if (length < 2) {
                state.errMsg = '请输入的标题字符数大于2'
                state.errMsgType = 'error'
              } else {
                state.errMsg = '添加标题正确'
                state.errMsgType = 'ok'
                state.confirmAddDataFlag.title = true
              }
              break
            case 'content':
              state.confirmAddDataFlag.content = false
              if (!dataObj.content) {
                state.errMsg = '请输入内容'
                state.errMsgType = 'error'
              } else {
                state.errMsg = '内容添加成功'
                state.errMsgType = 'ok'
                state.confirmAddDataFlag.content = true
              }
              break
            case 'pos':
              state.confirmAddDataFlag.pos = false
              if (!dataObj.pos) {
                state.errMsg = '请输入时间'
                state.errMsgType = 'error'
              } else {
                state.errMsg = '时间添加成功'
                state.errMsgType = 'ok'
                state.confirmAddDataFlag.pos = true
              }
              break
            case 'time':
              state.confirmAddDataFlag.time = false
              if (!dataObj.time) {
                state.errMsg = '请输入地点'
                state.errMsgType = 'error'
              } else {
                state.errMsg = '地点添加成功'
                state.errMsgType = 'ok'
                state.confirmAddDataFlag.time = true
              }
              break
            default:
              break
          }
        } else if (type === 'add') {
          var newDataObj = {}
          Object.keys(dataObj).forEach(item => {
            if (item !== 'isDone') {
              if (dataObj[item]) {
                newDataObj[item] = dataObj[item]
              }
            }
          })
          const { confirmAddDataFlag } = state
          const res = Object.values(confirmAddDataFlag).every(item => item)
          // console.log(Object.keys(newDataObj))
          // Object.keys(newDataObj)
          if (!res) {
            state.errMsg = '请完善信息'
            state.errMsgType = 'error'
          } else {
            state.errMsg = '事情添加成功'
            state.errMsgType = 'ok'
          }
        }
      } else if (switchAreaType === 'DothigsList') {
        // 修改页面弹出框验证
        const { dataObj2 } = state
        console.log(dataObj2.title, 11111)
        switch (type) {
          case 'title':
            state.confirmAddDataFlag.title = false
            if (!dataObj2.title) {
              state.errMsgModify = '请输入标题'
              state.errMsgModifyType = 'error'
            } else if (dataObj2.title.length < 2) {
              state.errMsgModify = '请输入的标题字符数大于2'
              state.errMsgModifyType = 'error'
            } else {
              state.errMsgModifyType = 'ok'
              state.errMsgModify = '修改标题成功'
              state.confirmAddDataFlag.title = true
            }
            break
          case 'content':
            state.confirmAddDataFlag.content = false
            if (!dataObj2.content) {
              state.errMsgModify = '请输入内容'
              state.errMsgModifyType = 'error'
            } else {
              state.errMsgModifyType = 'ok'
              state.errMsgModify = '修改内容成功'
              state.confirmAddDataFlag.content = true
            }
            break
          case 'time':
            state.confirmAddDataFlag.time = false
            if (!dataObj2.time) {
              state.errMsgModify = '请输入时间'
              state.errMsgModifyType = 'error'
            } else {
              state.errMsgModifyType = 'ok'
              state.errMsgModify = '修改时间成功'
              state.confirmAddDataFlag.time = true
            }
            break
          case 'pos':
            state.confirmAddDataFlag.pos = false
            if (!dataObj2.pos) {
              state.errMsgModify = '请输入地点'
              state.errMsgModifyType = 'error'
            } else {
              state.errMsgModifyType = 'ok'
              state.errMsgModify = '修改地点成功'
              state.confirmAddDataFlag.pos = true
            }
            break
          case 'confirm':
            var { confirmAddDataFlag } = state
            console.log(confirmAddDataFlag)
            var res = Object.values(confirmAddDataFlag).every(item => item)
            if (!res) {
              state.errMsgModify = '请完善信息'
              state.errMsgModifyType = 'error'
            } else {
              state.errMsgModifyType = 1
              state.errMsgModify = ''
            }
            break
        }
      }
    },
    // 添加要做事情
    addDoThings(state, type) {
      const { confirmAddDataFlag } = state
      const res = Object.values(confirmAddDataFlag).every(item => item)
      if (res) {
        const { dataObj } = state
        const addThingsObj = {}
        Object.keys(dataObj).forEach(key => {
          addThingsObj[key] = dataObj[key]
        })
        Object.assign(addThingsObj, { id: state.data.length })
        state.data = state.data.concat(addThingsObj)
        state.dataView = state.data
        Object.keys(dataObj).forEach(item => {
          dataObj[item] = ''
        })
        const { confirmAddDataFlag } = state
        Object.keys(confirmAddDataFlag).forEach(
          item => (confirmAddDataFlag[item] = false)
        )
        state.errMsgType = ''
        state.errMsgType = ''
      }
    },
    // 修改事情完成状态
    toggelCheckbox(state, id) {
      const { data } = state
      // console.log(data)
      data.forEach(item => {
        if (item.id === id) {
          item.isDone = !item.isDone
        }
      })
    },
    // 修改事情内容
    modifyThings(state, targetDate) {
      const { value, type, id } = targetDate
      state.switchAreaType = 'DothigsList'
      const { dataObj2, dataView } = state
      dataObj2[type] = value
      dataView.forEach(item => {
        if (item.id === id) {
          item[type] = value
        }
      })
      // console.log(dataView[0].title)
    },
    // 提交修改的内容
    confirmModifyData(state) {
      // console.log(state.dataObj2)
      const res = Object.values(state.confirmAddDataFlag).every(item => item)
      if (res) {
        const { dataObj2, data } = state
        const modifyThingsObj = dataObj2
        Object.assign(modifyThingsObj, { id: data.length })
        state.data = state.data.concat(modifyThingsObj)
        state.dataView = state.data
        state.errMsgModifyType = ''
        state.errMsgModifyType = ''
      }
    },
    // 删除事情
    delThings(state, id) {
      var { data } = state
      const index = data.findIndex(item => item.id === id)
      data.splice(index, 1)
    },
    // 统计未处理事情的数量
    totalCount(state) {
      state.unDoneCount = state.data.reduce((count, key) => {
        if (!key.isDone) {
          count++
        }
        return count
      }, 0)
    },
    handleView(state, type) {
      var { data } = state
      switch (type) {
        case 'all':
          state.dataView = data
          break
        case 'done':
          state.dataView = data.filter(itme => itme.isDone)
          break
        case 'unDone':
          state.dataView = data.filter(itme => !itme.isDone)
          break
        case 'del':
          state.dataView = data.filter(itme => !itme.isDone)
          break
        default:
          break
      }
    }
  },
  actions: {},
  modules: {}
})
// export const modifyData = () => {
//   setTimeout(() => {
//     var data = vuex.state.data
//     let dataStore = {}
//     Object.keys(data).formEach(key = {
//       if(key === 'id' || key === 'content' || key === 'time' || key === 'pos') {
//         dataStore[key] = dataStore[key]
//       }
//     })
//   }, 0)
// }
export default vuex

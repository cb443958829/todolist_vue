import Vue from 'vue'
import Vuex from 'vuex'
import { data } from '../assets/data'
// import { validatFunc }from '../api/toolsFunc.js'
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
    errMsg: '',
    errMsgType: '',
    // 控制验正区的开关变量
    areaType: '',
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
    // 绑定输入框内容
    inputContent(state, data) {
      const { type, value } = data
      state.dataObj[type] = value
    },
    validate(state, type) {
      const { dataObj } = state
      state.areaType = type
      if (type !== 'add') {
        const length = dataObj[type].length
        switch (type) {
          case 'title':
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
        // console.log(Object.keys(newDataObj))
        if (Object.keys(newDataObj).length < 4) {
          state.errMsg = '请完善信息'
          state.errMsgType = 'error'
        } else {
          state.errMsg = '事情添加成功'
          state.errMsgType = 'ok'
        }
      }
      // validatFunc(dataObj, type)
    },
    // 添加要做事情
    addDoThings(state, type) {
      const { confirmAddDataFlag } = state
      const res = Object.values(confirmAddDataFlag).every(item => item)
      if (res) {
        const { dataObj } = state
        const addThingsObj = {}
        if (dataObj.keys === null) {
          return '请输入内容'
        } else {
          Object.keys(dataObj).forEach(key => {
            addThingsObj[key] = dataObj[key]
          })
          Object.assign(addThingsObj, { id: state.data.length })
        }
        state.data = state.data.concat(addThingsObj)
        state.dataView = state.data
        Object.keys(dataObj).forEach(item => {
          console.log(11111)
          dataObj[item] = ''
        })
        const { confirmAddDataFlag } = state
        Object.keys(confirmAddDataFlag).forEach(
          item => (confirmAddDataFlag[item] = false)
        )
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
    modifyThings(state, content) {
      const { value, type } = content
      const { dataObj } = state
      dataObj[type] = value
      console.log(dataObj[type])
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

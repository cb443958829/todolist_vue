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
    unDoneCount: 0
  },
  mutations: {
    // 初始化数据
    initData(state) {
      // console.log(data)
      state.data = data
    },
    // 绑定输入框内容
    inputContent(state, data) {
      const { type, value } = data
      state.dataObj[type] = value
    },
    // 添加要做事情
    addDoThings(state) {
      // console.log(state.dataObj)
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

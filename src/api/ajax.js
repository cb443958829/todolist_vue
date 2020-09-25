import axios from 'axios'

// 请求待办事宜数据,
export const reqData = (url, params = {}, method = 'get') => {
  if (method === 'get') {
    let str = ''
    if (Object.keys(params) === null) {
      const { data } = axios.get(url)
      return data
    } else {
      Object.keys(params).forEach(key => {
        str = url + '?' + key + '=' + params[key] + '&'
      })
      str.substring(0, str.length - 1)
      const { data } = axios.get(str)
      return data
    }
  } else if (method === 'post') {
    const { data } = axios.get(url, params, 'post')
    return data
  }
}

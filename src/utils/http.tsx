import axios from 'axios'

const httpInstance = axios.create({
  baseURL: 'https://geek.itheima.net/v1_0',
  timeout: 5000
})

httpInstance.interceptors.request.use(config => {
  // 拦截请求成功的回调函数
  // 1.发送网络请求时, 在界面的中间位置显示Loading组件
  // 2.在界面中展示请求进度(进度条)
  // 3.请求超时提示
  return config
}, err => {
  // 拦截请求失败的回调函数
  return Promise.reject(err)
})

httpInstance.interceptors.response.use(res => {
    return res

}, err => {
    return Promise.reject(err)
})

export {httpInstance}
import axios from 'axios'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = window.localStorage.getItem('token')
  // 如果有登录用户信息，则统一设置 token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default request

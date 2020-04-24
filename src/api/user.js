import request from '@/utils/request'
export const loginuser = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}
export const getUser = () => {
  return request({
    method: 'get',
    url: '/mp/v1_0/user/profile'
  })
}
export const getArticle = (params) => {
  return request({
    method: 'get',
    url: '/mp/v1_0/articles',
    params
  })
}
export const getChannel = () => {
  return request({
    method: 'get',
    url: '/mp/v1_0/channels'
  })
}

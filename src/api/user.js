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
export const delArticle = (id) => {
  return request({
    method: 'delete',
    url: `/mp/v1_0/articles/${id}`
  })
}
export const pubArtile = (data, draft) => {
  return request({
    method: 'post',
    url: '/mp/v1_0/articles',
    params: {
      draft // 是否存为草稿（true 为草稿）
    },
    data
  })
}
export const appointArtile = (id) => {
  return request({
    method: 'get',
    url: `/mp/v1_0/articles/${id}`
  })
}
export const updateArtile = (id, data, draft) => {
  return request({
    method: 'put',
    url: `/mp/v1_0/articles/${id}`,
    params: {
      draft // 是否存为草稿（true 为草稿）
    },
    data
  })
}
export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}
export const getImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}

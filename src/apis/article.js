// 引入
import axios from '@/utils/myaxios.js'

export const getartList = (params) => {
  return axios({
    url: 'post',
    params
  })
}

export const getartById = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

export const likeart = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}

export const starArticle = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}

export const getCommentlist = (id, params) => {
  return axios({
    url: `/post_comment/${id}`,
    params
  })
}

export const replyComment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}

export const searchArt = (params) => {
  return axios({
    url: '/post_search',
    params
  })
}

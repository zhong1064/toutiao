// 引入配置基准路径的axios
import axios from '@/utils/myaxios.js'

export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
export const getUserById = (id) => {
  return axios({
    url: `/user/${id}`
  })
}
export const updateUserById = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}
export const register = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}
export const follows = (id) => {
  return axios({
    url: `user_follows/${id}`
  })
}

export const unfollows = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}

export const getUserFollows = () => {
  return axios({
    url: '/user_follows'
  })
}

export const getUserstar = () => {
  return axios({
    url: '/user_star'
  })
}

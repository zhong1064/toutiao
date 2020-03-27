// 1.获取所有栏目数据
// 引入
import axios from '@/utils/myaxios.js'

export const getCateList = () => {
  return axios({
    url: '/category'
  })
}

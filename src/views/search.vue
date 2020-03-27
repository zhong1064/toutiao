<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search v-model="userkey" placeholder="请输入搜索关键词" shape="round"></van-search>
      <div @click="onSearch(userkey)">搜索</div>
    </div>
    <div class="historylist">
      <h2>历史记录</h2>
      <a href="javascript:;" v-for="(item,index) in hislist" :key="index" @click="onSearch(item)">{{item}}</a>
    </div>
    <div class="historylist">
      <h2>搜索结果</h2>
      <router-link :to="{path: `/artdetail/${item.id}`}" v-for="item in searchlist" :key="item.id" >{{item.title}}</router-link>
    </div>
  </div>
</template>

<script>
import { searchArt } from '@/apis/article.js'
export default {
  data () {
    return {
      userkey: '',
      searchlist: [],
      hislist: []

    }
  },
  mounted() {
    this.hislist = this.getdate()
    console.log(this.hislist);
  },
  methods: {
    async  onSearch(key) {
      this.searchlist.length = 0
      let res = await searchArt({ keyword: key })
      if (res.data.data.length > 0) {
        this.searchlist = res.data.data
      }
      let arr = this.getdate()
      let index = arr.indexOf(key) !== -1
      if (index) {
        arr.splice(index, 1)
      }
      localStorage.setItem('toutiao_serach_41', JSON.stringify(arr))
    },
    getdate() {
      return JSON.parse(localStorage.getItem('toutiao_serach_41') || '[]')
    }
  }
}
</script>

<style lang="less" scoped>
 .header{
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    .van-search{
      flex: 1;
      padding: 5px 12px;
    }
  }
  .historylist{
    padding:10px;
    border-bottom: 1px solid #ccc;
    h2{
      line-height: 40px;
      font-weight: bold;
    }
    > a {
      display: block;
      text-decoration: underline;
      line-height: 30px;
      color:#666;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
</style>

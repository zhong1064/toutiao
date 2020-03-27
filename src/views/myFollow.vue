<template>
  <div class="focus">
      <myheader title='我的关注'>
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </myheader>
      <div class="list" v-for="(follow,index) in followList" :key="follow.id">
          <div class="box">
              <img src="http://127.0.0.1:3000/uploads/image/default.png" alt="">
              <div class="center">
                  <p>{{follow.nickname}}</p>
                  <span>2019-9-9</span>
              </div>
              <span @click="del(follow.id,index)">取消关注</span>
          </div>
      </div>
  </div>
</template>

<script>
import myheader from '@/components/hmhead.vue'
import { getUserFollows, unfollows } from '@/apis/user.js'
export default {
  data () {
    return {
      followList: []
    }
  },
  components: {
    myheader
  },
  async  mounted () {
    let res = await getUserFollows()
    this.followList = res.data.data.map(value => {
      value.head_img = 'http:127.0.0.1:3000/uploads/image/default.png'
      return value
    })
  },
  methods: {
    async del(id, index) {
      let res = await unfollows(id)
      if (res.data.message === '取消关注成功') {
        this.$toast.success(res.data.message)
        this.followList.splice(index, 1)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.list{
    .box{
        display: flex;
        padding: 25px 10px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        > img{
            display: block;
            width: 50/360*100vw;
            height: 50/360*100vw;
            border-radius: 50%;
            padding: 0 10px;
        }
        > .center{
            flex: 1;
            > p {
                line-height: 30px;
                font-size: 14px;
            }
            > span {
                font-size: 12px;
                color:#999;
            }
        }
        > span {
            height: 30px;
            background-color: #eee;
            font-size: 13px;
            border-radius: 30px;
            line-height: 30px;
            padding: 0px 15px;
        }
    }
}
</style>

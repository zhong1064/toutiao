<template>
  <div class="personal">
    <router-link :to="{path:`/editpersonal/${currentUser.id}`}">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="currentUser.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{currentUser.nickname}}
          </div>
          <div class="time">{{currentUser.create_date}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <hmcell title="我的关注" desc="关注的用户" @click="$router.push({name: 'myFollow'})"></hmcell>
    <hmcell title="我的跟帖" desc="跟帖/回复" @click="$router.push({path: `/comment/${currentUser.id}`}) "></hmcell>
    <hmcell title="我的收藏" desc="关注/视频" @click="$router.push({name: 'Stararticle'})"></hmcell>
    <hmcell title="设置" ></hmcell>
    <hmbutton class="btn" @click="exit">退出</hmbutton>
  </div>

</template>

<script>
import hmbutton from '@/components/hmbutton.vue'
import hmcell from '@/components/hmcell.vue'
import { getUserById } from '@/apis/user.js'
export default {
  data() {
    return {
      currentUser: {}
    }
  },
  async mounted() {
    let id = this.$route.params.id
    let res = await getUserById(id)
    if (res.data.message === '获取成功') {
      this.currentUser = res.data.data
      this.currentUser.head_img = 'http://127.0.0.1:3000' + this.currentUser.head_img
    }
  },
  components: {
    hmcell, hmbutton
  },
  methods: {
    exit() {
      localStorage.removeItem('toutiao_41_token')
      this.$router.push({ name: 'Index' })
    }
  }
}
</script>

<style lang='less' scoped>
.personal{
    width: 100vw;
    height: 100vh;
    background-color: #eee;
}
a{
    color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
.btn {
  margin: 10px auto;
  background-color: red;
}
</style>

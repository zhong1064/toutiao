<template>
  <div class="login">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <hminput placeholder="请输入用户名/手机号"
        :rules='/^(\d{5,6})$|^(1\d{10})$/' msg='用户名或者手机号输入不正确'
       v-model="user.username" ></hminput>
       <hminput placeholder="请输入密码"
       :rules='/^\S{3,16}$/' msg="请输入3-16位的密码"
       v-model='user.password'></hminput>
       <hminput placeholder="请输入昵称"
       :rules="/^\w+$/" msg="请输入昵称"
       v-model="user.nickname"></hminput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" >去登录</a>
      </p>
     <hmbutton @click="regis">注册</hmbutton>
    </div>
  </div>
</template>

<script>
import hminput from '@/components/hminput'
import hmbutton from '@/components/hmbutton.vue'
import { register } from '@/apis/user.js'

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  components: {
    hmbutton, hminput
  },
  methods: {
    async regis() {
      let res = await register(this.user)
      if (res.data.message === '注册成功') {
        this.$toast.success('注册成功')
        this.$router.push({ name: 'Login' })
      } else {
        this.$toast.fail('注册失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>

.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}

</style>

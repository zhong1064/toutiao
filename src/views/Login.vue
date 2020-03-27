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
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" >去注册</a>
      </p>
     <hmbutton @click="login1">登录</hmbutton>
    </div>
  </div>
</template>

<script>
import hminput from '@/components/hminput'
import hmbutton from '@/components/hmbutton.vue'
import { login } from '@/apis/user.js'

export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    hmbutton, hminput
  },
  methods: {

    handleinput(data) {
      this.user = data
      // console.log(data)
    },
    // async标记当前方法中有异步操作
    async   login1() {
      // 实现验证
      let name = /^(\d{5,6})$||^(1\d{10})$/
      let psd = /^\S{3,16}$/
      if (name.test(this.user.username) && psd.test(this.user.password)) {
        // await可以获取当前操作的返回结果
        // await可以让后续的操作继续等待

        let res = await login(this.user)
        if (res.data.message === '用户不存在') {
          this.$toast.fail(res.data.message)
        } else {
          // 实现页面跳转
          // 将当前接收到的token实现本地存储
          localStorage.setItem('toutiao_41_token', res.data.data.token)
          // w为了后期操作，将当前用户的数据存储到本地
          localStorage.setItem('toutiao_41_user', JSON.stringify(res.data.data.user))

          this.$router.push({ path: `/personal/${res.data.data.user.id}` })
        }
      } else {
        this.$toast.fail('用户输入数据不合法')
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

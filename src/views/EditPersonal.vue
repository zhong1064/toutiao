<template>
  <div class="edit">
    <hmhead title="个人用户信息编辑">
      <!-- <van-icon name="arrow-left" slot="left" @click="$router.back() " /> -->
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
      <!-- <div slot="right">搜索</div> -->
    </hmhead>
    <div class="userimg">
      <img :src="currentUser.head_img" alt />
      <van-uploader :after-read="afterRead" />
    </div>
    <hmcell title="昵称" :desc="currentUser.nickname" @click="nickshow = !nickshow"></hmcell>

    <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm="updateNikename">
      <van-field ref="nick" :value="currentUser.nickname" placeholder="请输入昵称" required label="昵称" />
    </van-dialog>
    <hmcell title="密码" :desc="currentUser.password" type="password" @click="passwordshow =!passwordshow"></hmcell>
    <van-dialog v-model="passwordshow" title="修改密码" show-cancel-button @confirm="updatepassword" :before-close="beforeClose">
      <van-field ref="originpassword" placeholder="请输入原密码" required label="原密码" />
      <van-field  ref="newpassword" placeholder="请输入新密码" required label="新密码" />
    </van-dialog>
    <hmcell title="性别" :desc="currentUser.gender === 0? '女':'男'" @click="gendershow = !gendershow"></hmcell>
    <van-dialog v-model="gendershow" title="修改性别" show-cancel-button>
        <van-picker :columns="['女','男']" :default-index="currentUser.id" @change="onChange" />
    </van-dialog>
  </div>
</template>

<script>
import hmhead from '@/components/hmhead.vue';
import hmcell from '@/components/hmcell.vue';
import { uploadFile } from '@/apis/upload.js';
import { getUserById, updateUserById } from '@/apis/user.js';

export default {
  data() {
    return {
      currentUser: {},
      nickshow: false,
      passwordshow: false,
      gendershow: false
    };
  },
  async mounted() {
    let res = await getUserById(this.$route.params.id);
    if (res.data.message === '获取成功') {
      this.currentUser = res.data.data;
      if (this.currentUser.head_img) {
        this.currentUser.head_img =
          'http://127.0.0.1:3000' + this.currentUser.head_img;
      } else {
        this.currentUser.head_img =
          'uploads/image/defaulf.png' + this.currentUser.head_img;
      }
    }
  },
  methods: {
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let formdate = new FormData();
      formdate.append('file', file.file);
      let res = await uploadFile(formdate);
      if (res.data.message === '文件上传成功') {
        // 实现渲染
        this.currentUser.head_img = 'http://127.0.0.1:3000' + res.data.data.url;

        // 再次发起请求修改服务器数据
        let res1 = await updateUserById(this.currentUser.id, {
          head_img: res.data.data.url
        });
        if (res1.data.message === '修改成功') {
          this.$toast.success('头像修改成功');
        } else {
          this.$toast.fail('头像上传失败');
        }
      } else {
        this.$toast.fail('文件上传失败');
      }
    },
    async updateNikename() {
      // 获取用户输入内容
      let name = this.$refs.nick.$refs.input.value;
      // 更新
      let res = await updateUserById(this.currentUser.id, { nickname: name });
      if (res.data.message === '修改成功') {
        // 为了实现页面刷新效果 将页面中昵称的绑定数据进行更新
        this.currentUser.nickname = name;
        this.$toast.success('修改成功');
      } else {
        this.$toast.fail('修改失败');
      }
    },
    async  updatepassword() {
      let originpass = this.$refs.originpassword.$refs.input.value
      if (originpass === this.currentUser.password) {
        // 获取新密码
        let newpass = this.$refs.newpassword.$refs.input.value
        if (/^\S{3,16}$/.test(newpass)) {
          let res = await updateUserById(this.currentUser.id, { password: newpass })
          if (res.data.message === '修改成功') {
            this.currentUser.password = newpass
            this.$toast.success('修改成功')
          } else {
            this.$toast.fail('修改失败')
          }
        }
      }
    },
    // 为了用户体验 dialog关闭前的回调函数
    beforeClose(action, done) {
      // 如果用户点击的是确认，需要判断原密码输入是否正确
      if (action === 'confirm') {
        // 获取用户输入的原密码
        let originpass = this.$refs.originpassword.$refs.input.value
        // 验证密码是否和原密码一致
        if (originpass !== this.currentUser.password) {
          this.$toast.fail('原密码输入不正确')
          // 阻止dialog关闭
          this.$refs.originpassword.$refs.input.focus()
          done(false)
        } else if (!/^\S{3,16}$/.test(this.$refs.newpassword.$refs.input.value)) {
          // 当输入的新密码不符合规范时，提示
          this.$toast.fail('请输入3-16位的新密码')
          done(false)
        } else {
          // 当原密码正确，新密码符合验证 关闭弹框
          done()
        }
      } else {
        // 当用户点击的不是确认按钮时，dialog弹框消失
        done()
      }
    },
    onChange(picker, value, index) {
      console.log(this.currentUser.gender)
      // this.$toast(`当前值：${value}, 当前索引：${index}`);
      this.gender = index
    }
  },
  components: {
    hmhead,
    hmcell
  }
};
</script>

<style lang="less" scoped>
.userimg {
  position: relative;
  height: 200px;
  > img {
    width: 90/360 * 100vh;
    height: 90/360 * 100vh;
    display: block;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: red;
  }
  /deep/.van-uploader__upload {
    width: 90/360 * 100vh;
    height: 90/360 * 100vh;
  }
  /deep/.van-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>

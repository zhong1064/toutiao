<template>
  <div class="commentFoot">
    <div class="addcomment" v-show='!isFocus'>
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <span class="comment">
        <i class="iconfont iconpinglun-"></i>
        <em>{{post.comment_length}}</em>
      </span>
      <i class="iconfont iconshoucang" :class="{active:post.has_star}" @click="startThisart"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show='isFocus'>
        <textarea  ref='commtext' rows="5"></textarea>
         <!-- @blur='isFocus = false' -->
        <div>
            <span @click="sendcomment">发送</span>
            <span @click="reset">取消</span>
        </div>
    </div>
  </div>
</template>

<script>
import { starArticle, replyComment } from '@/apis/article.js'
export default {
  props: ['post', 'obj'],
  data () {
    return {
      isFocus: false
    }
  },
  watch: {
    obj() {
      if (this.obj) {
        this.isFocus = true;
      }
    }
  },
  methods: {
    async  sendcomment() {
      let data = {
        content: this.$refs.commtext.value
      }
      if (this.obj) {
        data.parent_id = this.obj.id
      }
      let res = await replyComment(this.post.id, data)
      // console.log(res);
      if (res.data.message === '评论发布成功') {
        this.isFocus = false
        this.$refs.commtext.value = ''
        // 让评论列表刷新
        this.$emit('refresh')
      }
    },
    // 点击取消时
    reset() {
      this.isFocus = false
      this.$emit('reset')
    },
    //   获取焦点时触发
    handlerFocus () {
      this.isFocus = !this.isFocus
      this.$refs.commtext.focus()
    },
    async startThisart() {
      let res = await starArticle(this.post.id)
      this.$toast.success(res.data.message)
      this.post.has_star = !this.post.has_star
    }
  }

}
</script>

<style lang='less' scoped>

.commentFoot{
    width: 100vw;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
}
.inputcomment{
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    background-color: #fff;
    align-items: flex-end;
    textarea{
        flex: 3;
        background-color: #eee;
        border:none;
        border-radius: 10px;
        padding: 10px;
    }
    div{
        padding: 20px;
    }
    span {
        display: block;
        flex: 1;
        height: 24px;
        line-height: 24px;
        padding: 0 10px;
        background-color: #f00;
        color:#fff;
        text-align: center;
        border-radius: 6px;
        font-size: 13px;
    }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
.active {
    color:red;
}
</style>

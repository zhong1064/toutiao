<template>
  <div class="commentItem">
      <commentItem v-if="comment.parent" :comment="comment.parent"
       @reply="sendcomment"
      ></commentItem>
      <div class="top">
          <div class="left">
              <span>{{comment.user.nickname}}</span> &nbsp; &nbsp; &nbsp;
              <span>2分钟</span>
          </div>
          <span @click="sendcomment(comment)">回复</span>
      </div>
      <div class="bottom">{{comment.content}}</div>
  </div>
</template>

<script>
export default {
  name: 'commentItem',
  props: ['comment'],
  methods: {
    sendcomment(comment) {
    //   console.log(comment);
      this.$emit('reply', comment)
    }
  }

}
</script>

<style lang="less" scoped>
.commentItem {
    border:1px solid #ccc;
    padding: 5px;

    // margin-top: 5px;
    .top {
        font-size: 12px;
        color:#aaa;
        display: flex;
        justify-content: space-between;
    }
    .bottom {
        font-size: 14px;
        line-height: 40px;
    }
}

</style>

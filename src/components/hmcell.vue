<template>
  <div class="cell" @click="handleclick">
      <div class="left">{{title}}</div>
      <div class="right">{{type==='password'?'*******': desc}}<span class="iconfont iconjiantou1"></span></div>
  </div>
</template>

<script>
export default {
  props: ['title', 'desc', 'type'],
  methods: {
    handleclick(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
  .cell {
      padding: 20px 10px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      .right{
          font-size: 14px;
          color:#888
      }
  }
</style>

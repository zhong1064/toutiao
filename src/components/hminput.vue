<template>
  <input type="text" class="hminput" :class="{'success':statu,'error':!statu}" @input="handleInput" @blur='handleBlur'>
</template>

<script>
export default {
  props: ['rules', 'msg'],
  data() {
    return {
      statu: true

    }
  },
  methods: {
    handleInput(event) {
      let value = event.target.value
      if (this.rules && this.rules.test(value)) {
        this.statu = true
      } else {
        this.statu = false
      }
      // 告诉父组件输入框的内容变化了
      this.$emit('input', value)
    },
    handleBlur(event) {
      let value = event.target.value
      if (this.rules && !this.rules.test(value)) {
        this.$toast.fail({
          message: this.msg || '输入不正确',
          duration: 2000
        })
      }
    }
  }

}
</script>

<style lang="less" scoped>
  .hminput {
      width: 318/360*100vw;
      height: 60px;
      outline: none;
      border:none;
      border-bottom: 2px solid #ccc;
      font-size: 20px;
      line-height: 60px;
  }
  .success{
      border-bottom-color: green;
  }
  .error {
      border-bottom-color: red;
  }
</style>

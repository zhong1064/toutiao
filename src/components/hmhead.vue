<template>
  <div class="header">
      <div>
          <slot name="left"></slot>
      </div>
      <div>{{title}}</div>
      <div>
           <slot name="right"></slot>
      </div>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="less" scoped>
.header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    align-items: center;
    >div:nth-child(1),div:nth-child(3){
        padding: 0 10px;
    }
    >div:nth-child(2){
        text-align: center;
    }
}
</style>

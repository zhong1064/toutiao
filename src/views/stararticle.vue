<template>
  <div class="in">
    <hmhead title="我的收藏">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </hmhead>

    <van-swipe-cell v-for="item in starlist" :key="item.id">

        <artblock  :post="item" @click="$router.push({path: `/artdetail/${item.id}`})"></artblock>
      <template slot="right">
        <van-button square type="danger" text="删除" />

      </template>
    </van-swipe-cell>

  </div>
</template>

<script>
import artblock from '@/components/hmartblock.vue';
import hmhead from '@/components/hmhead.vue';
import { getUserstar } from '@/apis/user.js';
export default {
  data() {
    return {
      starlist: []
    };
  },
  components: {
    hmhead,
    artblock
  },
  async mounted() {
    let res = await getUserstar();
    this.starlist = res.data.data;
  }
};
</script>

<style>
</style>

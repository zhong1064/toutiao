<template>
  <div class="cate">
    <hmhead title="频道管理">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </hmhead>
    <div class="mycate">
      <p>点击删除频道</p>
      <span v-for="(item,index) in catelist" :key="item.id" @click="remove(index)">{{item.name}}</span>
    </div>
    <div class="mycate">
      <p>点击添加频道</p>
      <span v-for="(item,index) in unaddcatelist" :key="item.id" @click="add(index)">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import { getCateList } from '@/apis/cate.js';
import hmhead from '@/components/hmhead.vue';
export default {
  data() {
    return {
      catelist: [],
      unaddcatelist: []
    };
  },
  components: {
    hmhead
  },
  async mounted() {
    // 获取未添加的栏目数据
    if (localStorage.getItem('toutiao_unadd_catelist')) {
      this.unaddcatelist = JSON.parse(
        localStorage.getItem('toutiao_unadd_catelist')
      );
    }
    // 获取已添加的栏目数据
    if (localStorage.getItem('toutiao_add_catelist')) {
      this.catelist = JSON.parse(localStorage.getItem('toutiao_add_catelist'));
    } else {
      let res = await getCateList();
      this.catelist = res.data.data;
      if (localStorage.getItem('toutiao_41_token')) {
        this.catelist = this.catelist.splice(2);
      } else {
        this.catelist = this.catelist.splice(1);
      }
    }
  },
  methods: {
    remove(index) {
      // 先存入待添加栏目组
      this.unaddcatelist.push(this.catelist[index]);
      // 再删除已存入栏目组的
      this.catelist.splice(index, 1);
      // 做数据的持久化  存储到本地
      localStorage.setItem('toutiao_add_catelist', JSON.stringify(this.catelist));

      localStorage.setItem('toutiao_unadd_catelist', JSON.stringify(this.unaddcatelist));
    },
    add(index) {
      // 先存入栏目组
      this.catelist.push(this.unaddcatelist[index]);
      // 在删除待添加栏目组
      this.unaddcatelist.splice(index, 1);
      // 做数据的持久化  存储到本地
      localStorage.setItem('toutiao_add_catelist', JSON.stringify(this.catelist));

      localStorage.setItem('toutiao_unadd_catelist', JSON.stringify(this.unaddcatelist));
    }
  }
};
</script>

<style lang="less" scoped>
.mycate {
  padding: 15px;
  clear: both;
  > p {
    font-size: 16px;
    color: #888;
    line-height: 30px;
  }
  > span {
    float: left;
    padding: 10px 20px;
    border: 1px solid #ccc;
    margin-left: 12px;
    margin-bottom: 10px;
    font-size: 16px;
  }
}
</style>

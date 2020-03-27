// eslint-disable-next-line vue/valid-template-root
<template>
  <div class="index">
    <!-- header部分 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({name:'Search'}) ">
        <van-icon name="search" class="sea" />
        <span>搜索商品</span>
      </div>
      <div class="user" @click="$router.push({ path: `/personal/${id}`}) ">
        <van-icon name="manager" />
      </div>
      <!-- <span class="addcatem" @click="$router.push({name: 'CateManager'})">+</span> -->
    </div>

    <!-- 标签页 -->
    <div class="nav">
      <van-tabs v-model="active" sticky swipeable>
        <van-tab v-for="cate in catelist" :title="cate.name" :key="cate.id">
          <van-list
            v-model="cate.loading"
            :finished="cate.finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            :offset="10"
          >
            <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
               <hmartblock v-for="(item,index) in cate.postList" :key="index" :post="item"
                @click="$router.push({path:`/artdetail/${item.id}`}) "
               >
               </hmartblock>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 新闻列表 -->
    <!-- <div class="newlist"></div> -->
  </div>
</template>

<script>
import { getCateList } from '@/apis/cate.js';
import { getartList } from '@/apis/article.js';
import hmartblock from '@/components/hmartblock.vue';
export default {
  data() {
    return {
      id: '',
      // 我们应该始终让头条被激活，如果登录过，栏目数据中返回了关注，我们应该始终让头条被激活
      active: localStorage.getItem('toutiao_41_token') ? 1 : 0,
      catelist: []
    };
  },
  async mounted() {
    // 添加事件
    document.querySelector('.van-sticky').onclick = (e) => {
      if (e.target.className === 'van-sticky') {
        this.$router.push({ name: 'CateManager' })
      }
      return false
    }
    // this.id = JSON.parse(localStorage.getItem('toutiao_41_user')).id;
    if (localStorage.getItem('toutiao_add_catelist')) {
      this.catelist = JSON.parse(localStorage.getItem('toutiao_add_catelist'));
      localStorage.getItem('toutiao_41_token') ? this.catelist.unshift(...[{ id: 1, name: '关注', is_top: 1 }, { id: 999, name: '头条', is_top: 1 }])
        : this.catelist.unshift({ id: 999, name: '头条', is_top: 1 })
    } else {
      let res = await getCateList()
      this.catelist = res.data.data
    }

    // 对数据进行改造
    this.catelist = this.catelist.map(value => {
      return {
        ...value,
        postList: [], // 当前栏目的新闻列表数据
        pageSize: 5, // 当前栏目每页所显示的记录数
        pageIndex: 1, // 当前栏目的页码
        loading: false,
        finished: false,
        isLoading: false
      };
    });
    this.init();
  },
  watch: {
    active() {
      if (this.catelist[this.active].postList.length === 0) {
        this.init();
      }
    }
  },
  methods: {

    // 下拉刷新数据
    onRefresh() {
      // 重置页码
      this.catelist[this.active].pageIndex = 1;
      // 数据清空
      this.catelist[this.active].length = 0;
      // 发起异步请求，获取数据
      setTimeout(() => {
        this.init()
      }, 1000)

      // 把finshed重置为false以便上拉加载数据
      this.catelist[this.active].finished = false
    },

    onLoad() {
      // 加载这个栏目下一页数据
      this.catelist[this.active].pageIndex++;
      setTimeout(() => {
        this.init();
      }, 1000);
    },
    async init() {
      // 获取当前栏目的id
      let id = this.catelist[this.active].id;
      // 发axios请求获取详情
      let res1 = await getartList({
        pageSize: this.catelist[this.active].pageSize,
        pageIndex: this.catelist[this.active].pageIndex,
        category: id
      });

      // 重置下拉标记isLoading标记
      if (this.catelist[this.active].isLoading) {
        this.catelist[this.active].isLoading = false;
      }
      // 将当前栏目的loading重置为false
      if (this.catelist[this.active].loading) {
        this.catelist[this.active].loading = false;
      }
      // 如果所有数据加载完毕，需要手动的将当前栏目的finished重置为true,以显示没有更多的提示
      if (res1.data.data.length < this.catelist[this.active].pageSize) {
        this.catelist[this.active].finished = true;
      }
      // 把数据存当前栏目的postlist数组中
      this.catelist[this.active].postList.push(...res1.data.data);
    }
  },
  components: {
    hmartblock
  }
};
</script>

<style lang="less" scoped>
/deep/.van-sticky{
  padding-right: 50px;
  &::after{
    content: '+';
    position: absolute;
    width: 51px;
    height: 44px;
    background-color: #fff;
    top: 0;
    right: 0;
    text-align: center;
    line-height: 42px;
    font-size: 35px;
  }
}
.header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  background-color: #f00;
  align-items: center;
  color: #fff;
  .logo {
    padding: 0 10px;
    .iconnew {
      font-size: 60px;
    }
  }
  .search {
    height: 40px;
    border-radius: 20px;
    flex: 1;
    background-color: rgba(255, 255, 255, 0.6);
    text-align: center;
    line-height: 40px;
    .sea {
      vertical-align: middle;
    }
  }
  .user {
    font-size: 25px;
    padding: 0 10px;
  }

}

</style>

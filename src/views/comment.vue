
<template>
  <div class="comments">
    <myheader title="精彩评论">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="lists">
      <div class="item" v-for="comments in commentlist" :key="comments.id">
        <div class="head">
          <img src="http://127.0.0.1:3000/uploads/image/ccc.jpeg" alt />
          <div>
            <p>{{comments.user.nickname}}</p>
            <span>{{comments.create_date}}</span>
          </div>
          <span @click="sendcom(comments)">回复</span>
        </div>
        <commentItem v-if="comments.parent" :comment="comments" @reply="sendcom"></commentItem>
        <div class="text">{{comments.content}}</div>
      </div>
    </div>
    <commentFoot :post="article" @refresh="refresh" :obj="refobj" @reset="refobj=null"></commentFoot>
  </div>
</template>

<script>
import commentFoot from '@/components/commentFoot.vue'
import commentItem from '@/components/commentItem.vue'
import { getCommentlist, getartById } from '@/apis/article.js'
import myheader from '@/components/hmhead.vue';
export default {

  data () {
    return {
      commentlist: [],
      article: {},
      refobj: null

    }
  },
  components: {
    myheader, commentItem, commentFoot
  },
  async  mounted () {
    this.init()
  },
  methods: {
    refresh() {
      this.init()
      window.scrollTo(0, 0)
    },
    sendcom(comments) {
      this.refobj = comments
    },
    async  init() {
      let res = await getCommentlist(this.$route.params.id, { pageSize: 10, pageIndex: 1 })
      this.commentlist = res.data.data.length > 0 ? res.data.data : this.commentlist
      let res2 = await getartById(this.$route.params.id)
      this.article = res2.data.data
    }
  }

};
</script>

<style lang='less' scoped>
.comments{
    margin-bottom: 50px;
}
.lists {
   border-top: 5px solid #ddd;
   padding: 0 15px;
   .item {
       padding: 10px 0;
       border-bottom: 1px solid #ccc;
       .head {
           display: flex;
           justify-content: space-between;
           align-items: center;
           >img {
              width: 50/360*100vw;
            //   height: 50/360*100vh;
               display: block;
               border-radius: 50%;
           }
           >div {
               flex: 1;
               display: flex;
                flex-direction: column;
               margin-left: 10px;
               >span {
                   font-size: 12px;
                   color:#999;
                   line-height: 25px;
               }
           }
           >span {
               color:#999;
               font-size: 12px;
           }

       }
       .text {
           font-size: 14px;
           color:#333;
           padding: 20px 0 10px 0;
       }

   }
}
</style>

<template>
  <div class="detail-page">
    <mt-header fixed title="">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <iframe frameborder="0" class="iframe-content" :src="obj.url"></iframe>
    <div class="bottom-tab">
        <div class="commentbtn" @click="goComments"><i class="iconfont icon-pinglun3"></i> <span>{{obj.comments}}</span></div>
    </div>
  </div>
</template>
<script>
import { Header } from 'mint-ui';
import axios from 'axios';
export default {
  name: 'detail',
  data () {
    return {
      obj:{
        url:'https://www.baidu.com/',
        commentLink:'',
        comments:25
      }
    }
  },
  components:{
  },
  methods:{
    getArticle(){
      let id = this.$route.query.id;
      this.url = 'https://wallstreetcn.com/articles/311940'
      // axios.post('/getArticle', {
      //   id: id
      // })
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
    },
    goComments(){
      let id = this.$route.query.id;
      this.$router.push({
        path: '/comments',
        query:{
          id : id || ''
        }
      });
    },
    goback(){
      this.$router.go(-1);
    }
  },
  created(){


  },
  mounted(){
    console.log("mounted")
  }
}
</script>

<style lang="less" scoped>
@import '//at.alicdn.com/t/font_5k8r2kzat8s62yb9.css';
.commentbtn{
  width:98%;
  height: .8rem;
  margin:.1rem 1%;
  border: 1px solid #fff;
  background-color: #fff;
  text-align: center;
  line-height: .8rem;
  color: #1a1f29;
}
.bottom-tab{
  width: 100%;
  height: 1rem;
  line-height: 1;
  position: fixed;
  bottom: 0;
  left:0;
  background-color: #eaeaea;
}
.detail-page{
  width: 100%;
  height: 100%;
}
.mint-header{
  background-color:#1a1f29;
  height: 1rem;
}
.iframe-content{
  margin-top:1rem;
  margin-bottom: 1rem;
  width: 100%;
  height: calc(100vh-2rem);
  background-color: #f2f2f2;
}
</style>

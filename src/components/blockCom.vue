<template>
  <div class="app_views">
      <div class="card" v-for="(item,index) in datas" :key="index" @click="goto(item.id)">
          <div class="content-box">
            <div class="title-m">
              {{ item.title }}
            </div>
            <div class="author">
              <img :src="item.authorImg" alt="pic"> <span> {{ item.author }} </span>
               <span class="time"> {{item.time}}发布</span>
            </div>
            <div class="comment">
              <div class="likes">
                <i class="iconfont icon-dianzan1"></i><span> {{item.like}}</span>
              </div>
              <div class="comments">
                <i class="iconfont icon-pinglun3"></i><span> {{item.comments}}</span>
              </div>
              <div class="share">
                <i class="iconfont icon-fenxiang"></i>
              </div>
            </div>
          </div>
          <div class="imgbox">
            <img :src="item.img" alt="pic">
          </div>
      </div>
  </div>
</template>

<script>
import store from '../vuex/store';
import { mapGetters,mapActions } from 'vuex';
export default {
  name: 'articles',
  props:['datas'],
  methods:{
    goto(ids){
      this.$router.push({
        path: '/detail',
        query:{
          id : ids || ''
        }
      });
    }
  },
  mounted(){
    let self = this;
    // window.scroll(function(){ //判断页面到底部，加载更多数据
    //   var winH = $(window).height(),
    //   domH = $(document).height(),
    //   scrollTop = $(".wrapper").scrollTop();
    //   //下面的1是距离底部只有1px的意思，可根据个人需要修改
    //   if(domH - winH - scrollTop < 60){
    //     console.log("++++")
    //   }else{
    //     return false;
    //   }
    // });
  },
}
</script>

<style lang="less" scoped>
.app_views{
  background:#1a1f29;
}
.comment{
  color:#b3b3b3;
  .likes,.comments{
    margin-right:.8rem;
    float:left;
  }
}
.image{
  width:2rem;
  height:2rem;
  float:left;
}
.comment{
  margin-top:.1rem;
}
.card{
  display:flex;
  padding:.2rem;
  width:96%;
  border-radius:3px;
  margin:0.3rem auto;
  background-color:#1a1f29;
}
.card:after{
  content:'';
  display:block;
  clear:both;
}
.imgbox{
  width: 21%;
  height: 2rem;
  img{
    max-width:100%;
  }
}
.content-box{
  width: 79%;
  position:relative;
  padding:0 0.2rem;
  font-size: 0.35rem;
}
.title-m{
  font-size:0.36rem;
  color:#b3b3b3;
}
.author{
  margin:.2rem 0;
  display: flex;
  align-items:center;
  img{
    width:.5rem;
    height: .5rem;
    border-radius: 50%;
  }
  span{
    padding: 0 .1rem;
    font-size: .3rem;
    color:#f2f2f2;
  }
}
.time{
  color: #999;
}
.liked{
  color: red;
}
.like{
  color:#333;
}
.bottom{
  position: absolute;
  bottom: 0.1rem;
}
*{
  box-sizing: border-box;
}
.button{
  font-size:0.35rem;
}
</style>

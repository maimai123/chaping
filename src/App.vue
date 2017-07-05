<template>
    <!-- 路由 -->
    <transition name='slide-left' keep-alive>
        <router-view></router-view>
    </transition>
    <!-- 返回顶部 -->
    <!-- <Backscroll  v-show="visible" :scroller="scroller"></Backscroll> -->
</template>
<script>
import store from './vuex/store';
import Backscroll from './components/backScroll.vue';
export default {
  name: 'layout',
  components:{
    'Backscroll':Backscroll //返回顶部
  },
  computed:{
    visible(){
      return store.getters.visible;
    }
  },
  data(){
    return{
       scroller: null,
    }
  },
  method:{
    beforeRouteUpdate(to,from,next){
        let isBack = this.$router.isBack;
        if( isBack ){
            this.transitionName = 'slide-right'
        }else{
            this.transitionName = 'slide-left'
        }
        this.$router.isBack = false;
    }
  },
  mounted:function(){
    this.scroller = this.$el;
  },
  created(){
    store.dispatch('changeVisible',false);
  }
}
</script>
<style media="screen" lang="less">
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}
</style>

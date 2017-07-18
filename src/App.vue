<template>
    <!-- 路由 -->
    <transition name='slide-fade'>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
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
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

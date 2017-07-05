<template>
  <div>
    <!-- 头部导航 -->
    <Heads></Heads>
    <!-- 侧边栏 -->
    <Silderbar @click="toggle()" ></Silderbar>
    <!-- 列表 -->
    <keep-alive>
      <First v-if="active == 0" />
      <Second v-if="active == 1" />
      <Third v-if="active == 2" />
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import Heads from '../header.vue';
import Silderbar from '../sidebar.vue';
import First from './first.vue';
import Second from './second.vue';
import Third from './third.vue';

export default {
  name: 'index',
  data () {
    return {
      loading: false,

    }
  },
  components: {
    Heads,
    Silderbar,
    First,
    Second,
    Third
  },
  computed: {
    ...mapGetters({
      lists:'filterLists',
      active:'active'
    }),
  },
  methods:{
    ...mapActions(['setTablist','doLists']),
    loadTop(){ //上拉刷新
      let that = this;
      console.log("top");
      setTimeout(function(){
        that.$refs.loadmore.onTopLoaded();
      },2000)
    },
    loadMoreMessage(){
      this.loading = true;
      // 函数节流
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        console.log("加载")
        this.loading = false;
      }, 2500);
    },
    touchM(){
      let start,end;
      let that = this;
      document.addEventListener("touchstart", function(e){
        let touch = event.targetTouches[0];
        start = touch.pageX;
      }, false);
      document.addEventListener("touchend", function(e){
        let touch = event.changedTouches[0];
        end = touch.pageX;
        if(start-end >150){
          that.popupVisible =  false;
        }
        if(end-start >150){
          that.popupVisible =  true;
        }
      }, false);
    },
    change(e){
      if(e.target.className == 'mask' || e.target.className == 'iconfont icon-iconfont303'){
        this.popupVisible =  !this.popupVisible;
      }
    },
    chooseM(index){
      this.choose = index;
    },
    afterEnter(){ //进入动画完成回调

    }
  },
  mounted(){
    // this.touchM();
  }
}
</script>

<style lang="less" scoped>
@popup:#252932;
@name:#8c8f96;
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-tap-highlight-color:rgba(255,255,255,0);
}
.wrapper{
  background: #1a1f29;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling:touch;
}
.lists{
  background: #1a1f29;
}
.lists li{
  height:2rem;
  line-height: 2rem;
  text-align: center;
  color:white;
}
.mint-loadmore{
  position: absolute;
  top: 1rem;
}
</style>

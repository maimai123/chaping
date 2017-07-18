<template>
  <div>
    <!-- 头部导航 -->
    <div class="tab_warpper">
      <!-- 菜单按钮 -->
      <div class="tab-warpper">
        <!-- menu菜单 -->
        <div class="menu" @click="toggle"><i class="iconfont icon-iconfont303"></i></div>
          <ul class="tab">
            <li :class="{active:active == item.id}" @click="changeActives(item.id)" v-for="item in tablist" :data-id="item.id" :data-key="item.key">{{ item.name}}</li>
          </ul>
        <div class="search" @click="gotoSearch"><i class="iconfont icon-sousuo"></i></div>
      </div>
    </div>
    <!-- 侧边栏 -->
    <Silderbar @click="toggle()" ></Silderbar>
    <!-- 列表 -->
    <!-- <First />
    <Second />
    <Third /> -->
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide><First /></swiper-slide>
      <swiper-slide><Second /></swiper-slide>
      <swiper-slide><Third /></swiper-slide>
    </swiper>
      <!-- <First v-if="active == 0" />
      <Second v-if="active == 1" />
      <Third v-if="active == 2" /> -->
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import Silderbar from '../sidebar.vue';
import First from './first.vue';
import Second from './second.vue';
import Third from './third.vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'index',
  data () {
    let self = this;
    return {
      loading: false,
      swiperOption: {
        notNextTick: true,
        onTransitionEnd(swiper){
          console.log(swiper)
          self.changeActive(swiper.activeIndex);
        }
      }
    }
  },
  components: {
    Silderbar,
    First,
    Second,
    Third,
    swiper,
    swiperSlide
  },
  computed: {
    ...mapGetters({
      lists:'filterLists',
      active:'active',
      tablist:'tablist',
      popupVisible:'popupVisible'
    }),
    swiper(){
      return this.$refs.mySwiper.swiper
    }
  },
  methods:{
    ...mapActions(['setTablist','doLists','changeActive','changePopup']),
    toggle(flag) {
			this.changePopup();
		},
    changeActives(index){
      this.changeActive(index);
      this.swiper.slideTo(index, 500, false);
    },
    gotoSearch(){
      this.$router.push({
          path: '/search'
      })
    },
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

<style lang="less">
@import '//at.alicdn.com/t/font_l7uc9om2ksnn4s4i.css';
@popup:#252932;
@name:#8c8f96;
@black:#1d1d1d;
@white:#ebebeb;
@e9:#e9e9e9;
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
.tab-warpper,.tab_warpper{
  background-color: #1a1f29;
  width:10rem;
  height:1.2rem;
}
.tab_warpper{
  position:fixed;
  top:0;
  z-index: 999;
}
.menu{
  padding-left: .2rem;
  .iconfont{
    font-size: 27px;
  }
}
.search{
  padding-right: .2rem;
  text-align: right;
  .iconfont{
    font-size: 22px;
  }
}
.iconfont{
  color:#f2f2f2;
}
.menu,.search{
  height: 1.2rem;
  line-height: 1.2rem;
  width: 20%;
  float: left;
}

.tab{
  width:60%;
  margin:0 auto;
  height:1.2rem;
  line-height: 1.2rem;
  list-style: none;
  float: left;
  justify-content:center;
  display: flex;
  padding:0;
}
.tab li{
  font-size: .46rem;
  display: inline-block;
  width:33%;
  text-align: center;
  color:#9a9a9a;
  transition:all .2s;
}
.tab .active{
  color:#fff;
  font-size: .48rem;
}

.swiper-wrapper{
  height:100vh;
}
.swiper-slide{
  overflow-y:auto;
  -webkit-overflow-scrolling : touch;
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

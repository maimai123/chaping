<template>
  <!-- 列表 -->
  <mt-loadmore
    :top-method="loadTop"
    ref="loadmore">
    <div
        v-infinite-scroll="loadMoreMessage"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <BlockCom  :datas="lists"/>
    </div>
  </mt-loadmore>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import BlockCom from '../blockCom.vue';
import {  Loadmore ,InfiniteScroll } from 'mint-ui';
export default {
  name: 'index',
  data () {
    return {
      loading: false,

    }
  },
  components: {
    BlockCom,
    Loadmore,
    InfiniteScroll
  },
  computed: {
    ...mapGetters({
      lists:'filterLatest',
    })
  },
  methods:{
    ...mapActions(['setLatest']),
    loadTop(){ //上拉刷新
      let that = this;
      console.log("top");
      setTimeout(function(){
        that.$refs.loadmore.onTopLoaded();
      },2000)
    },
    loadMoreMessage(){
      this.loading = true;
      console.log("加载");
      // setTimeout(()=>{
      //   this.loading = false;
      // },1000);
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
    let datas =[
      {
        id:9,
        title:'2新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
        img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
        like:6,
        comments:11,
        author:'一个阿呆仔',
        authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
        time:'7分钟前'
      },
      {
        id:10,
        title:'【北京二环内禁止、四环内严控新增建设用地】2017年，北京将严控城乡建设用地总量，二环内禁止新增建设用地，四环内严控新增建设用地。5月22日，市规划国土委发布2017年度绩效任务，严格落实新编制的城市总体规划，严格管控生态红线和城市开发边界。 ',
        img:'http://img2.chouti.com/CHOUTI_C3EACE88E30C4F439B0DE1EA02262DCF_W400H400=C60x60.jpg',
        like:6,
        comments:11,
        author:'千龙网-北京 ',
        authorImg:'http://img2.chouti.com/CHOUTI_D1244944C781489CB0ED22893816A34B_W144H72=15x15.png',
        time:'17分钟前'
      },
      {
        id:11,
        title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
        img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
        like:6,
        comments:11,
        author:'一个阿呆仔',
        authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
        time:'7分钟前'
      },
      {
        id:12,
        title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
        img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
        like:6,
        comments:11,
        author:'一个阿呆仔',
        authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
        time:'7分钟前'
      },
      {
        id:13,
        title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
        img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
        like:6,
        comments:11,
        author:'一个阿呆仔',
        authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
        time:'7分钟前'
      },
      {
        id:14,
        title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
        img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
        like:6,
        comments:11,
        author:'一个阿呆仔',
        authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
        time:'7分钟前'
      },
    ];
    this.setLatest(datas);
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

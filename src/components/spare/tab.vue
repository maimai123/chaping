<template>
  <div>
  <div class="tab-warpper">
    <!-- menu菜单 -->
    <div class="menu" @click="toggle(true)"><i class="iconfont icon-iconfont303"></i></div>
    <ul class="tab">
      <li :class="{active:active == item.id}" v-for="item in tablist" @click="goto(item.id)" :id="item.id" :data-key="item.key">{{ item.name}}</li>
    </ul>
    <div class="search"><i class="iconfont icon-sousuo"></i></div>
  </div>
  <!-- 下拉刷新 -->

    <swiper :options="swiperOption" ref="mySwiper" class="swiper-box" v-if="!isSub">
      <swiper-slide class="swiper-item" v-for="(item,index) in lists" :key="index">
        <BlockCom :datas="item.list"/>
      </swiper-slide>
    </swiper>
  <swiper :options="swiperOption" ref="mySwiper" class="swiper-box" v-else>
    <swiper-slide class="swiper-item" v-for="(item,index) in sublists" :key="index">
      <BlockCom :datas="item.list"/>
    </swiper-slide>
  </swiper>
  <!-- 侧边栏 -->
  <mu-drawer :open="open" :docked="docked" @close="toggle()">
    <mu-list @itemClick="docked ? '' : toggle()">
      <router-link v-if="!isLogin"  to="/login">
        <mu-list-item title="登录 / 注册">
          <mu-avatar slot="left" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3632819575,861921252&fm=23&gp=0.jpg"/>
        </mu-list-item>
      </router-link >
      <mu-list-item v-else title="麦麦">
        <mu-avatar slot="left" src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=95553485,1555483991&fm=80&w=179&h=119&img.JPEG"/>
      </mu-list-item>
      <mu-list-item v-for="(item,index) in menulist" :title="item.name" :key="item.name" @click="routeTo(item.link)"/>
      <mu-list-item v-if="docked" @click.native="open = false" title="Close"/>
    </mu-list>
  </mu-drawer>
</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapGetters,mapActions } from 'vuex';
import Heads from '../header.vue';
import BlockCom from '../blockCom.vue';
export default {
  name: 'home',
  data () {
    let that = this;
    return {
      isLoading: false,
      key: "",
      active:0,
      open:false,
      docked:false,
      swiperOption: {
        notNextTick: true,
        loop:false,
        speed:600,
        autoHeight: true,
        onSlideChangeEnd: function(swiper){
            that.setActive(swiper.activeIndex);
        }
      },
      isLogin:false,
      userIcon:'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=95553485,1555483991&fm=80&w=179&h=119&img.JPEG',
      isSub:false,
      isMore:true,
      tip:'主人看我~~~'
    }
  },
  components: {
    swiper,
    swiperSlide,
    BlockCom,
    Heads,
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    ...mapGetters({
      tablist:'tablist',
      lists:'filterLists',
      menulist:'menulist',
      sublists:'sublists'
    })
  },
  methods:{
    ...mapActions(['setLists','setTablist','doLists']),
    routeTo(link){ //menu跳转 this.$route.query.search
      console.log(link);
      let lis=[],datas=[];
      if(link == 0){ //全部
        this.isSub =  false;
        this.goto(0); //选中第一个tab
        lis=[
          {
            name:'最热',
            id:0,
            key:'hot'
          },
          {
            name:'发现',
            id:1,
            key:'find'
          },
          {
            name:'人类发布',
            id:2,
            key:'human'
          },
        ];
        this.getDefaultList();
      }else{
        this.isSub =  true;
        console.log(this.isSub)
        this.goto(0); //选中第一个tab
        lis = [
          {
            name:'最热',
            id:0,
            key:'hotest'
          },
          {
            name:'最新',
            id:1,
            key:'latest'
          }
        ];
        datas = [
          {
            'list':[
              {
                id:1,
                title:'1新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
                img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
                like:6,
                comments:11,
                author:'一个阿呆仔',
                authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
                time:'7分钟前'
              },
              {
                id:1,
                title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
                img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
                like:6,
                comments:11,
                author:'一个阿呆仔',
                authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
                time:'7分钟前'
              },
              {
                id:1,
                title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
                img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
                like:6,
                comments:11,
                author:'一个阿呆仔',
                authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
                time:'7分钟前'
              },
              {
                id:1,
                title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
                img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
                like:6,
                comments:11,
                author:'一个阿呆仔',
                authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
                time:'7分钟前'
              },
              {
                id:2,
                title:'【北京二环内禁止、四环内严控新增建设用地】2017年，北京将严控城乡建设用地总量，二环内禁止新增建设用地，四环内严控新增建设用地。5月22日，市规划国土委发布2017年度绩效任务，严格落实新编制的城市总体规划，严格管控生态红线和城市开发边界。 ',
                img:'http://img2.chouti.com/CHOUTI_C3EACE88E30C4F439B0DE1EA02262DCF_W400H400=C60x60.jpg',
                like:6,
                comments:11,
                author:'千龙网-北京 ',
                authorImg:'http://img2.chouti.com/CHOUTI_D1244944C781489CB0ED22893816A34B_W144H72=15x15.png',
                time:'17分钟前'
              },
              {
                id:3,
                title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
                img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
                like:6,
                comments:11,
                author:'一个阿呆仔',
                authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
                time:'7分钟前'
              },
              {
                id:4,
                title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
                img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
                like:6,
                comments:11,
                author:'一个阿呆仔',
                authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
                time:'7分钟前'
              }
            ]
          },
          {
            'list':[
              {
                id:5,
                title:'2【北京二环内禁止、四环内严控新增建设用地】2017年，北京将严控城乡建设用地总量，二环内禁止新增建设用地，四环内严控新增建设用地。5月22日，市规划国土委发布2017年度绩效任务，严格落实新编制的城市总体规划，严格管控生态红线和城市开发边界。 ',
                img:'http://img2.chouti.com/CHOUTI_C3EACE88E30C4F439B0DE1EA02262DCF_W400H400=C60x60.jpg',
                like:6,
                comments:11,
                author:'千龙网-北京 ',
                authorImg:'http://img2.chouti.com/CHOUTI_D1244944C781489CB0ED22893816A34B_W144H72=15x15.png',
                time:'17分钟前'
              },
              {
                id:6,
                title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
                img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
                like:6,
                comments:11,
                author:'一个阿呆仔',
                authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
                time:'7分钟前'
              },
              {
                id:7,
                title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
                img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
                like:6,
                comments:11,
                author:'一个阿呆仔',
                authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
                time:'7分钟前'
              },
              {
                id:8,
                title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
                img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
                like:6,
                comments:11,
                author:'一个阿呆仔',
                authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
                time:'7分钟前'
              }
            ]
          }
        ];
        this.doLists(datas);
      }
      this.setTablist(lis);

      // this.$router.push({
      //   query:{
      //     search : link || ''
      //   }
      // });
    },
    getDefaultList(){
      // 获取默认最热、发现、人类发布
      let datas = [
        {
          'list':[
            {
              id:1,
              title:'1新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
              img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
              like:6,
              comments:11,
              author:'一个阿呆仔',
              authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
              time:'7分钟前'
            },
            {
              id:1,
              title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
              img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
              like:6,
              comments:11,
              author:'一个阿呆仔',
              authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
              time:'7分钟前'
            },
            {
              id:1,
              title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
              img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
              like:6,
              comments:11,
              author:'一个阿呆仔',
              authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
              time:'7分钟前'
            },
            {
              id:1,
              title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
              img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
              like:6,
              comments:11,
              author:'一个阿呆仔',
              authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
              time:'7分钟前'
            },
            {
              id:2,
              title:'【北京二环内禁止、四环内严控新增建设用地】2017年，北京将严控城乡建设用地总量，二环内禁止新增建设用地，四环内严控新增建设用地。5月22日，市规划国土委发布2017年度绩效任务，严格落实新编制的城市总体规划，严格管控生态红线和城市开发边界。 ',
              img:'http://img2.chouti.com/CHOUTI_C3EACE88E30C4F439B0DE1EA02262DCF_W400H400=C60x60.jpg',
              like:6,
              comments:11,
              author:'千龙网-北京 ',
              authorImg:'http://img2.chouti.com/CHOUTI_D1244944C781489CB0ED22893816A34B_W144H72=15x15.png',
              time:'17分钟前'
            },
            {
              id:3,
              title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
              img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
              like:6,
              comments:11,
              author:'一个阿呆仔',
              authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
              time:'7分钟前'
            },
            {
              id:4,
              title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
              img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
              like:6,
              comments:11,
              author:'一个阿呆仔',
              authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
              time:'7分钟前'
            }
          ]
        },
        {
          'list':[
            {
              id:5,
              title:'2【北京二环内禁止、四环内严控新增建设用地】2017年，北京将严控城乡建设用地总量，二环内禁止新增建设用地，四环内严控新增建设用地。5月22日，市规划国土委发布2017年度绩效任务，严格落实新编制的城市总体规划，严格管控生态红线和城市开发边界。 ',
              img:'http://img2.chouti.com/CHOUTI_C3EACE88E30C4F439B0DE1EA02262DCF_W400H400=C60x60.jpg',
              like:6,
              comments:11,
              author:'千龙网-北京 ',
              authorImg:'http://img2.chouti.com/CHOUTI_D1244944C781489CB0ED22893816A34B_W144H72=15x15.png',
              time:'17分钟前'
            },
            {
              id:6,
              title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
              img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
              like:6,
              comments:11,
              author:'一个阿呆仔',
              authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
              time:'7分钟前'
            },
            {
              id:7,
              title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
              img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
              like:6,
              comments:11,
              author:'一个阿呆仔',
              authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
              time:'7分钟前'
            },
            {
              id:8,
              title:'新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
              img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
              like:6,
              comments:11,
              author:'一个阿呆仔',
              authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
              time:'7分钟前'
            }
          ]
        },
        {
          'list':[
            {
              id:9,
              title:'3新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
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
            }
          ]
        }
      ];
      this.setLists(datas);
    },
    infinite(){
        var _V = this;
        /*  这里是模拟ajax或者什么其他的请求数据延迟的情况，
        *   所以我随便延迟了1秒，不然加载成功很快，过渡的
        *   文字提示可能看都看不到
        */
        setTimeout(()=>{
            _V.isMore = false;
        },1000);
    },
    refresh(){
        var _V = this;
        /*  这里是模拟ajax或者什么其他的请求数据延迟的情况，
        *   所以我随便延迟了1秒，不然加载成功很快，过渡的
        *   文字提示可能看都看不到
        */
        setTimeout(()=>{
            _V.isMore = false;
        },1000);
    },
    goto(id){
      this.active = id;
      this.swiper.slideTo(id, 500, false);
    },
    setActive(id){ //选中相应tab
      this.active = id;
    },
    toggle(flag) { //菜单栏
      this.open = !this.open
      this.docked = !flag
		},
  },
  created(){
    this.getDefaultList();
  },
  mounted(){
    if(!this.isLogin){
      this.userIcon = '';
    }else{
      this.userIcon = '';
    }
  }
}
</script>

<style lang="less" scoped>
*{
  box-sizing:border-box;
}
body {
  background: #eee;
}

.tab-warpper{
  height:1rem;
  background-color: #f9f9f9;
  position: fixed;
  width:100%;
  z-index: 99;
}
.menu{
  padding-left: .2rem;
  .iconfont{
    font-size: 28px;
  }
}
.search{
  padding-right: .2rem;
  text-align: right;
  .iconfont{
    font-size: 24px;
  }
}
.menu,.search{
  height: 1rem;
  line-height: 1.1rem;
  width: 20%;
  float: left;
}

.tab{
  width:60%;
  margin:0 auto;
  padding: 0;
  height:1rem;
  line-height: .95rem;
  list-style: none;
  font-size: 0;
  float: left;
  justify-content:center;
  display: flex;
}
.tab li{
  font-size: .46rem;
  display: inline-block;
  width:33%;
  text-align: center;
  color:#9a9a9a;
  transition:all .2s;
}
.tab li.active{
  color:black;
  border-bottom:0.07rem solid #a7a7d2;
  font-size: .47rem;
}
.swiper-box {
  width: 100%;
  position: absolute;
  top: 1rem;
  left:0;
  overflow-y: auto;
  -webkit-overflow-scrolling:touch;
}
.swiper-item {
  height: 100%;
  font-size: 18px ;
}
.swiper-slide .title {
  font-size: 41px;
  font-weight: 300;
}
.swiper-slide .subtitle {
  font-size: 21px;
}
.swiper-slide .text {
  font-size: 14px;
  max-width: 400px;
  line-height: 1.3;
}
</style>

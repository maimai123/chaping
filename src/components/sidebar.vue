<template>
  <!-- ===================mm左侧列表->start ===================== -->
  <transition  name="slide-fade">
      <div class="popup" v-show="popupVisible">
        <div class="panel">
          <div class="userInfo">
            <img v-if="!isLogin"  class="usericon" src="http://www.czgongzuo.com/Files/PerPhoto/photoman.gif" alt="">
            <img v-else class="usericon" :src="loginInfo.userIcon" alt="user">
            <div v-if="!isLogin" class="username" @click="login">登录/注册</div>
            <div v-else class="username">{{ loginInfo.username }}</div>
          </div>
          <ul class="menuList" >
            <li :class="{choose:choose == item.link}" v-for="(item,index) in menulist" :key="item.name" @click="chooseM(item.link)">{{ item.name }}</li>
          </ul>
        </div>
        <div class="mask" @click="prevent">
        </div>
    </div>
  </transition>
  <!-- ===================mm 左侧列表->END ===================== -->
</template>

<script>
import store from '../vuex/store';
import getUrl from './gitUrl/index';
import axios from 'axios';
import { mapGetters,mapActions } from 'vuex';
export default {
  name: 'sidebar',
  data () {
    return {
      num: getUrl("choose"),
      choose:0,
      loginInfo:{
        userIcon:'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=95553485,1555483991&fm=80&w=179&h=119&img.JPEG',
        username:'麦麦',
      },
      isLogin:false
    }
  },
  computed:{
    menulist(){
      return store.getters.menulist;
    },
    ...mapGetters({
      popupVisible:'popupVisible'
    })
  },
  methods:{
    ...mapActions(['changePopup','setHot','addHot','setTablist']),
    prevent(event) { //关闭侧边栏
      if(event.target.className == "mask"){
        this.changePopup();
      }
		},
    chooseM(index){  //点击侧边栏菜单
      this.$router.push({
        query:{
          choose : index || ''
        }
      });
      this.choose = index;
      this.changePopup();
      if(index == '0'){ //全部-》三个tab
        let tab =[ //tab分类
          {
            name:'最热',
            id:0,
            key:'hot'
          },
          {
            name:'最新',
            id:1,
            key:'latest'
          },
          {
            name:'发现',
            id:2,
            key:'find'
          }
        ];
        this.setTablist(tab);
        // 发请求
        // axios.post('/getData', {
        //   type: 'hot',
        //   item:item
        // })
        // .then(function (response) {
        //   console.log(response);
        //   this.setHot(response);
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
        let datas =[
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
            id:9,
            title:'1新北市立鶯歌陶瓷博物馆 推出的“壁咚” 椒 盐罐 ​(@一个阿呆仔) ',
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
        this.setHot(datas);
      }else{ //两个tab
        let tab =[ //tab分类
          {
            name:'最热',
            id:0,
            key:'hot'
          },
          {
            name:'最新',
            id:1,
            key:'latest'
          }
        ];
        this.setTablist(tab);
      }
    },
    login(){ //登录
      this.$router.push({
          path: '/login'
      })
    },
  },
  mounted(){

  }
}
</script>
<style media="screen" lang="less" scoped>
@popup:#252932;
@name:#8c8f96;
/*展示动画 START*/
.slide-fade-enter-active {
  transition: all .5s ease-in-out;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0) ;
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(-60px);
  opacity: 0;
}
/*展示动画 END*/
ul{
  list-style:none;
  padding:0;
}
.mask{
  width: 100%;
  height: 100%;
  opacity: 1;
  background-color:rgba(0,0,0,0);
  transition: opacity .3s ease;
}
.popup{
  width: 100%;
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index: 999;
  box-shadow: 0 0 7px @popup;
}
.panel{
  width:80%;
  float:left;
  height:100%;
  background: @popup;
}
.menuList{
  margin-top: 1.7rem;
}
.menuList li{
  width:100%;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  color: #676767;
  font-size: 17px;
  transition: all .2s;
  margin-bottom: 0.15rem;
  &.choose{
    background: #4f7479;
    color: #cac8c8;
  }
}
.userInfo{
  position: relative;
  top:1rem;
  text-align: center;
}
.usericon{
  width:3rem;
  height: 3rem;
  border-radius: 50%;
  border:.23rem solid #2c2f34;
}
.username{
  font-size: 18px;
  color: @name;
}
</style>

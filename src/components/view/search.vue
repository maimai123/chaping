<template>
  <!-- 列表 -->
  <div class="">
    <div class="search-content">
      <input class="searchBox" type="text" name="search" v-model="value" @keydown="doSearch" placeholder="搜索" />
      <div class="cancelBtn" @click="back">取消</div>
    </div>
    <div class="lists-content">
      <div v-if="result.length > 0">
        <block-Com :datas="result" />
      </div>
      <div class="centerBox" v-else>
        <img src="./../../assets/empty.png" alt="">
        <p>搜索一下！</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import blockCom from './../blockCom.vue';
import axios from 'axios';
export default {
  name: 'search',
  data () {
    return {
      result:[],
      value:''
    }
  },
  computed: {
    ...mapGetters({
      lists:'filterHot',
    })
  },
  components:{
    blockCom
  },
  methods:{
    back(){
      this.$router.go(-1);
    },
    doSearch(event){
      let key = event.keyCode;
      let value = this.value.trim();
      if( key  == 13){
        // axios.post('/search', {
        //   value: value
        // })
        // .then(function (response) {
        //   console.log(response);
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
        let datas =[
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
        this.result = datas;
        // console.log(this.result)
      }
    }
  },
  mounted(){
    String.prototype.trim=function(){ //去前后空格
      return this.replace(/(^\s*)|(\s*$)/g, "");
    }
  }
}
</script>

<style lang="less" scoped>
.centerBox{
  width: 60%;
  margin:1rem auto;
  img{
    max-width: 100%;
  }
  p{
    text-align: center;
    font-size: .6rem;
    color:#939393;
  }
}
.lists-content{
  color:#f2f2f2;
}
.search-content{
  width:100%;
  height:1.2rem;
  margin-top:.2rem;
}
.searchBox{
  width:80%;
  height:.8rem;
  line-height:.8rem;
  font-size:14px;
  float: left;
  margin-left:2%;
  border:none;
  border-radius: 5px;
  outline:none;
  padding: 10px;
}
.cancelBtn{
  float: right;
  height: .8rem;
  line-height:.8rem;
  font-size:.45rem;
  color:#eee;
  margin-right: .4rem;
}
</style>

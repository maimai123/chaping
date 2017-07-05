<template>
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
</template>

<script>
import store from '../vuex/store';
import { mapGetters,mapActions } from 'vuex';
export default {
  name: 'banner',
  computed:{
    ...mapGetters({
      tablist:'tablist',
      active:'active',
      popupVisible:'popupVisible'
    })
  },
  components:{
  },
  methods:{
    ...mapActions(['changePopup','changeActive']),
    toggle(flag) {
			this.changePopup();
		},
    changeActives(index){
      this.changeActive(index);
    },
    gotoSearch(){
      this.$router.push({
          path: '/search'
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import 'https://at.alicdn.com/t/font_ig6xu4rwjodh1tt9.css';
@black:#1d1d1d;
@white:#ebebeb;
@e9:#e9e9e9;
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
</style>

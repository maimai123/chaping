import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    tabList:[ //tab分类
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
      },
    ],
    visible : false, //返回顶部按钮显隐状态
    menulist:[  //菜单栏数据
      {
        link:'0',
        name:"全部"
      },
      {
        link:'1',
        name:"大事情"
      },
      {
        link:'2',
        name:"搞事情"
      },
      {
        link:'3',
        name:"黑科技"
      },
      {
        link:'4',
        name:"玩点啥"
      },
      {
        link:'5',
        name:"屌人转"
      }
    ],
    hot: [],    // 最热文章数据
    latest: [], //最新文章数据
    find:[],    //发现文章数据
    popupVisible:false, //侧边栏开关
    active:0
};
export default new Vuex.Store({
  state, //状态
  getters, //处理state数据
  mutations, // 注册我们各种数据变化的方法
  actions, //可以编写异步的逻辑或者是一些逻辑，再去commit 我们的事件
});

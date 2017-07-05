import * as types from '../mutation-types.js';

export default {
  // 各种方法写在这里
  [ types.LOAD_MORE ] ( state, list ) { //新增更多数据
    list.map((item,index)=>{
      state.lists.push( Object.assign({}, item) )
    })
  },

  [ types.CHANGE_VISIBLE ] ( state, flag ) { //修改返回顶部显隐状态
    state.visible =  flag;
  },

  [ types.CHANGE_POPUP ] ( state ) { //修改slide显隐状态
    state.popupVisible =  !state.popupVisible;
  },

  [ types.CHANGE_ACTIVE ] ( state , n ) { //修改tab选中状态
    state.active =  n;
  },


  [ types.SET_TABLIST ] ( state, data ) { //修改tabList
    state.tabList =  data;
  },

  [ types.SET_HOT ] ( state ,data) { //新增hot放入store
    state.hot = data;
  },

  [ types.ADD_HOT ] ( state ,data) { //添加hot数据放入store
    data.map((item,index)=>{
      state.hot.push( Object.assign({}, item) )
    })
  },

  [ types.SET_LATEST ] ( state ,data) { //新增latest放入store
    state.latest = data;
  },

  [ types.ADD_LATEST ] ( state ,data) { //添加latest数据放入store
    data.map((item,index)=>{
      state.latest.push( Object.assign({}, item) )
    })
  },
  
  [ types.SET_FIND ] ( state ,data) { //新增find放入store
    state.find = data;
  },

  [ types.ADD_FIND ] ( state ,data) { //添加find数据放入store
    data.map((item,index)=>{
      state.find.push( Object.assign({}, item) )
    })
  },
}

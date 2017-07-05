import * as types from '../mutation-types'

export default {

  //新增很多数据
  loadMore({ commit },more_List) {
    commit( types.LOAD_MORE,more_List)
  },

  //修改tab选中的状态
  changeActive({ commit },n) {
    commit( types.CHANGE_ACTIVE,n )
  },

  //修改visible的状态
  changeVisible({ commit },n) {
    commit( types.CHANGE_VISIBLE,n )
  },

  //修改slide shown的状态
  changePopup({ commit }) {
    commit( types.CHANGE_POPUP )
  },

  //设置tablist
  setTablist({ commit }, data ){
    commit( types.SET_TABLIST , data );
  },

  //设置store hot的值
  setHot({ commit }, data ) {
    commit( types.SET_HOT , data );
  },

  //设置store hot的值（往里添加数据 上拉加载）
  addHot({ commit }, data ) {
    commit( types.ADD_HOT , data );
  },

  //设置store Latest的值
  setLatest({ commit }, data ) {
    commit( types.SET_LATEST , data );
  },

  //设置store Latest的值（往里添加数据 上拉加载）
  addLatest({ commit }, data ) {
    commit( types.ADD_LATEST , data );
  },

  //设置store find的值
  setFind({ commit }, data ) {
    commit( types.SET_FIND , data );
  },

  //设置store find的值（往里添加数据 上拉加载）
  addFind({ commit }, data ) {
    commit( types.ADD_FIND , data );
  },
};

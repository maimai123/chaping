import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  // mode: 'history',
  routes : [
    {
      path: '/',
      name: 'Layout',
      component: resolve => require(['../App.vue'], resolve),
      redirect:'/index',
      children:[
        {
          path: 'index',
          name: 'index',
          component: resolve => require(['../components/view/index.vue'], resolve),
          meta:{
            title:'抽屉'
          }
        },
        {
          path: 'login',
          name: 'login',
          component:  resolve => require(['../components/view/Login.vue'], resolve),
          meta:{
            title:'登录'
          }
        },
        {
          path: 'register',
          name: 'register',
          component:  resolve => require(['../components/view/register.vue'], resolve),
          meta:{
            title:'注册'
          }
        },
        {
          path: 'search',
          name: 'search',
          component:  resolve => require(['../components/view/search.vue'], resolve),
          meta:{
            title:'搜索'
          }
        },
        {
          path: 'detail',
          name: 'detail',
          component:  resolve => require(['../components/view/details.vue'], resolve),
          meta:{
            title:'搜索'
          }
        },
        {
          path: 'comments',
          name: 'comments',
          component:  resolve => require(['../components/view/comments.vue'], resolve),
          meta:{
            title:'详情'
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
  });
router.beforeEach(({ meta, path }, from, next) => {
  document.title = meta.title;
  next();
});
export default router;

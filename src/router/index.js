/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect:'/homePage'
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['../views/login/login.vue'], resolve)
  },
  {
    path: '/homePage',
    name: 'homePage',
    component: resolve => require(['../views/homePage/index.vue'], resolve)
  },
  {
    path: '/Home',
    name: 'Home',
    component: resolve => require(['../views/Home/index.vue'], resolve),
    children: [
      {
        path: '/',
        component: resolve => require(['../views/Home/info.vue'], resolve)
      },
      // 富宝通展示 homes
      {
        path: '/homes',
        component: resolve =>require(['../views/Home.vue'], resolve),
        children:[
          {
              path: '/homes/agreementMaintenance',
              name: 'agreementMaintenance',
              meta: {
                  title: '协议维护',
                  icon: 'iconfolder1'
              },
              component: resolve => require(['../views/agreementMaintenance/index.vue'], resolve)
          },
          {
              path: '/homes/signAgreement',
              name: 'signAgreement',
              meta: {
                  title: '协议签署',
                  icon: 'iconproject1'
              },
              component: resolve => require(['../views/signAgreement/index.vue'], resolve)
          },
          {
            path: '/homes/mapComponent',
            name: 'mapComponent',
            meta: {
                title: '地图',
                icon: 'iconproject1'
            },
            component: resolve => require(['@/components/mapComponent.vue'], resolve)
          },
        ]
      },
      // 管理中心展示 业务开通 manage
      {
        path: '/manage',
        component: resolve =>require(['../views/Home.vue'], resolve),
        children:[
          {
            path: '/manage/businessOpenAudit',
            name: 'businessOpenAudit',
            meta: {
                title: '业务开通审核',
                icon: 'iconproject1'
            },
            component: resolve => require(['../views/businessOpenAudit/index.vue'], resolve)
          },
        ]
      }
    ]
  },
  
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    };
  }
});
router.beforeEach((to, from, next) => {
  let user = sessionStorage.getItem('token')
  let path = to.path
  if (path === '/login') {
    next()
    return
  }
  if (user) {
    if (path === '/') {
      next({
        path: '/home'
      })
    } else {
      next()
    }
  } else {
    if(path === '/homePage'){
      next()
      return;
    }
  }
});
export default router;
/* eslint-enable */

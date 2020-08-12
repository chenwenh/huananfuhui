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
        component: resolve =>
          require(['../views/Home/info.vue'], resolve)
      },
      {
        path: '/home2',
        component: resolve =>require(['../views/Home.vue'], resolve),
        children:[
          {
                  path: '/',
                  component: resolve =>require(['../views/assetContract/contractQuery.vue'], resolve)
          },
          {
              path: '/contractQuery',
              name: 'contractQuery',
              meta: {
                  title: '协议维护',
                  icon: 'iconfolder1'
              },
              component: resolve => require(['../views/assetContract/contractQuery.vue'], resolve)
          },
          {
              path: '/orderQuery',
              name: 'orderQuery',
              meta: {
                  title: '协议签署',
                  icon: 'iconproject1'
              },
              component: resolve => require(['../views/assetOrder/orderQuery.vue'], resolve)
          },
          {
            path: '/businessOpenAudit',
            name: 'businessOpenAudit',
            meta: {
                title: '业务开通审核',
                icon: 'iconproject1'
            },
            component: resolve => require(['../views/businessOpenAudit/index.vue'], resolve)
        },
        ]
      },
    ]
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: resolve => require(['../views/Home.vue'], resolve),
  //   children: [
  //     {
  //       path: '/',
  //       component: resolve =>
  //         require(['../views/readme.vue'], resolve)
  //     },
  //     {
  //       path: '/readme',
  //       component: resolve =>
  //         require(['../views/readme.vue'], resolve)
  //     },
  //     {
  //       path: '/contractQuery',
  //       name: 'contractQuery',
  //       meta: {
  //           title: '合同查询',
  //           icon: 'iconfolder1'
  //       },
  //       component: resolve => require(['../views/assetContract/contractQuery.vue'], resolve)
  //   },
  //   {
  //       path: '/orderQuery',
  //       name: 'orderQuery',
  //       meta: {
  //           title: '订单查询',
  //           icon: 'iconproject1'
  //       },
  //       component: resolve => require(['../views/assetOrder/orderQuery.vue'], resolve)
  //   },
  //   {
  //       path: '/invoiceQuery',
  //       name: 'invoiceQuery',
  //       meta: {
  //           title: '发票查询',
  //           icon: 'el-icon-s-order'
  //       },
  //       component: resolve => require(['../views/assetInvoice/invoiceQuery.vue'], resolve)
  //   },
  //   ]
  // },
  
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

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
    path: '/homePage/list',
    redirect:'/homePage/listContent',
    component: resolve => require(['../views/homePage/list.vue'], resolve),
    children: [
      {
        path: '/homePage/listContent',
        name: 'homePageDetail',
        component: resolve => require(['../views/homePage/listContent.vue'], resolve)
      },
      {
        path: '/homePage/detail',
        name: 'homePageDetail',
        component: resolve => require(['../views/homePage/detail.vue'], resolve)
      },
    ]
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
          {
            path: '/homes/projectInfo',
            name: 'projectInfo',
            meta: {
                title: '项目信息',
                icon: 'iconproject1'
            },
            component: resolve => require(['../views/projectInfo/index.vue'], resolve)
        },
        {
              path: '/homes/procurementPlan2',
              name: 'procurementPlan2',
              meta: {
                  title: '采购计划',
                  icon: 'iconproject1'
              },
              component: resolve => require(['../views/procurementPlan2/index.vue'], resolve)
        },
        {
              path: '/homes/salesInfo',
              name: 'salesInfo',
              meta: {
                  title: '销售信息',
                  icon: 'iconproject1'
              },
              component: resolve => require(['../views/salesInfo/index.vue'], resolve)
        },
        {
              path: '/manage/materielManage',
              name: 'materielManage',
              meta: {
                  title: '物料管理',
                  icon: 'iconproject1'
              },
              component: resolve => require(['../views/basicData/materielManage/index.vue'], resolve)
        },
        {
              path: '/manage/onlinePriceCity',
              name: 'onlinePriceCity',
              meta: {
                  title: '网价城市',
                  icon: 'iconproject1'
              },
              component: resolve => require(['../views/basicData/onlinePriceCity/index.vue'], resolve)
        },
        {
              path: '/manage/departmentInfo',
              name: 'departmentInfo',
              meta: {
                  title: '部门信息',
                  icon: 'iconproject1'
              },
              component: resolve => require(['../views/basicData/departmentInfo/index.vue'], resolve)
        },
        {
              path: '/manage/warehouseInfo',
              name: 'warehouseInfo',
              meta: {
                  title: '仓库信息',
                  icon: 'iconproject1'
              },
              component: resolve => require(['../views/basicData/warehouseInfo/index.vue'], resolve)
        },
          {
              path: '/manage/noticeManage',
              name: 'noticeManage',
              meta: {
                  title: '公告管理',
                  icon: 'iconproject1'
              },
              component: resolve => require(['../views/noticeManage/index.vue'], resolve)
        },
        
        ]
      },
      // 公共信息模块 publicInfoModel
      {
        path: '/publicInfoModel',
        component: resolve =>require(['../views/Home.vue'], resolve),
        children:[
          {
            path: '/publicInfoModel/personalInfo',
            name: 'personalInfo',
            meta: {
                title: '个人信息',
                icon: 'iconproject1'
            },
            component: resolve => require(['../views/personalInfo/index.vue'], resolve)
          },
          {
                path: '/publicInfoModel/enterpriseAgreement',
                name: 'enterpriseAgreement',
                meta: {
                    title: '企业协议',
                    icon: 'iconproject1'
                },
                component: resolve => require(['../views/enterpriseAgreement/index.vue'], resolve)
          },
          {
                path: '/publicInfoModel/mail',
                name: 'mail',
                meta: {
                    title: '站内信',
                    icon: 'iconproject1'
                },
                component: resolve => require(['../views/mail/index.vue'], resolve)
          },
          {
              path: '/publicInfoModel/projectInfo',
              name: 'projectInfo',
              meta: {
                  title: '项目信息',
                  icon: 'iconproject1'
              },
              component: resolve => require(['../views/projectInfo2/index.vue'], resolve)
          },
          {
                path: '/publicInfoModel/procurementPlan',
                name: 'procurementPlan',
                meta: {
                    title: '采购计划',
                    icon: 'iconproject1'
                },
                component: resolve => require(['../views/procurementPlan/index.vue'], resolve)
          },
          {
            path: '/publicInfoModel/salesInfo',
            name: 'salesInfo',
            meta: {
                title: '销售信息',
                icon: 'iconproject1'
            },
            component: resolve => require(['../views/salesInfo2/index.vue'], resolve)
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
    if(path.indexOf('/homePage') !== -1){
      next()
      return;
    }
  }
});
export default router;
/* eslint-enable */

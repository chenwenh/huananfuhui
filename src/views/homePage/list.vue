<template>
    <div class="pagelist__box">
      <div class="top">
        <img class="pageHome__img" src="../../../public/static/images/pageHomeList.png" alt="位图">
        <!-- 内容 -->
        <div class="center__box">
          <div class="center">
            <!-- 返回 breadcrumb -->
            <div class='title'>
              <span @click="back">返回</span>
              <img src="../../../public/static/images/location.png" alt="">
              <breadcrumb :breadcrumbList="breadcrumbs"/>
            </div>
            <router-view></router-view>
          </div>
        </div>
      </div>
      <!-- 底部 -->
      <div class="footer">
        <div>
            <span class="left">©华南富汇智慧供应链平台 All Rights Reserved. </span>                                                                                                                              
            <span class="right">京ICP证120829号    京ICP备 12032080号-2    京公网安备11010802017204号</span>
        </div>
      </div>
    </div>
</template>

<script>
import breadcrumb from '@/components/breadcrumb.vue';

export default {
  data() {
    return {
      breadcrumbs: []
    }
  },
  components: {
    breadcrumb
  },
  watch: {
    $route() {
      this.getBreadCrumbs();
    }
  },
  created() {
    this.getBreadCrumbs();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 获取breadCrumbs 展示
    getBreadCrumbs() {
      if (this.$route.path === '/homePage/listContent') {
        if (this.$route.query.type === 'project') {
          this.breadcrumbs = ['首页', '项目信息列表'];
        }
        if (this.$route.query.type === 'buy') {
          this.breadcrumbs = ['首页', '采购计划'];
        }
        if (this.$route.query.type === 'sell') {
          this.breadcrumbs = ['首页', '销售信息'];
        }
      }
      if (this.$route.path === '/homePage/detail') {
        if (this.$route.query.type === 'project') {
          this.breadcrumbs = ['首页', '项目信息列表', '项目详情'];
        }
        if (this.$route.query.type === 'buy') {
          this.breadcrumbs = ['首页', '采购计划', '采购计划详情'];
        }
        if (this.$route.query.type === 'sell') {
          this.breadcrumbs = ['首页', '销售信息', '销售详情'];
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .pagelist__box {
    position:relative;
    min-height: calc(100% - 140px);
    background-color: #F7F7F7;
  }
  .pageHome__img {
    width: 100%;
    display: block;
  }
  // 内容
  .center__box {
    background: #F7F7F7;
    // padding: 30px 370px;
    width:1200px;
    margin:0 auto;
    .center {
      background-color: #FFFFFF;
      height: auto;
      padding: 15px 90px 30px;
      //  头部
      .title {
        display: flex;
        align-items: center;
        span, img {
          line-height: 44px;
        }
        span {
          cursor: pointer;
          margin-top: 10px;
          font-size: 14px;
          color: #333333;
          text-decoration: underline;
          font-weight: 700;
        }
        img {
          display: block;
          width: 20px;
          height: 20px;
          margin: 10px 5px 0 20px;
        }
      }
    } 
  }
  // 底部
  .footer{
    position: absolute;
    width: 100%;
    bottom: -60px;
    background: #524A44;
    height:60px;
    line-height:60px;
  }
  .footer div{
      width:1200px;
      margin:0 auto;
      color: #FFFFFF;
      font-size: 12px;
  }
  // 组件样式调整
  .el-breadcrumb /deep/.el-breadcrumb__item .el-breadcrumb__inner{
    font-size: 14px !important;
  }
  .el-breadcrumb /deep/.el-breadcrumb__item:last-child span.el-breadcrumb__inner {
    color: #FD942C !important;
  }
</style>
<template>
  <div class="content">
    <div class="content__top">
        <p><span style="margin-right:10px;">项目名称:</span>{{detail.title}}</p>
        <p>
          <span>{{detail.status}}</span>
          <span>{{detail.time}}</span>
        </p>
    </div>
    <div class="content__bottom">
      <p>{{detail.detail}}</p>
      <p><span>施工方:</span>{{detail.constructionParty}}</p>
      <p><span>城市:</span>{{detail.city}}</p>
      <p><span>钢材用量:</span>{{detail.steel}}</p>
      <p><span>工期:</span>{{detail.schedule}}</p>
      <p><span>回款周期:</span>{{detail.accountsReceipt}}</p>
      <p><span>发布周期:</span>{{detail.release}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataId: null,
      detail: {
          id: 1,
          title: '无锡中恒制药医药器材采购项目',
          detail: '萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附。',
          time: '2018-06-24',
          status: '发布中',
          city: '北京市',
          constructionParty: '北京市铁建一局',
          steel: '1989-06-12',
          schedule: '24周',
          accountsReceipt: 12,
          release: 12
      }
    }
  },
  created() {
    this.dataId = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    // 获取详情
    getDetail() {

    }
  }
}
</script>

<style lang="less" scoped>
  // 内容
  .content {
    // 头部
    .content__top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 33px 0;
      p:nth-of-type(1){
        font-size: 24px;
        color: #333;
        font-weight: 600;
      }
      p:nth-of-type(2){
        font-size: 14px;
        span:nth-of-type(1) {
          color: #FD992F;
          margin-right: 30px;
        }
        span:nth-of-type(2) {
          color: #BDBDBD;
        }
      }
    }
    //
    .content__bottom {
      p {
        margin-bottom: 12px;
        line-height: 18px;
        font-size: 12px;
        color: #666666;
        span {
          display: inline-block;
          width: 68px;
        }
      }
    }
  }
</style>
<template>
  <div>
    <!-- 项目标题 -->
    <div class="project__title">
      <img src="../../../public/static/images/projectLogo.png" alt="">
      <span v-show="$route.query.type === 'project'">项目信息</span>
      <span v-show="$route.query.type === 'buy'">采购计划</span>
      <span v-show="$route.query.type === 'sell'">销售信息</span>
    </div>
    <!-- 内容 -->
    <div class="content" v-for="(item, index) in list" :key="index">
      <div class="content__top">
        <p><span style="margin-right:10px;">项目名称:</span>{{item.title}}</p>
        <p>
          <span>{{item.status}}</span>
          <span>{{item.time}}</span>
        </p>
      </div>
      <p class="content__detail" @click="toDetail(item.id)">{{item.detail}}</p>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next, slot, sizes, total"
        :total="total">
        <span class="text">每页显示</span>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      list: [
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
      ]
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.total = this.list.length
    },
    toDetail(id) {
      this.$router.push({
        path: '/homePage/detail',
        query: {
          type: this.$route.query.type,
          id: id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .project__title {
    padding: 10px 0 20px;
    border-bottom: 1px solid #DEDEDE;
    display: flex;
    align-items: center;
    span {
      font-size: 24px;
      color: #333333;
      line-height: 24px;
      padding-left: 20px;
      font-weight: 700;
    }
  }
  // 内容
  .content {
    height: 112px;
    padding: 20px 0;
    border-bottom: 1px solid #DEDEDE;
    .content__top {
      display: flex;
      justify-content: space-between;
      padding-bottom: 16px;
      p:nth-of-type(1){
        font-size: 16px;
        color: #555555;
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
    .content__detail {
      cursor: pointer;
      word-break:break-all;
      text-overflow:ellipsis;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
      overflow:hidden;
    }
  }
</style>
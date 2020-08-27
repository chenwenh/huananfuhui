<template>
  <div>
    <!-- 项目标题 -->
    <div class="project__title">
      <img  v-show="$route.query.type === 'project'" src="../../../public/static/images/projectLogo.png" alt="">
      <img  v-show="$route.query.type === 'purchase'" src="../../../public/static/images/buyLogo.png" alt="">
      <img  v-show="$route.query.type === 'sell'" src="../../../public/static/images/sellLogo.png" alt="">
      <span v-show="$route.query.type === 'project'">项目信息</span>
      <span v-show="$route.query.type === 'purchase'">采购计划</span>
      <span v-show="$route.query.type === 'sell'">销售信息</span>
    </div>
    <!-- 内容 -->
    <div class="content" v-for="(item, index) in list" :key="index">
      <div class="content__top">
        <p><span style="margin-right:10px;">项目名称:</span>{{item.title}}</p>
        <p>
          <span>{{$appConst.publishStatus[item.publishStatus]}}</span>
          <span>{{item.publishDate}}</span>
        </p>
      </div>
      <p class="content__detail" @click="toDetail(item.id)">{{item.content}}</p>
    </div>
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
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
      currentPage:1,
      pageSize:10,
      total: 0,
      list: [
        // {
        //   id: 1,
        //   title: '无锡中恒制药医药器材采购项目',
        //   detail: '萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附。',
        //   time: '2018-06-24',
        //   status: '发布中',
        //   city: '北京市',
        //   constructionParty: '北京市铁建一局',
        //   steel: '1989-06-12',
        //   schedule: '24周',
        //   accountsReceipt: 12,
        //   release: 12
        // },
        // {
        //   id: 1,
        //   title: '无锡中恒制药医药器材采购项目',
        //   detail: '萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附。',
        //   time: '2018-06-24',
        //   status: '发布中',
        //   city: '北京市',
        //   constructionParty: '北京市铁建一局',
        //   steel: '1989-06-12',
        //   schedule: '24周',
        //   accountsReceipt: 12,
        //   release: 12
        // },
        // {
        //   id: 1,
        //   title: '无锡中恒制药医药器材采购项目',
        //   detail: '萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附。',
        //   time: '2018-06-24',
        //   status: '发布中',
        //   city: '北京市',
        //   constructionParty: '北京市铁建一局',
        //   steel: '1989-06-12',
        //   schedule: '24周',
        //   accountsReceipt: 12,
        //   release: 12
        // },
        // {
        //   id: 1,
        //   title: '无锡中恒制药医药器材采购项目',
        //   detail: '萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附。',
        //   time: '2018-06-24',
        //   status: '发布中',
        //   city: '北京市',
        //   constructionParty: '北京市铁建一局',
        //   steel: '1989-06-12',
        //   schedule: '24周',
        //   accountsReceipt: 12,
        //   release: 12
        // },
        // {
        //   id: 1,
        //   title: '无锡中恒制药医药器材采购项目',
        //   detail: '萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附。',
        //   time: '2018-06-24',
        //   status: '发布中',
        //   city: '北京市',
        //   constructionParty: '北京市铁建一局',
        //   steel: '1989-06-12',
        //   schedule: '24周',
        //   accountsReceipt: 12,
        //   release: 12
        // },
        // {
        //   id: 1,
        //   title: '无锡中恒制药医药器材采购项目',
        //   detail: '萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附。',
        //   time: '2018-06-24',
        //   status: '发布中',
        //   city: '北京市',
        //   constructionParty: '北京市铁建一局',
        //   steel: '1989-06-12',
        //   schedule: '24周',
        //   accountsReceipt: 12,
        //   release: 12
        // },
        // {
        //   id: 1,
        //   title: '无锡中恒制药医药器材采购项目',
        //   detail: '萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附。',
        //   time: '2018-06-24',
        //   status: '发布中',
        //   city: '北京市',
        //   constructionParty: '北京市铁建一局',
        //   steel: '1989-06-12',
        //   schedule: '24周',
        //   accountsReceipt: 12,
        //   release: 12
        // }
      ]
    }
  },
  created() {
    // this.getData();
    this.query();
  },
  methods: {
    // getData() {
    //   this.total = this.list.length;
    //   this.query();
    // },
     handleSizeChange(val) {
      this.pageSize = val;
      this.query();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.query();
    },
    query(){
        const params = {
            page: this.currentPage,
            pageSize: this.pageSize
        };
        var type = this.$route.query.type;
        var url = "";
        if(type=='project'){
          url = this.$apiUrl.project.queryTitle;
        }else if(type=='purchase'){
          url = this.$apiUrl.purchase.queryTitle;
        }else{
          url = this.$apiUrl.salesInfo.queryTitle;
        }
        // 获取意向申请列表
        this.$http.get(url,{params})
            .then(res => {
            if (res.data.status !== 200) return;
                this.list = res.data.data.content;
                this.total = res.data.data.totalElements;
            }).catch(err => {
                this.$message.warning(err.data.message || '服务器错误，请稍后再试!');
            });
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
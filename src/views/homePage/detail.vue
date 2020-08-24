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
      <!-- <p><span>施工方:</span>{{detail.constructionParty}}</p>
      <p><span>城市:</span>{{detail.city}}</p>
      <p><span>钢材用量:</span>{{detail.steel}}</p>
      <p><span>工期:</span>{{detail.schedule}}</p>
      <p><span>回款周期:</span>{{detail.accountsReceipt}}</p>
      <p><span>发布周期:</span>{{detail.release}}</p> -->
      <p v-for="(value,key) in formItem" :key="key">
        <span>{{value}}:</span>
        <span v-if="key=='publishStatus'">{{$appConst.publishStatus[detail[key]]}}</span>
        <span v-else>{{detail[key]}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataId: null,
      type:'',
      formItem:{},
      projectForm:{
        city: "城市",
        addr: "项目地址",
        agent: "经办人",
        constructionParty: "施工方",
        agentPhone:"经办人联系方式",
        receiver:"签收人",
        receiverPhone:"签收人电话",
        publishDate:"发布日期",
        duration:"工期（月）",
        periodPayment:"回款周期",
        trustedClient:"受托客户",
        steelConsumption:"钢铁用量(吨)",
        publishStatus:'发布状态'
      },
      purchaseForm:{
          planNo: "计划编号",
          projectName: "项目名称",
          endDate: "截止日期",
          department: "部门",
          createTime: "发布日期",
          publishStatus: "发布状态"
      },
      salesForm:{
        endDate: "截止日期",
        publishStatus: "发布状态"
      },
      detail: {
          // id: 1,
          // title: '无锡中恒制药医药器材采购项目',
          // detail: '萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附。',
          // time: '2018-06-24',
          // status: '发布中',
          // city: '北京市',
          // constructionParty: '北京市铁建一局',
          // steel: '1989-06-12',
          // schedule: '24周',
          // accountsReceipt: 12,
          // release: 12
      }
    }
  },
  created() {
    this.dataId = this.$route.query.id;
    this.type = this.$route.query.type;
    this.getDetail(this.dataId,this.type);
  },
  methods: {
    // 获取详情
    getDetail(id,type) {
        var type = this.$route.query.type;
        var url = "";
        if(type=='project'){
          url = this.$apiUrl.project.findById;
          this.formItem = Object.assign({},this.projectForm);
        }else if(type=='buy'){
          url = this.$apiUrl.purchase.findById;
        }else{
          url = this.$apiUrl.salesInfo.findById;
        }
        // 获取意向申请列表
        this.$http.get(`${url}${id}`)
            .then(res => {
            if (res.data.status !== 200) return;
                this.detail = res.data.data;
            }).catch(err => {
                this.$message.warning(err.data.message || '服务器错误，请稍后再试!');
            });
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
          width: 130px;
        }
      }
    }
  }
</style>
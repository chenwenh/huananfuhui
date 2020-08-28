<template>
    <div>
      <div v-show="firstShow">
        <breadcrumb :breadcrumbList="breadcrumbs"/>
         <el-input
            placeholder="输入关键字进行搜索"
            v-model="searchValue" style="width:300px;" class="search" @keyup.enter.native="search">
            <i slot="suffix" class="el-input__icon el-icon-search" style="margin-top:-4px;"></i>
        </el-input>
        <!-- <el-button type="primary" @click="search" size="medium" style="margin-left:20px;"  class="radiusNone">搜索</el-button> -->
        <el-button type="primary" @click="addPlan" size="medium" style="margin-left:20px;float:right;" class="radiusNone">新建</el-button>
        <!-- 表格 -->
        <Table
              ref="tableRef"
              :mainTable="mainTable"
              :selected="false"
              :loading="loading"
              :pageSize="pageSize"
              :totalCount="totalCount"
              @rowClick="rowClick"
              @handleSizeChange = "handleSizeChange"
              @handleCurrentChange="handleCurrentChange"
              :showPagination="true">
        </Table>
      </div>
         <!-- 明细 -->
        <dialogCommonComponent ref="dialogCommonComponent3" title="明细" width="50%">
            <goodsDetail ref="goodsDetail"></goodsDetail>
        </dialogCommonComponent>
    </div>
</template>

<script>
import Table from '@/components/Table.vue';
import breadcrumb from '@/components/breadcrumb.vue';
import dialogCommonComponent from '@/components/dialogCommonComponent';
import goodsDetail from './../procurementPlan/goodsDetail';

export default {
  name: '',
  data() {
    return {
      title:'',
      loading:false,
      firstShow:true,
      purchaseNoticeShow:false,
      searchValue:"",
      breadcrumbs:["信息公示","项目信息"],
      breadcrumbs2:["采购计划",'新建采购通知'],
      drawer: false,
      direction: 'rtl',
      // 表格数据
      mainTable: {
        tableHeader: {
          endDate: "截止日期",
          publishStatus: "发布状态"
        },
        tableData: [
          
        ],
        tableWidth: {
          
        }
      },
      totalCount: 0, // 数据总数
      page: 1,
      pageSize: 10,
      loading: false,
      assetsList: []
    };
  },
  components: {
    Table,
    breadcrumb,
    dialogCommonComponent,
    goodsDetail
  },
  created() {
    this.search();
  },
  mounted(){
    var vm = this;
    this.$bus.$on('close',function(){
      vm.drawer = false;
    });
    this.$bus.$on('back',function(){
      vm.firstShow = true;
      vm.purchaseNoticeShow = false;
    });
  },
  methods: {
    // 明细
    rowClick(row){
      this.$refs.dialogCommonComponent3.show();
      var vm = this;
      this.$nextTick(()=>{
        vm.$refs.goodsDetail.init(row.goods);
      });
    },
    close(){
      this.$bus.$emit('closeDialog');
    },
    // 搜索
    search(searchData) {
      this.mainTable.tableData = [];
      this.loading = true;
      const params = {
        page: this.page,
        pageSize: this.pageSize
      };
      // 获取意向申请列表
      const url = `${this.$apiUrl.salesInfo.query}`;
      this.$http.get(url,{params})
        .then(res => {
          if (res.data.status !== 200) return;
          this.totalCount = res.data.data.totalElements;
          this.mainTable.tableData = res.data.data.content;
          this.loading = false;
        }).catch(err => {
          this.loading = false;
          this.$message.warning(err.message || '服务器错误，请稍后再试!');
        });
    },
    // 分页
    handleCurrentChange(currentPage) {
      this.page = currentPage;
      this.search();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.$refs.tableRef.resetCurrentPage();
      this.search();
    }
  }
};
</script>

<style lang="scss" scoped>
.approval__box{
  .search{
    height: 120px;
    margin-top: 50px;
  }
  .btn__search{
    bottom: -46px;
    right: 0;
  }
  .table_btn{
    margin: 5px;
  }
}
</style>

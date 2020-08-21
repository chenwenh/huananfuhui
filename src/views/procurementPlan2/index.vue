<template>
    <div>
      <div v-show="firstShow">
        <breadcrumb :breadcrumbList="breadcrumbs"/>
        <el-input
            placeholder="输入关键字进行搜索"
            v-model="searchValue" style="width:300px;" class="search">
            <i slot="prefix" class="el-input__icon el-icon-search" style="margin-top:-2px;"></i>
        </el-input><el-button type="primary" @click="search" size="medium" style="margin-left:20px;"  class="radiusNone">搜索</el-button>
        <el-button type="primary" @click="addPlan" size="medium" style="margin-left:20px;float:right;" class="radiusNone">新建采购计划</el-button>
        <!-- 表格 -->
        <Table
              ref="tableRef"
              :mainTable="mainTable"
              :selected="false"
              :loading="loading"
              :pageSize="pageSize"
              :totalCount="totalCount"
              @handleSizeChange = "handleSizeChange"
              @handleCurrentChange="handleCurrentChange"
              :showPagination="true">
              <!-- 操作 -->
              <el-table-column fixed="right"
                        label="操作" width="160px"
                        >
                  <template slot-scope="scope">
                    <el-button
                       v-if="scope.row.status =='未发布'"
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click.stop="publicPlan(scope.row)">
                        发布
                    </el-button>
                    <el-button
                        v-if="scope.row.status=='已发布'"
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click.stop="selectQuote(scope.row)">
                        选择报价
                    </el-button>
                     <el-button
                        v-if="scope.row.status=='已发布'"
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click.stop="purchaseNotice(scope.row)">
                        采购通知
                    </el-button>
                  </template>
              </el-table-column>
        </Table>
      </div>
        <!-- 添加 -->
        <dialogCommonComponent ref="dialogCommonComponent" title="新建采购计划" width="50%">
            <add ref="add"></add>
        </dialogCommonComponent>
        <!--发布 -->
        <dialogCommonComponent ref="dialogCommonComponent2" title="发布采购计划" width="50%">
            <publicPlan ref="publicPlan"></publicPlan>
        </dialogCommonComponent>
        <el-drawer
          title="选择报价"
          :visible.sync="drawer"
          :direction="direction"
          size="50%"
          style="overflow:auto;"
          >
          <quotePrice ref="quotePrice"></quotePrice>
        </el-drawer>
        <div v-show="purchaseNoticeShow">
            <breadcrumb :breadcrumbList="breadcrumbs2" style="background:white;"/>
            <purchaseNotice ref="purchaseNotice"></purchaseNotice>
        </div>
    </div>
</template>

<script>
import Table from '@/components/Table.vue';
import breadcrumb from '@/components/breadcrumb.vue';
import dialogCommonComponent from '@/components/dialogCommonComponent';
import add from './add.vue';
import publicPlan from './publicPlan.vue';
import quotePrice from './quotePrice.vue';
import purchaseNotice from './purchaseNotice';
import { mapGetters } from 'vuex'

export default {
  name: '',
  data() {
    return {
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
          name: "计划编号",
          entityNo: "项目名称",
          orderAmount1: "截止日期",
          buyer: "部门",
          seller: "发布日期",
          status: "发布状态"
        },
        tableData: [
          {
            name: "计划编号",
            entityNo: "项目名称",
            orderAmount1: "截止日期",
            buyer: "部门",
            seller: "发布日期",
            status: "未发布"
          },
          {
            name: "计划编号",
            entityNo: "项目名称",
            orderAmount1: "截止日期",
            buyer: "部门",
            seller: "发布日期",
            status: "已发布"
          },
        ],
        tableWidth: {
          
        }
      },
      totalCount: 6, // 数据总数
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
    add,
    publicPlan,
    quotePrice,
    purchaseNotice
  },
  created() {
    // this.search();
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
    // 新建采购计划
    addPlan(){
        this.$refs.dialogCommonComponent.show();
        this.$nextTick(()=>{
            this.$refs.add.resetForm();
            this.$bus.$emit('initForm');
        });
    },
    // 新建采购通知
    purchaseNotice(){
      this.firstShow = false;
      this.purchaseNoticeShow = true;
    },
    // 发布
    publicPlan(){
      this.$refs.dialogCommonComponent2.show();
    },
    // 选择报价
    selectQuote(){
      this.drawer = true;
    },
    close(){
      this.$bus.$emit('closeDialog');
    },
    // 搜索
    search(searchData) {
      this.mainTable.tableData = [];
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        orgId:'6badcc0a-0288-409e-b458-58276e801711',//sessionStorage.getItem('orgId'),
        assetType:'TRADEORDER',
        sortDirection: 'DESC'
      };
      // 获取意向申请列表
      const url = `${this.$apiUrl.queryContract}`;
      this.$http.post(url,params)
        .then(res => {
          if (res.data.status !== 200) return;
          this.totalCount = res.data.data.totalElements;
          this.mainTable.tableData = res.data.data.content;
        }).catch(err => {
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

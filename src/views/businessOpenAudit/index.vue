<template>
    <div>
       <breadcrumb :breadcrumbList="breadcrumbs"/>
        <!-- 表格 -->
         <el-input
            placeholder="输入关键字进行搜索"
            v-model="searchValue" style="width:300px;" class="search" @keyup.enter.native="search">
            <i slot="suffix" class="el-input__icon el-icon-search" style="margin-top:-4px;"></i>
        </el-input>
        <!-- <el-button type="primary" @click="search(searchValue)" size="medium" style="margin-left:20px;"  class="radiusNone">搜索</el-button> -->
        <Table
              ref="tableRef"
              :mainTable="mainTable"
              :selected="false"
              :loading="loading"
              :pageSize="pageSize"
              :totalCount="totalCount"
              @handleSizeChange = "handleSizeChange"
              @handleCurrentChange="handleCurrentChange"
              @rowClick="rowClick"
              :showPagination="true">
              <!-- 操作 -->
              <el-table-column fixed="right" width="200px"
                        label="操作"
                        >
                  <template slot-scope="scope">
                    <el-button
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click.stop="audit(scope.row)">
                        审核
                    </el-button>
                     <el-button
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click.stop="signAggreement(scope.row, 'FRAMEWORK_AGREEMENTS')">
                        签署年度框架协议
                    </el-button>
                    <el-button
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click.stop="signAggreement(scope.row, 'SERVER_AGREEMENTS')">
                        签署服务协议
                    </el-button>
                  </template>
              </el-table-column>
        </Table>
        <!-- 审核 -->
        <dialogCommonComponent ref="dialogCommonComponent" title="审核" width="50%">
            <auditDetail ref="auditDetail" :detailInfo="detailInfo" @search='search(searchValue)'></auditDetail>
        </dialogCommonComponent>
        <!-- 详情 -->
        <dialogCommonComponent ref="dialogCommonComponent2" title="详情" width="600px">
            <detail ref="detail" :detailInfo="detailInfo" closeButton=true></detail>
        </dialogCommonComponent>
          <!-- 添加 -->
        <dialogCommonComponent ref="dialogCommonComponent3" title="签署协议" width="50%">
            <add ref="add" :fromAudit="true"></add>
        </dialogCommonComponent>
    </div>
</template>

<script>
import Table from '@/components/Table.vue';
import breadcrumb from '@/components/breadcrumb.vue';
import dialogCommonComponent from '@/components/dialogCommonComponent';
import add from '@/views/agreementMaintenance/add.vue';
import auditDetail from './auditDetail.vue';
import detail from '@/components/detail.vue';

export default {
  name: '',
  data() {
    return {
      detailInfo:{
          name: "企业名称",
          entityNo: "统一社会信用代码",
          contractContent: "开通业务",
          buzType1: "申请日期",
          cType1: "开通状态",
      },
      searchValue:"",
      breadcrumbs:["协议管理","业务开通审核"],
      // 表格数据
      mainTable: {
        tableHeader: {
          name: "企业名称",
          entityNo: "统一社会信用代码",
          contractContent: "开通业务",
          buzType1: "申请日期",
          cType1: "开通状态",
          buyer: "拒绝原因",
        },
        tableData: [
           {
            name: "企业名称",
            entityNo: "统一社会信用代码",
            contractContent: "开通业务",
            buzType1: "申请日期",
            cType1: "开通状态",
            buyer: "拒绝原因",
          },
          {
            name: "企业名称",
            entityNo: "统一社会信用代码",
            contractContent: "开通业务",
            buzType1: "申请日期",
            cType1: "开通状态",
            buyer: "拒绝原因",
          },
          {
            name: "企业名称",
            entityNo: "统一社会信用代码",
            contractContent: "开通业务",
            buzType1: "申请日期",
            cType1: "开通状态",
            buyer: "拒绝原因",
          }
        ],
        tableWidth: {
        }
      },
      totalCount: 3, // 数据总数
      page: 1,
      pageSize: 10,
      loading: false,
    };
  },
  components: {
    Table,
    breadcrumb,
    dialogCommonComponent,
    add,
    detail,
    auditDetail
  },
  computed: {
  },
  watch: {
    
  },
  created() {
    this.search();
  },
  methods: {
    rowClick(row){
      this.$refs.dialogCommonComponent2.show();
       this.$nextTick(()=>{
          this.$refs.detail.init(row);
       });
    },
    audit(row) {
       this.$refs.dialogCommonComponent.show();
       this.$nextTick(()=>{
          this.$refs.auditDetail.init(row);
       });
    },
    signAggreement(row, templateType) {
       this.$refs.dialogCommonComponent3.show();
       this.$nextTick(()=>{
          this.$refs.add.init(row, templateType);
       });
    },
    // 搜索
    search(searchData) {
      // this.mainTable.tableData = [];
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        sortDirection: 'DESC'
      };
      if (this.searchValue !== '') {

      }
      // 获取意向申请列表
      const url = `${this.$apiUrl.serviceFulfillment.query}`;
      this.$http.post(url,params)
        .then(res => {
          if (res.data.status !== 200) return;
          this.totalCount = res.data.data.totalElements;
          // this.mainTable.tableData = res.data.data.content;
        }).catch(err => {
          this.$message.warning(err.message || '服务器错误，请稍后再试!');
        });
    },
    // 分页
    handleCurrentChange(currentPage) {
      this.page = currentPage;
      this.search(this.searchValue);
    },
    handleSizeChange(size){
      this.pageSize = size;
      this.page = 1;
      this.$refs.tableRef.resetCurrentPage();
      this.search(this.searchValue);
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

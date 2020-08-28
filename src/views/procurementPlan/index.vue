<template>
<div>
    <div v-show="firstStep">
         <breadcrumb :breadcrumbList="breadcrumbs"/>
         <el-input
            placeholder="输入关键字进行搜索"
            v-model="searchValue" style="width:300px;" class="search" @keyup.enter.native="search">
            <i slot="suffix" class="el-input__icon el-icon-search" style="margin-top:-4px;"></i>
        </el-input>
        <!-- <el-button type="primary" @click="search" size="medium" style="margin-left:20px;"  class="radiusNone">搜索</el-button> -->
        <div style="float:right;" class="tab">
          <span :class="{'active':currentTab=='first'}" @click="currentTab='first'">计划列表</span>
          <span :class="{'active':currentTab=='second'}" @click="currentTab='second'">我的报价</span>
        </div>
        <!-- 表格 -->
        <!-- 计划列表模块 -->
        <Table
              v-show="currentTab=='first'"
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
                        label="操作" width="150px"
                        >
                  <template slot-scope="scope">
                    <el-button
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click.stop="detail(scope.row)">
                        明细
                    </el-button>
                    <el-button
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click.stop="quotePrice(scope.row)">
                        报价
                    </el-button>
                  </template>
              </el-table-column>
        </Table>
        <!-- 我的报价模块 -->
        <Table
              v-show="currentTab=='second'"
              ref="tableRef2"
              :mainTable="mainTable2"
              :selected="false"
              :loading="loading2"
              :pageSize="pageSize2"
              :totalCount="totalCount2"
              @handleSizeChange = "handleSizeChange2"
              @handleCurrentChange="handleCurrentChange2"
              :showPagination="true">
        </Table>
    </div>
    <div v-show="quoteStep">
        <breadcrumb :breadcrumbList="breadcrumbs2"/>
        <quotePrice ref="quotePrice"></quotePrice>
    </div>
      <!-- 详情 -->
      <dialogCommonComponent ref="dialogCommonComponent" title="明细" width="50%">
          <goodsDetail ref="goodsDetail"></goodsDetail>
      </dialogCommonComponent>
</div>
</template>

<script>
import Table from '@/components/Table.vue';
import breadcrumb from '@/components/breadcrumb.vue';
import dialogCommonComponent from '@/components/dialogCommonComponent';
import goodsDetail from './goodsDetail';
import quotePrice from './quotePrice.vue';
import { mapGetters } from 'vuex'

export default {
  name: '',
  data() {
    return {
      loading:false,
      firstStep:true,
      quoteStep:false,
      currentTab:'first',
      searchValue:"",
      breadcrumbs:["信息公示","采购计划"],
      breadcrumbs2:["采购计划","报价"],
      // 表格数据
      mainTable: {
        tableHeader: {
          planNo: "计划编号",
          projectName: "项目名称",
          endDate: "截止日期",
          department: "部门",
          createTime: "发布日期",
          publishStatus: "发布状态"
        },
        tableData: [
        ],
        tableWidth: {
          
        }
      },
      totalCount: 6, // 数据总数
      page: 1,
      pageSize: 10,
      loading: false,
      assetsList: [],
      mainTable2: {
        tableHeader: {
          planNo: "计划编号",
          projectName: "项目名称",
          endDate: "截止日期",
          department: "部门",
          createTime: "发布日期",
          publishStatus: "发布状态"
        },
        tableData: [

        ],
        tableWidth: {
          
        }
      },
      totalCount2: 0, // 数据总数
      page2: 1,
      pageSize2: 10,
      loading2: false,
    };
  },
  components: {
    Table,
    breadcrumb,
    quotePrice,
    dialogCommonComponent,
    goodsDetail
  },
  created() {
    this.search();
  },
  mounted(){
    var vm = this;
    this.$bus.$on('firstStep',function(){
      vm.firstStep = true;
      vm.quoteStep = false;
    })
  },
  methods: {
    detail(row){
      this.$refs.dialogCommonComponent.show();
      var vm = this;
      this.$nextTick(()=>{
        vm.$refs.goodsDetail.init(row.goods);
      });
    },
    quotePrice(){
      this.firstStep = false;
      this.quoteStep = true;
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
      const url = `${this.$apiUrl.purchase.query}`;
      this.$http.get(url,{params})
        .then(res => {
          if (res.data.status !== 200) return;
          this.totalCount = res.data.data.totalElements;
          this.mainTable.tableData = res.data.data.content;
          this.mainTable.tableData.map(item=>{
            item.projectName = item.projectInfo.title;
          });
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
    },
    // 分页
    handleCurrentChange2(currentPage) {
      this.page2 = currentPage;
      this.search();
    },
    handleSizeChange2(size) {
      this.pageSize2 = size;
      this.page2 = 1;
      this.$refs.tableRef2.resetCurrentPage();
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
.tab span{
  width:107px;
  height: 34px;
  display: inline-block;
  border: 1px solid #CFCFCF;
  text-align: center;
  line-height: 34px;
  cursor: pointer;
}
.tab span.active{
  color:#9E6B23;
  border: 1px solid #FDB636;
  border-radius: 2px 0 0 2px;
}
</style>

<template>
    <div>
      <div v-show="firstShow">
        <breadcrumb :breadcrumbList="breadcrumbs"/>
        <el-input
            placeholder="输入关键字进行搜索"
            v-model="searchValue" style="width:300px;" class="search">
            <i slot="prefix" class="el-input__icon el-icon-search" style="margin-top:-2px;"></i>
        </el-input><el-button type="primary" @click="search" size="medium" style="margin-left:20px;"  class="radiusNone">搜索</el-button>
        <el-button type="primary" @click="addPlan" size="medium" style="margin-left:20px;float:right;" class="radiusNone">新建</el-button>
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
                        label="操作" width="200px"
                        >
                  <template slot-scope="scope">
                    <el-button
                       v-if="scope.row.publishStatus =='NO_PUBLISH'"
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click.stop="publicPlan(scope.row)">
                        发布
                    </el-button>
                    <el-button
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click.stop="deletePurchase(scope.row)">
                        删除
                    </el-button>
                    <el-button
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click.stop="updatePurchase(scope.row)">
                        修改
                    </el-button>
                  </template>
              </el-table-column>
        </Table>
      </div>
        <!-- 添加 -->
        <dialogCommonComponent ref="dialogCommonComponent" :title="title" width="50%">
            <add ref="add" @search="search"></add>
        </dialogCommonComponent>
        <!--发布 -->
        <dialogCommonComponent ref="dialogCommonComponent2" title="发布采购计划" width="50%">
            <publicPlan ref="publicPlan" @search="search"></publicPlan>
        </dialogCommonComponent>
    </div>
</template>

<script>
import Table from '@/components/Table.vue';
import breadcrumb from '@/components/breadcrumb.vue';
import dialogCommonComponent from '@/components/dialogCommonComponent';
import add from './add.vue';
import publicPlan from './publicPlan.vue';
import { mapGetters } from 'vuex'

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
    publicPlan
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
    // 新建
    addPlan(){
        this.$refs.dialogCommonComponent.show();
        this.$nextTick(()=>{
            this.$refs.add.resetForm();
            this.$bus.$emit('initForm');
            this.$refs.add.init(true);
            this.title = '新建销售信息';
        });
    },
    // 修改采购计划
    updatePurchase(row){
      this.$refs.dialogCommonComponent.show();
        this.$nextTick(()=>{
            this.$refs.add.resetForm();
            this.$bus.$emit('initForm');
            this.$refs.add.init(false,row);
            this.title = '修改销售信息';
        });
    },
    deletePurchase(row){
      var vm = this;
      this.$confirm('请确认要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'tipsInfo',
          type: 'text'
        }).then(() => {
          vm.$http.delete(`${vm.$apiUrl.salesInfo.delete}/${row.id}`)
          .then(res=>{
              if(res.data.status == vm.$appConst.status){
                  vm.$message.success('删除成功');
                  vm.search();
              }
          }).catch(err=>{
              vm.$message.error(err.data.message);
          })
        }).catch(() => {
        });
    },
    // 发布
    publicPlan(row){
      this.$refs.dialogCommonComponent2.show();
      var vm = this;
      this.$nextTick(()=>{
        vm.$refs.publicPlan.init(row);
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

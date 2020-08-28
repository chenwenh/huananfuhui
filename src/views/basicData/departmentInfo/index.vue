<template>
    <div>
         <breadcrumb :breadcrumbList="breadcrumbs"/>
         <el-input
            placeholder="输入关键字进行搜索"
            v-model="searchValue" style="width:300px;" class="search" @keyup.enter.native="search">
            <i slot="suffix" class="el-input__icon el-icon-search" style="margin-top:-4px;"></i>
        </el-input>
        <!-- <el-button type="primary" @click="search" size="medium" style="margin-left:20px;"  class="radiusNone">搜索</el-button> -->
        <el-button type="primary" @click="addProject" size="medium" style="margin-left:20px;float:right;" class="radiusNone">新增</el-button>
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
                        label="操作" width="150px"
                        >
                  <template slot-scope="scope">
                     <el-button
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click.stop="deleteProject(scope.row)">
                        删除
                    </el-button>
                    <el-button
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click.stop="updateProject(scope.row)">
                        修改
                    </el-button>
                  </template>
              </el-table-column>
        </Table>
        <!-- 添加 -->
        <dialogCommonComponent ref="dialogCommonComponent" :title="title" width="50%">
            <add ref="add" @search="search"></add>
        </dialogCommonComponent>
    </div>
</template>

<script>
import Table from '@/components/Table.vue';
import dialogCommonComponent from '@/components/dialogCommonComponent';
import breadcrumb from '@/components/breadcrumb.vue';
import add from './add.vue';

export default {
  name: '',
  data() {
    return {
      title:"",
      searchValue:"",
      breadcrumbs:["信息公示","部门信息"],
      // 表格数据
      mainTable: {
        tableHeader: {
          breed: "部门"
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
    dialogCommonComponent,
    Table,
    breadcrumb,
    add
  },
  created() {
    this.search();
  },
  methods: {
    // 行点击
    rowClick(row){
      this.$refs.dialogCommonComponent2.show();
       this.$nextTick(()=>{
          this.$refs.detail.init(row);
       });
    },
    // 添加
    addProject(){
      this.$refs.dialogCommonComponent.show();
      this.$nextTick(()=>{
        this.$refs.add.resetForm();
        this.$refs.add.init(true);
        this.title = '新建';
      });
    },
    // 修改
    updateProject(row){
      this.$refs.dialogCommonComponent.show();
      this.$nextTick(()=>{
        this.$refs.add.resetForm();
        this.$refs.add.init(false,row);
        this.title = '修改';
      });
    },
    deleteProject(row){
      var vm = this;
      this.$confirm('请确认要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'tipsInfo',
          type: 'text'
        }).then(() => {
          vm.$http.delete(`${vm.$apiUrl.materiel.delete}/${row.id}`)
          .then(res=>{
              if(res.data.status == vm.$appConst.status){
                  vm.$message.success('删除成功');
                  vm.search();
              }
          }).catch(err=>{
              vm.$message.error(err.data.data);
          })
        }).catch(() => {
        });
    },
    close(){
      this.$bus.$emit('closeDialog');
    },
    // 搜索
    search(searchData) {
      this.loading = true;
      this.mainTable.tableData = [];
      const params = {
        page: this.page,
        pageSize: this.pageSize
      };
      // 获取意向申请列表
      const url = `${this.$apiUrl.materiel.query}`;
      this.$http.get(url,{params})
        .then(res => {
          if (res.data.status !== 200) return;
          this.totalCount = res.data.data.totalElements;
          this.mainTable.tableData = res.data.data.content;
          this.loading = false;
        }).catch(err => {
          this.loading = false;
          this.$message.warning(err.data.message || '服务器错误，请稍后再试!');
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

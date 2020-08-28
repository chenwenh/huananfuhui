<template>
    <div>
         <breadcrumb :breadcrumbList="breadcrumbs"/>
        <el-input
            placeholder="输入关键字进行搜索"
            v-model="searchValue" style="width:300px;" class="search">
            <i slot="prefix" class="el-input__icon el-icon-search" style="margin-top:-2px;"></i>
        </el-input><el-button type="primary" @click="search" size="medium" style="margin-left:20px;"  class="radiusNone">搜索</el-button>
        <el-button type="primary" @click="addProject" size="medium" style="margin-left:20px;float:right;" class="radiusNone">新建项目</el-button>
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
              @rowClick="rowClick"
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
                        v-if="scope.row.publishStatus == 'NO_PUBLISH'"
                        @click.stop="publicProject(scope.row)">
                        发布
                    </el-button>
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
                        v-if="scope.row.publishStatus == 'NO_PUBLISH'"
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
         <!-- 详情 -->
        <dialogCommonComponent ref="dialogCommonComponent2" title="详情" width="600px">
            <detail ref="detail" :detailInfo="detailInfo" closeButton=true></detail>
        </dialogCommonComponent>
    </div>
</template>

<script>
import Table from '@/components/Table.vue';
import dialogCommonComponent from '@/components/dialogCommonComponent';
import breadcrumb from '@/components/breadcrumb.vue';
import add from './add.vue';
import detail from '@/components/detail.vue';
import { mapGetters } from 'vuex'

export default {
  name: '',
  data() {
    return {
      title:"",
      detailInfo:{
          projectNo: "项目编号",
          title: "项目名称",
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
          publishStatus:'发布状态',
          content:'内容'
      },
      searchValue:"",
      breadcrumbs:["信息公示","项目信息"],
      // 表格数据
      mainTable: {
        tableHeader: {
          projectNo: "项目编号",
          title: "项目名称",
          constructionParty: "施工方",
          city: "城市",
          addr: "项目地址",
          agent: "经办人",
          publishStatus:'发布状态'
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
    add,
    detail
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
        this.title = '新建项目';
      });
    },
    // 修改
    updateProject(row){
      this.$refs.dialogCommonComponent.show();
      this.$nextTick(()=>{
        this.$refs.add.resetForm();
        this.$refs.add.init(false,row);
        this.title = '修改项目';
      });
    },
    // 发布
    publicProject(row){
      var vm = this;
      this.$confirm('请确认要发布吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'tipsInfo',
          type: 'text'
        }).then(() => {
          var params = {
            id:row.id,
            publishStatus:'PUBLISHED'
          };
          vm.$http.post(`${vm.$apiUrl.project.mergePublishStatus}`,params)
          .then(res=>{
              if(res.data.status == vm.$appConst.status){
                  vm.$message.success('发布成功');
                  vm.search();
              }
          }).catch(err=>{
              vm.$message.error(err.data.message);
          })
        }).catch(() => {
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
          vm.$http.delete(`${vm.$apiUrl.project.delete}/${row.id}`)
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
      const url = `${this.$apiUrl.project.query}`;
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

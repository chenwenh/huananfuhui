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
                        @click.stop="publicProject(scope.row)">
                        发布
                    </el-button>
                  </template>
              </el-table-column>
        </Table>
        <!-- 添加 -->
        <dialogCommonComponent ref="dialogCommonComponent" title="新建协议" width="50%">
            <add ref="add"></add>
        </dialogCommonComponent>
    </div>
</template>

<script>
import Table from '@/components/Table.vue';
import dialogCommonComponent from '@/components/dialogCommonComponent';
import breadcrumb from '@/components/breadcrumb.vue';
import add from './add.vue';
import { mapGetters } from 'vuex'

export default {
  name: '',
  data() {
    return {
      searchValue:"",
      breadcrumbs:["信息公示","项目信息"],
      // 表格数据
      mainTable: {
        tableHeader: {
          name: "项目编号",
          entityNo: "项目名称",
          orderAmount1: "施工方",
          buyer: "城市",
          seller: "项目地址",
          createTime: "经办人"
        },
        tableData: [
          {
            name: "XM9232434",
            entityNo: "项目名称",
            orderAmount1: "施工方",
            buyer: "城市",
            seller: "项目地址",
            createTime: "经办人"
          },
          {
            name: "XM9232434",
            entityNo: "项目名称",
            orderAmount1: "施工方",
            buyer: "城市",
            seller: "项目地址",
            createTime: "经办人"
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
    dialogCommonComponent,
    Table,
    breadcrumb,
    add
  },
  created() {
    // this.search();
  },
  methods: {
    addProject(){
      this.$refs.dialogCommonComponent.show();
      this.$nextTick(()=>{
        this.$refs.add.resetForm();
      });
    },
    // 发布
    publicProject(){
      this.$confirm('请确认要发布吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'tipsInfo',
          type: 'text'
        }).then(() => {

        }).catch(() => {
        });
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

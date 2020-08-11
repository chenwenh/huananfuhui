<template>
    <div>
       <breadcrumb :breadcrumbList="breadcrumbs"/>
        <!-- 表格 -->
        <el-input
            placeholder="输入关键字进行搜索"
            v-model="searchValue" style="width:300px;" class="search">
            <i slot="prefix" class="el-input__icon el-icon-search" style="margin-top:-2px;"></i>
        </el-input><el-button type="primary" @click="search" size="medium" style="margin-left:20px;">搜索</el-button>
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
              <el-table-column fixed="right" width="100px"
                        label="操作"
                        >
                  <template slot-scope="scope">
                    <el-button
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click="update(scope.row)">
                        更新
                    </el-button>
                     <el-button
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click="add(scope.row)">
                        新建
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
import breadcrumb from '@/components/breadcrumb.vue';
import dialogCommonComponent from '@/components/dialogCommonComponent';
import add from './add.vue';

export default {
  name: '',
  data() {
    return {
      searchValue:"",
      breadcrumbs:["协议管理","协议维护"],
      workDate: '',
      // 表格数据
      mainTable: {
        tableHeader: {
          name: "合同流水号",
          entityNo: "合同号",
          contractContent: "合同名称",
          buzType1: "合同层级",
          cType1: "合同类型",
          buyer: "甲方",
          seller: "乙方",
          contractMoney1: "丙方",
          signingDate: "签署日期",
          startDate: "合同金额",
          endDate: "起始日期",
          param1:"到期日期",
          param2:"签订方式",
          param3:"部门",
          param4:"合同",
          param5:"状态"
        },
        tableData: [
           {
            name: "合同流水号",
            entityNo: "合同号",
            contractContent: "合同名称",
            buzType1: "合同层级",
            cType1: "合同类型",
            buyer: "甲方",
            seller: "乙方",
            contractMoney1: "丙方",
            signingDate: "签署日期",
            startDate: "合同金额",
            endDate: "起始日期",
            param1:"到期日期",
            param2:"签订方式",
            param3:"部门",
            param4:"合同",
            param5:"正常"
          },
          {
            name: "合同流水号",
            entityNo: "合同号",
            contractContent: "合同名称",
            buzType1: "合同层级",
            cType1: "合同类型",
            buyer: "甲方",
            seller: "乙方",
            contractMoney1: "丙方",
            signingDate: "签署日期",
            startDate: "合同金额",
            endDate: "起始日期",
            param1:"到期日期",
            param2:"签订方式",
            param3:"部门",
            param4:"合同",
            param5:"失效"
          },
          {
            name: "合同流水号",
            entityNo: "合同号",
            contractContent: "合同名称",
            buzType1: "合同层级",
            cType1: "合同类型",
            buyer: "甲方",
            seller: "乙方",
            contractMoney1: "丙方",
            signingDate: "签署日期",
            startDate: "合同金额",
            endDate: "起始日期",
            param1:"到期日期",
            param2:"签订方式",
            param3:"部门",
            param4:"合同",
            param5:"更新中"
          }
        ],
        tableWidth: {
        }
      },
      totalCount: 3, // 数据总数
      page: 1,
      pageSize: 10,
      loading: false,
      assetsList: [],
      isDevorg: ''
    };
  },
  components: {
    Table,
    breadcrumb,
    dialogCommonComponent,
    add
  },
  computed: {
  },
  watch: {
    
  },
  created() {
    if (this.$route.query.type && this.$route.query.type !== '') this.isDevorg = this.$route.query.type;
    // this.search();
  },
  methods: {
    add(scope) {
       this.$refs.dialogCommonComponent.show();
       this.$nextTick(()=>{
          this.$refs.add.resetForm();
       });
    },
    // 搜索
    search(searchData) {
      this.mainTable.tableData = [];
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        orgId:sessionStorage.getItem('orgId'),
        assetType:'TRADECONTRACT',
        sortDirection: 'DESC'
      };
      // 获取意向申请列表
      const url = `${this.$apiUrl.queryContract}`;
      this.$http.post(url,params)
        .then(res => {
          if (res.data.status !== 200) return;
          this.totalCount = res.data.data.totalElements;
          this.mainTable.tableData = res.data.data.content;
          this.mainTable.tableData.map(item => {
            item.contractMoney = item.amount;
            item.cType = item.type;
          });
          console.log(this.mainTable.tableData);
        }).catch(err => {
          this.$message.warning(err.message || '服务器错误，请稍后再试!');
        });
    },
    // 分页
    handleCurrentChange(currentPage) {
      this.page = currentPage;
      this.search();
    },
    handleSizeChange(size){
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

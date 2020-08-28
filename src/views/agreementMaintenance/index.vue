<template>
    <div style="position: relative;">
       <breadcrumb :breadcrumbList="breadcrumbs"/>
        <!-- 表格 -->
        <el-input
            placeholder="输入关键字进行搜索"
            v-model="searchValue" style="width:300px;" class="search" @keyup.enter.native="search">
            <i slot="suffix" class="el-input__icon el-icon-search" style="margin-top:-4px;"></i>
        </el-input>
        <!-- <el-button type="primary" @click="search" size="medium" style="margin-left:20px;"  class="radiusNone">搜索</el-button> -->
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
              <!-- 状态筛选一栏 -->
              <el-table-column
                width="100"
                label="状态筛选"
                :filters="filterStatusList"
                :filter-method="filterHandler">
                  <template slot-scope="scope">
                    {{scope.row.param5 ? scope.row.param5 : '/'}}
                  </template>
              </el-table-column>
              <!-- 操作 -->
              <el-table-column fixed="right" width="100"
                        label="操作"
                        >
                  <template slot-scope="scope">
                    <el-button
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click.stop="update(scope.row)">
                        更新
                    </el-button>
                     <el-button
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click.stop="add(scope.row)">
                        新建
                    </el-button>
                  </template>
              </el-table-column>
        </Table>
        <!-- 添加 -->
        <dialogCommonComponent ref="dialogCommonComponent" title="新建协议" width="50%">
            <add ref="add"></add>
        </dialogCommonComponent>
        <!-- 详情 -->
        <dialogCommonComponent ref="dialogCommonComponent2" title="详情" width="600px">
            <detail ref="detail" :detailInfo="detailInfo" closeButton=true></detail>
        </dialogCommonComponent>
    </div>
</template>

<script>
import Table from '@/components/Table.vue';
import breadcrumb from '@/components/breadcrumb.vue';
import dialogCommonComponent from '@/components/dialogCommonComponent';
import add from './add.vue';
import detail from '@/components/detail.vue';

export default {
  name: '',
  data() {
    return {
      detailInfo:{
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
      filterStatus: [],
      filterStatusList: [
        {text: '正常', value: 'zhengchang'},
        {text: '失效', value: 'shixiao'},
        {text: '更新中', value: 'updateing'}
      ],
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
          // param5:"状态"
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
    add,
    detail
  },
  computed: {
  },
  watch: {
    'filterStatus': function statusChange() {
      let filterParam = {
        status: this.filterStatus
      };
      filterParam = JSON.parse(JSON.stringify(filterParam));
      this.search(filterParam);
    }
  },
  created() {
    if (this.$route.query.type && this.$route.query.type !== '') this.isDevorg = this.$route.query.type;
    // this.search();
  },
  methods: {
    update() {

    },
    rowClick(row){
      this.$refs.dialogCommonComponent2.show();
       this.$nextTick(()=>{
          this.$refs.detail.init(row);
       });
    },
    filterHandler(value, row, column) {
      // console.log(value, row, column, '123456', column.filteredValue)
      this.filterStatus = column.filteredValue;
    },
    handleCommand(command) {
      let filterParam = {
        status: command
      }
      this.search(filterParam);
    },
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
      const url = `${this.$apiUrl}`;
      let copyParams = Object.assign({}, searchData, params)
      this.$http.post(url, copyParams)
        .then(res => {
          if (res.data.status !== 200) return;
          this.totalCount = res.data.data.totalElements;
          this.mainTable.tableData = res.data.data.content;
          this.mainTable.tableData.map(item => {
            item.contractMoney = item.amount;
            item.cType = item.type;
          });
          this.$refs.tableRef.doLayout();
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

</style>

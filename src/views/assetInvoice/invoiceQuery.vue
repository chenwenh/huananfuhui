<template>
    <div >
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
                        label="操作"
                        >
                  <template slot-scope="scope">
                    <el-button
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click="details(scope.row)">
                        详情
                    </el-button>
                  </template>
              </el-table-column>
        </Table>
    </div>
</template>

<script>
import Table from '@/components/Table.vue';
import { mapGetters } from 'vuex'

export default {
  name: '',
  data() {
    return {
      workDate: '',
      // 表格数据
      mainTable: {
        tableHeader: {
            fpdm: "发票代码",
            fphm: "发票号码",
            code: "发票校验码",
            kprq: "开票日期",
            num: "发票机器码",
            taxamount: "税额合计",
            goodsamount: "价格合计",
            sumamount: "价税合计",
            quantityAmount: "数量合计",
            checkStatus: "状态",
            updateTime: "更新时间"
        },
        tableData: [],
        tableWidth: {
        }
      },
      totalCount: 0, // 数据总数
      page: 1,
      pageSize: 10,
      loading: false,
      assetsList: [],
      isDevorg: ''
    };
  },
  components: {
    Table
  },
  computed: {
    
  },
  watch: {
    
  },
  created() {
    if (this.$route.query.type && this.$route.query.type !== '') this.isDevorg = this.$route.query.type;
    this.search();
  },
  methods: {
    // 详情
    details(scope) {
    },
    // 搜索
    search(searchData) {
      this.mainTable.tableData = [];
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        orgId:'6badcc0a-0288-409e-b458-58276e801711',//sessionStorage.getItem('orgId'),
        assetType:'TRADEINVOICE',
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

<template>
    <div>
         <breadcrumb :breadcrumbList="breadcrumbs"/>
         <el-input
            placeholder="输入关键字进行搜索"
            v-model="searchValue" style="width:300px;" class="search" @keyup.enter.native="search">
            <i slot="suffix" class="el-input__icon el-icon-search" style="margin-top:-4px;"></i>
        </el-input>
        <!-- <el-button type="primary" @click="search" size="medium" style="margin-left:20px;"  class="radiusNone">搜索</el-button> -->
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
                        @click.stop="sign(scope.row)">
                        签章
                    </el-button>
                     <el-button
                        class="collectBtn"
                        size="medium"
                        type="text"
                        style="margin-left:0px; "
                        @click.stop="refuseShow(scope.row)">
                        拒绝
                    </el-button>
                  </template>
              </el-table-column>
        </Table>
        <!-- 详情 -->
        <dialogCommonComponent ref="dialogCommonComponent2" title="详情" width="600px">
            <detail ref="detail" :detailInfo="detailInfo" closeButton = true></detail>
        </dialogCommonComponent>
        <!-- 拒绝 -->
         <dialogCommonComponent ref="dialogCommonComponent3" title="详情" width="50%">
            <detail ref="detail2" :detailInfo="detailInfo" :closeButton="closeButton"></detail>
            <p style="margin-left:10%;">拒绝理由：</p>
            <el-input type="textarea" v-model="remark" placeholder="请输入拒绝理由" style="width:80%;margin-left:10%;"></el-input>
             <div style="text-align:center;width:100%;margin-top:20px;">
                    <el-button type="info" @click="close()"  class="radiusNone">取消</el-button>
                    <el-button type="primary" @click="submitForm()" class="primaryButton radiusNone">提交</el-button>
            </div>
        </dialogCommonComponent>
    </div>
</template>

<script>
import Table from '@/components/Table.vue';
import dialogCommonComponent from '@/components/dialogCommonComponent';
import breadcrumb from '@/components/breadcrumb.vue';
import { mapGetters } from 'vuex'
import detail from '@/components/detail.vue';

export default {
  name: '',
  data() {
    return {
      closeButton:false,
      remark:"",
      detailInfo:{
            name: "合同流水号",
            entityNo: "合同号",
            orderAmount1: "合同名称",
            buyer: "合同类型",
            seller: "甲方",
            createTime: "乙方",
            startDate: "合同金额",
            param1:"起始日期",
            param2:"到期日期",
            param3:"合同",
            param4:"已拒绝",
            param5:"拒绝原因"
      },
      searchValue:"",
      breadcrumbs:["协议管理","协议签署"],
      workDate: '',
      // 表格数据
      mainTable: {
        tableHeader: {
          name: "合同流水号",
          entityNo: "合同号",
          orderAmount1: "合同名称",
          buyer: "合同类型",
          seller: "甲方",
          createTime: "乙方",
          startDate: "合同金额",
          param1:"起始日期",
          param2:"到期日期",
          param3:"合同",
          param4:"状态",
          param5:"拒绝原因"
        },
        tableData: [
          {
            name: "合同流水号",
            entityNo: "合同号",
            orderAmount1: "合同名称",
            buyer: "合同类型",
            seller: "甲方",
            createTime: "乙方",
            startDate: "合同金额",
            param1:"起始日期",
            param2:"到期日期",
            param3:"合同",
            param4:"待审核",
            param5:"拒绝原因"
          },
          {
            name: "合同流水号",
            entityNo: "合同号",
            orderAmount1: "合同名称",
            buyer: "合同类型",
            seller: "甲方",
            createTime: "乙方",
            startDate: "合同金额",
            param1:"起始日期",
            param2:"到期日期",
            param3:"合同",
            param4:"待确认",
            param5:"拒绝原因"
          },
           {
            name: "合同流水号",
            entityNo: "合同号",
            orderAmount1: "合同名称",
            buyer: "合同类型",
            seller: "甲方",
            createTime: "乙方",
            startDate: "合同金额",
            param1:"起始日期",
            param2:"到期日期",
            param3:"合同",
            param4:"审核拒绝",
            param5:"拒绝原因"
          },
           {
            name: "合同流水号",
            entityNo: "合同号",
            orderAmount1: "合同名称",
            buyer: "合同类型",
            seller: "甲方",
            createTime: "乙方",
            startDate: "合同金额",
            param1:"起始日期",
            param2:"到期日期",
            param3:"合同",
            param4:"已拒绝",
            param5:"拒绝原因"
          },
           {
            name: "合同流水号",
            entityNo: "合同号",
            orderAmount1: "合同名称",
            buyer: "合同类型",
            seller: "甲方",
            createTime: "乙方",
            startDate: "合同金额",
            param1:"起始日期",
            param2:"到期日期",
            param3:"合同",
            param4:"已确认",
            param5:"拒绝原因"
          }
        ],
        tableWidth: {
          name: "150",
          entityNo: "150",
          orderAmount: "150",
          createTime: "120",
          startDate: "120",
        }
      },
      totalCount: 6, // 数据总数
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
    detail
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
    rowClick(row){
      this.$refs.dialogCommonComponent2.show();
      this.$nextTick(()=>{
        this.$refs.detail.init(row);
      });
    },
    sign(row){
      this.$confirm('此操作将签署该协议, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const url = `${this.$apiUrl.agreement.sign}`;
          let params = {
          };
          this.$http.put(url, params)
            .then(res => {
            if (res.data.status !== 200) return;
                this.$message.success('签署成功');
            }).catch(err => {
                this.$message.warning(err.message || '服务器错误，请稍后再试!');
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
    },
    close(){
      this.$bus.$emit('closeDialog');
    },
    refuseShow(row){
      console.log('1');
      this.$refs.dialogCommonComponent3.show();
      this.$nextTick(()=>{
        this.$refs.detail2.init(row);
      });
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
      const url = `${this.$apiUrl}`;
      this.$http.post(url,params)
        .then(res => {
          if (res.data.status !== 200) return;
          this.totalCount = res.data.data.totalElements;
          this.mainTable.tableData = res.data.data.content;
          this.mainTable.tableData.map(item => {
            item.orderAmount = item.amount;
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

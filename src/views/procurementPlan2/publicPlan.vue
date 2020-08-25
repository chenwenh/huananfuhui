<template>
    <div>
        <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="specialsForm" style="width:100%;">
            <div style="overflow:hidden;">
                    <el-form-item label="项目名称" prop="projectName">
                        <el-input v-model="ruleForm.projectName" placeholder="请输入项目名称" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="部门" prop="department">
                        <el-input v-model="ruleForm.department" placeholder="请输入部门" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="截止日期" prop="endDate" >
                    <el-date-picker
                            v-model="ruleForm.endDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期" style="width:100%;" disabled="">
                        </el-date-picker>
                    </el-form-item>
            </div>
            <Table
                ref="tableRef"
                :mainTable="mainTable"
                :selected="false"
                :showPagination="false" height2="250">
            </Table>
            <div style="text-align:right;width:100%;margin-top:20px;">
                <el-form-item>
                    <el-button type="info" @click="close()" >取消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')" class="primaryButton" :loading="loading">发布</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
import Table from '@/components/Table.vue';
export default {
    props:[],
    data(){
        return{
            loading:false,
            ruleForm: {
                projectName: '',
                department: '',
                endDate: ''
            },
            mainTable: {
                tableHeader: {
                    skuId: "编号",
					spec: "规格",
					materielQuality: "材质",
					length: "长度",
					quality:"数量",
                    breed: "品名",
                    unit: "计量单位",
                },
                tableData: [
                   
                ],
            }
        }
    },
    components: {
        Table
    },
    methods:{
        submitForm(formName) {
            var vm = this;
            var params = {
                id:this.ruleForm.id,
                publishStatus:'PUBLISHED'
            };
            vm.loading = true;
            vm.$http.post(`${vm.$apiUrl.purchase.mergePublishStatus}`,params)
            .then(res=>{
                if(res.data.status == vm.$appConst.status){
                    vm.$message.success('发布成功');
                    vm.loading = false;
                    vm.close();
                    vm.$emit('search');
                }
            }).catch(err=>{
                vm.$message.error(err.data.message);
                vm.loading = false;
            })
        },
        init(data){
            this.ruleForm = Object.assign({},data);
            this.mainTable.tableData = data.goods;
        },
        close(){
            this.$bus.$emit('closeDialog');
        },
    }
}
</script>
<style  scoped>
.specialsForm  .el-form-item{
    width:45%;
    display: inline-block;
}
</style>
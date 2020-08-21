<template>
    <div>
        <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="specialsForm" style="width:100%;">
            <div style="overflow:hidden;">
                    <el-form-item label="项目名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入项目名称" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="部门" prop="company">
                        <el-input v-model="ruleForm.company" placeholder="请输入部门" disabled=""></el-input>
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
                :loading="loading"
                :showPagination="false" height2="250">
            </Table>
            <div style="text-align:right;width:100%;margin-top:20px;">
                <el-form-item>
                    <el-button type="info" @click="close()" >取消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')" class="primaryButton">发布</el-button>
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
            ruleForm: {
                name: '项目名称',
                company: '部门',
                endDate: '2020-02-21'
            },
            mainTable: {
                tableHeader: {
                    skuId: "类型",
                    goodsName: "规格",
                    remarks: "材质",
                    spec: "长度",
                    quantity: "数量",
                    unit: "备注",
                },
                tableData: [
                    {
                        skuId: "类型",
                        goodsName: "规格",
                        remarks: "材质",
                        spec: "长度",
                        quantity: "数量",
                        unit: "备注",
                    },
                    {
                        skuId: "类型",
                        goodsName: "规格",
                        remarks: "材质",
                        spec: "长度",
                        quantity: "数量",
                        unit: "备注",
                    },
                ],
            }
        }
    },
    components: {
        Table
    },
    methods:{
        submitForm(formName) {
            
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
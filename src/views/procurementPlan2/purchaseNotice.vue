<template>
<div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="specialsForm" style="width:100%;background:white;margin-bottom:30px;" size="medium" >
            <div style="overflow:hidden;margin-bottom:20px;">
                    <el-form-item label="项目名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入项目名称" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="部门" prop="company">
                        <el-input v-model="ruleForm.company" placeholder="请输入部门" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="供应商" prop="company">
                        <el-input v-model="ruleForm.company" placeholder="请输入供应商" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="采购日期" prop="endDate">
                        <el-date-picker
                            v-model="ruleForm.endDate"
                            type="date"
                            placeholder="选择日期" style="width:100%;" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                     <el-form-item label="付款日期" prop="endDate">
                        <el-date-picker
                            v-model="ruleForm.endDate"
                            type="date"
                            placeholder="选择日期" style="width:100%;" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                     <el-form-item label="总数量" prop="company">
                        <el-input v-model="ruleForm.company" placeholder="请输入供应商" disabled=""></el-input>
                    </el-form-item>
                     <el-form-item label="业务员" prop="company">
                        <el-input v-model="ruleForm.company" placeholder="请输入供应商"></el-input>
                    </el-form-item>
                    <el-form-item label="开单人" prop="company">
                        <el-input v-model="ruleForm.company" placeholder="请输入供应商" disabled=""></el-input>
                    </el-form-item>
                     <el-form-item label="总金额" prop="company">
                        <el-input v-model="ruleForm.company" placeholder="请输入供应商" disabled=""></el-input>
                    </el-form-item>
            </div>
    </el-form>
    <div v-for="(item,index) in contents" :key="index" style="background:white;padding-top:20px;">
        <el-form :model="item.ruleForm"  :ref="item.ruleForm+'index'" label-width="100px" class="specialsForm" style="width:100%;">
            <div style="overflow:hidden;">
                    <el-checkbox v-model="item.checked" style="margin-right:-40px;margin-left:20px;"></el-checkbox>
                    <el-form-item label="供应商" prop="name" style="margin-bottom:3px;">
                        <el-input v-model="item.ruleForm.name" placeholder="请输入项目名称" disabled=""></el-input>
                    </el-form-item>
            </div>
        </el-form>
        <detailEntry ref="detailEntry" :formItem="formItem" :tabData="tabData"></detailEntry>
        <!-- <p style="height:20px;background: #F7F7F7;margin-top:20px;" v-if="index!=contents.length-1"></p> -->
    </div>
    <div style="text-align:right;margin-top:20px;margin-right:20px;">
        <el-button type="info" @click="close()" class="radiusNone">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" class="primaryButton radiusNone">提交</el-button>
    </div>
</div>
</template>
<script>
import detailEntry from './detailEntry.vue';
export default {
    props:[],
    data(){
        return{
            tabData:[
                {
                    skuId: "类型",
                    name:'规格',
                    name2:'材质',
                    name3:"钢厂",
                    name4:'发货仓库',
                    name5:'投标量',
                    name6:'收货仓库',
                    name7:'单价',
                    name8:'数量',
                    name9:'金额'
                },
                {
                    skuId: "类型",
                    name:'规格',
                    name2:'材质',
                    name3:"钢厂",
                    name4:'发货仓库',
                    name5:'投标量',
                    name6:'收货仓库',
                    name7:'单价',
                    name8:'数量',
                    name9:'金额'
                }
            ],
            formItem:{
                skuId: "类型",
                name:'规格',
                name2:'材质',
                name3:"钢厂",
                name4:'发货仓库',
                name5:'投标量',
                name6:'收货仓库',
                name7:'单价',
                name8:'数量',
                name9:'金额'
            },
            contents:[
                {   id:1,
                    checked:false,
                    ruleForm: {
                        name: '项目名称',
                        contractType: ''
                    },
                },
                {   id:2,
                    checked:false,
                    ruleForm: {
                        name: '项目名称',
                        contractType: ''
                    },
                }
            ],
            ruleForm: {
                name: '',
                company: '',
                endDate: ''
            },
            rules: {
                
            },
            
        }
    },
    components: {
        detailEntry
    },
    methods:{
        submitForm(formName) {
            
        },
        close(){
            this.$bus.$emit('back');
        },
    }
}
</script>
<style  scoped>
.specialsForm  .el-form-item{
    width:30%;
    display: inline-block;
}
</style>
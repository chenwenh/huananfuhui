<template>
<div>
    <div v-for="(item,index) in contents" :key="index" style="margin-bottom:40px;">
        <el-form :model="item.ruleForm"  :ref="item.ruleForm+'index'" label-width="100px" class="specialsForm" style="width:100%;">
            <div style="overflow:hidden;">
                    <el-checkbox v-model="item.checked" style="margin-right:-40px;margin-left:20px;"></el-checkbox>
                    <el-form-item label="供应商" prop="name">
                        <el-input v-model="item.ruleForm.name" placeholder="请输入项目名称" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="追索权" prop="contractType">
                        <el-select v-model="item.ruleForm.contractType" placeholder="" clearable=""  style="width:100%;" disabled="">
                            <el-option label="有追" value="true"></el-option>
                            <el-option label="无追" value="false"></el-option>
                        </el-select>
                    </el-form-item>
            </div>
        </el-form>
        <detailEntry ref="detailEntry" :formItem="formItem" :tabData="tabData"></detailEntry>
        <p style="height:20px;background: #F7F7F7;margin-top:20px;" v-if="index!=contents.length-1"></p>
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
                    name:'钢厂',
                    name2:'投标量',
                    name3:"单价",
                    name4:'仓库',
                    name5:'包到',
                    name6:'运价',
                    name7:'金额'
                },
                {
                    skuId: "类型",
                    name:'钢厂',
                    name2:'投标量',
                    name3:"单价",
                    name4:'仓库',
                    name5:'包到',
                    name6:'运价',
                    name7:'金额'
                }
            ],
            formItem:{
                skuId: "类型",
                name:'钢厂',
                name2:'投标量',
                name3:"单价",
                name4:'仓库',
                name5:'包到',
                name6:'运价',
                name7:'金额'
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
            
        }
    },
    components: {
        detailEntry
    },
    methods:{
        submitForm(formName) {
            
        },
        close(){
            this.$bus.$emit('close');
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
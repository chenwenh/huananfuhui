<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="specialsForm" style="width:100%;">
            <div style="overflow:hidden;">
                    <el-form-item label="项目名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入项目名称" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="计划编号" prop="number">
                        <el-input v-model="ruleForm.number" placeholder="请输入计划编号" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="追索权" prop="contractType">
                        <el-select v-model="ruleForm.contractType" placeholder="" clearable=""  style="width:100%;">
                            <el-option label="有追" value="true"></el-option>
                            <el-option label="无追" value="false"></el-option>
                        </el-select>
                    </el-form-item>
            </div>
            <detailEntry ref="detailEntry"></detailEntry>
            <div style="text-align:right;width:100%;margin-top:20px;">
                <el-form-item>
                    <el-button type="info" @click="close()" >取消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')" class="primaryButton">提交</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
import detailEntry from './detailEntry.vue';
export default {
    props:[],
    data(){
        return{
            ruleForm: {
                name: '项目名称',
                number: '计划编号',
                contractType: ''
            },
            rules: {
                contractType: [
                    { required: true, message: '不能为空！', trigger: 'change' }
                ],
            },

        }
    },
    components: {
        detailEntry
    },
    methods:{
        submitForm(formName) {
            var vm = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(vm.fromAudit){
                        console.log('2');
                        vm.$store.state.step = 3;
                    }
                    vm.close();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs['ruleForm'].resetFields();
        },
        close(){
            this.resetForm();
            this.$bus.$emit('firstStep');
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
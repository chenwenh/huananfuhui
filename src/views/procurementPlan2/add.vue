<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="specialsForm" style="width:100%;">
            <div style="overflow:hidden;">
                    <el-form-item label="项目名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入项目名称"></el-input>
                    </el-form-item>
                    <el-form-item label="部门" prop="company">
                        <el-input v-model="ruleForm.company" placeholder="请输入部门"></el-input>
                    </el-form-item>
                    <el-form-item label="截止日期" prop="endDate" >
                    <el-date-picker
                            v-model="ruleForm.endDate"
                            type="date"
                            placeholder="选择日期" style="width:100%;" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
            </div>
            <detailEntry ref="detailEntry"></detailEntry>
            <div style="text-align:right;width:100%;">
                <el-form-item>
                    <el-button type="info" @click="close()" >取消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')" class="primaryButton">提交</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
import detailEntry from '@/components/detailEntry.vue';
export default {
    props:[],
    data(){
        return{
            ruleForm: {
                name: '',
                company: '',
                endDate: ''
            },
            rules: {
                name: [
                { required: true, message: '不能为空！', trigger: 'blur' }
                ],
                company: [
                { required: true, message: '不能为空！', trigger: 'blur' }
                ],
                endDate: [
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
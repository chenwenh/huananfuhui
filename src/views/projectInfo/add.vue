<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="specialsForm" style="width:100%;">
          <div style="overflow:hidden;">
              <div>
                <el-form-item label="项目编号" prop="contractNum">
                    <el-input v-model="ruleForm.contractNum"></el-input>
                </el-form-item>
                <el-form-item label="项目名称" prop="contractName">
                    <el-input v-model="ruleForm.contractName"></el-input>
                </el-form-item>
                <el-form-item label="施工方" prop="contractAmount">
                    <el-input v-model="ruleForm.contractAmount"></el-input>
                </el-form-item>
                <el-form-item label="城市" prop="jiafang">
                  <el-input v-model="ruleForm.jiafang"></el-input>
                </el-form-item>
                <el-form-item label="项目地址" prop="yifang">
                  <el-input v-model="ruleForm.yifang"></el-input>
                </el-form-item>
                <el-form-item label="经办人" prop="bingfang">
                  <el-input v-model="ruleForm.bingfang"></el-input>
                </el-form-item>
              </div>
          </div>
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

export default {
    props:[],
    data(){
        return{
            ruleForm: {
                contractNum:'',
                contractName:'',
                contractAmount:'',
                jiafang:'',
                yifang:'',
                bingfang:''
            },
            rules: {

            },

        }
    },
    components: {

    },
    methods:{
        submitForm(formName) {
            var vm = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(vm.fromAudit,'vm.fromAudit');
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
.specialsForm .el-form-item{
    width:48%;
    display:inline-block;
}
</style>
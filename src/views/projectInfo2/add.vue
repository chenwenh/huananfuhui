<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="specialsForm" style="width:100%;">
          <div style="overflow:hidden;">
              <div>
                <el-form-item label="项目编号" prop="projectNo">
                    <el-input v-model="ruleForm.projectNo" :disabled="!isAdd"></el-input>
                </el-form-item>
                <el-form-item label="项目名称" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="城市" prop="city">
                  <el-input v-model="ruleForm.city"></el-input>
                </el-form-item>
                <el-form-item label="项目地址" prop="addr">
                  <el-input v-model="ruleForm.addr"></el-input>
                </el-form-item>
                <el-form-item label="经办人" prop="agent">
                  <el-input v-model="ruleForm.agent"></el-input>
                </el-form-item>
                <el-form-item label="施工方" prop="constructionParty">
                  <el-input v-model="ruleForm.constructionParty"></el-input>
                </el-form-item>
                <el-form-item label="经办人联系方式" prop="agentPhone">
                  <el-input v-model="ruleForm.agentPhone"></el-input>
                </el-form-item>
                <el-form-item label="签收人" prop="receiver">
                  <el-input v-model="ruleForm.receiver"></el-input>
                </el-form-item>
                <el-form-item label="签收人电话" prop="receiverPhone">
                  <el-input v-model="ruleForm.receiverPhone"></el-input>
                </el-form-item>
                <el-form-item label="发布日期" prop="publishDate" >
                    <el-date-picker
                        v-model="ruleForm.publishDate"
                        type="date"
                        placeholder="选择日期" style="width: 100%;" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="工期（月）" prop="duration">
                  <el-input v-model="ruleForm.duration" type="number"></el-input>
                </el-form-item>
                <el-form-item label="回款周期" prop="periodPayment" >
                    <el-input v-model="ruleForm.periodPayment"></el-input>
                </el-form-item>
                <el-form-item label="受托客户" prop="trustedClient">
                  <el-input v-model="ruleForm.trustedClient"></el-input>
                </el-form-item>
                <el-form-item label="钢铁用量(吨)" prop="steelConsumption">
                  <el-input v-model="ruleForm.steelConsumption"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content" style="width:96%;">
                  <el-input v-model="ruleForm.content" type="textarea"></el-input>
                </el-form-item>
              </div>
          </div>
            <div style="text-align:right;width:100%;">
                <el-form-item>
                    <el-button type="info" @click="close()" >取消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')" class="primaryButton" :loading="loading">提交</el-button>
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
            loading:false,
            ruleForm: {
               title:'',
               projectNo:'',
               addr:'',
               city:'',
               constructionParty:'',
               agent:'',
               agentPhone:'',
               receiver:'',
               receiverPhone:'',
               publishDate:'',
               duration:'',
               periodPayment:'',
               trustedClient:'',
               steelConsumption:'',
               publishStatus:'NO_PUBLISH',
               content:""
            },
            rules: {
                projectNo: [
                    { required: true, message: '请输入项目编号', trigger: 'blur' },
                ],
            },
            isAdd:true

        }
    },
    components: {

    },
    methods:{
        submitForm(formName) {
            var vm = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.loading = true;
                    var params = vm.ruleForm;
                    params['@class'] = 'com.evisible.hnfh.entity.domain.ProjectInfoBo';
                    var url = this.isAdd ? vm.$apiUrl.project.save : vm.$apiUrl.project.update;
                    vm.$http.post(`${url}`,params)
                    .then(res=>{
                        if(res.data.status == vm.$appConst.status){
                            vm.loading = false;
                            if(this.isAdd){
                              vm.$message.success('添加成功');
                            }else{
                              vm.$message.success('修改成功');
                            }                            
                            vm.close();
                            vm.$emit('search');
                        }
                    }).catch(err=>{
                        vm.$message.error(err.data.message);
                        vm.loading = false;
                    })
                } else {
                    return false;
                }
            });
      },
      init(flag,data){
        this.isAdd = flag;
        if(data){
          this.ruleForm = Object.assign({},data);
        }
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      },
      close(){
          this.loading = false;
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
<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="specialsForm" style="width:100%;">
          <div style="overflow:hidden;">
              <div>
                <el-form-item label="城市名称" prop="breed">
                    <el-input v-model="ruleForm.breed" :disabled="!isAdd"></el-input>
                </el-form-item>
                <el-form-item label="缩写" prop="spec">
                    <el-input v-model="ruleForm.spec"></el-input>
                </el-form-item>
                <el-form-item label="钢联城市ID" prop="materiel">
                  <el-input v-model="ruleForm.materiel"></el-input>
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
               breed:'',
               spec:'',
               materiel:''
            },
            rules: {
                breed: [
                    { required: true, message: '请输入城市名称', trigger: 'blur' },
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
                    params['@class'] = 'com.evisible.hnfh.entity.domain.MaterielInfoBo';
                    var url = this.isAdd ? vm.$apiUrl.materiel.save : vm.$apiUrl.materiel.update;
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
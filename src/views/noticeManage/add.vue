<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="specialsForm" style="width:100%;">
          <div style="overflow:hidden;">
              <div>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input v-model="ruleForm.content" type="textarea" :rows="20"></el-input>
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
               content:''
            },
            rules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                ],
                content: [
                    { required: true, message: '请输入内容', trigger: 'blur' },
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
                    params['@class'] = 'com.evisible.hnfh.entity.domain.NoticeInfoBo';
                    var url = this.isAdd ? vm.$apiUrl.notice.save : vm.$apiUrl.notice.update;
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
</style>
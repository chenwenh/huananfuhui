<template>
    <el-dialog v-dialogDrag title="修改密码"  :close-on-click-modal="false"  :rules="rules" :visible.sync="dialogVisible" style="padding-bottom:20px;" :before-close="close" class="tinyDialog">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
            <el-form-item label="原密码" prop="oldPwd">
                <el-input type="password" v-model="ruleForm.oldPwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd" style="position:relative;">
                <el-input type="password" v-model="ruleForm.newPwd" auto-complete="off"></el-input>
                <label style="position:absolute;left:-63px;top:1px;color:red;">*</label>
            </el-form-item>
            <el-form-item label="再次输入密码" prop="newPwd2" style="position:relative;">
                <el-input type="password" v-model="ruleForm.newPwd2" auto-complete="off"></el-input>
                <label style="position:absolute;left:-105px;top:1px;color:red;">*</label>
            </el-form-item>
            <el-form-item style="text-align:center;">
                <el-button @click="close()">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">确定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
export default {
  data() {
       var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.newPwd2 !== '') {
            this.$refs.ruleForm.validateField('newPwd2');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
        dialogVisible: false,
        loading: false,
         ruleForm: {
            oldPwd:'',
            newPwd: '',
            newPwd2: '',
        },
        rules: {
            oldPwd:[
                 { required: true, message: '请填写原密码', trigger: 'blur' }
            ],
            newPwd: [
                { validator: validatePass, trigger: 'blur' }
            ],
            newPwd2: [
                { validator: validatePass2, trigger: 'blur' }
            ],
        }


    }
  },
  props: [],
  mounted() {

  },
  components:{

  },
  methods: {
      submitForm(formName) {
        var vm = this;
        vm.loading = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
                var params = {
                  oldPwd:vm.ruleForm.oldPwd,
                  newPwd:vm.ruleForm.newPwd
                }
                var userId = JSON.parse(sessionStorage.getItem('user')).id;
                this.$http.post(`${vm.$apiUrl.userInfo}/userId/changePwd`,params).then(function(response){
                  if(response.data.status == this.$appConst.status) {
                    vm.$message.success('修改成功');
                    vm.close();
                    vm.loading = false;
                  }else{
                    vm.$message.error(response.data.message);
                  }
                },function(response){
                  vm.$message.error(response.data.message);
                  vm.loading = false;
                });
          } else {
            this.$message.error('请检查所填写的信息不能为空！');
            vm.loading = false;
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    //取消窗口关闭并且表单清空
    close() {
      this.resetForm('ruleForm'); //表单数据清空
      this.dialogVisible = false;
    },
    //弹出框显示并且表单清空
    show() {
      this.dialogVisible = true;
    },
  }
};
</script>
<style>
  .tinyDialog .el-dialog{
    width:500px;
  }
</style>

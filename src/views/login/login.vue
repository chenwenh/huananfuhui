<template>
    <div style="height:calc(100% - 80px)">
        <div class="login-container" style="padding:0;bottom:0;">
            <div class="content">
                <div class="login-content-left left">
                    <img src="static/images/login.png" alt="" style="width:592px;height:294px;">
                </div>
                <div class="login right">
                    <h2 style="text-align:center;">登 录</h2>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
                        <el-form-item label="" prop="userName">
                            <el-input v-model="ruleForm.userName" placeholder="用户名"><i slot="prefix" class="el-input__icon icon"><img src="static/images/userName.png" alt=""></i></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="pwd">
                            <el-input v-model="ruleForm.pwd" placeholder="密码"><i slot="prefix" class="el-input__icon icon"><img src="static/images/password.png" alt=""></i></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="smsCode">
                            <el-input v-model="ruleForm.smsCode" placeholder="验证码" style="width:180px;"><i slot="prefix" class="el-input__icon icon"><img src="static/images/code.png" alt=""></i></el-input>
                            <img src="static/images/smsCode.png" alt="" style="position:absolute;right:0;">
                        </el-form-item>
                        <el-form-item>
                            <el-button :loading="loading" type="primary" @click="submitForm('ruleForm')" class="loginButton" style="width:100%;">立即创建</el-button>
                        </el-form-item>
                    </el-form>
                    <p>
                        <span style="margin-right:20px;"><el-checkbox v-model="checked"><span class="blue">自动登录</span></el-checkbox></span>
                        <label style="float:right;">
                            <span class="blue leftspan">忘记密码</span> | 
                            <span class="blue leftspan">注册账户</span>
                        </label>
                    </p>
                </div>
            </div>
        </div>
        <div class="footer">
            <div>
                <span class="left">©华南富汇智慧供应链平台 All Rights Reserved. </span>                                                                                                                              
                <span class="right">京ICP证120829号    京ICP备 12032080号-2    京公网安备11010802017204号</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            loading:false,
            checked:true,
            ruleForm:{

            },
            rules:{
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                smsCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ],
            }
        }
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = {
                        userName: this.ruleForm.userName,
                        pwd: this.ruleForm.pwd,
                        smsCode: this.ruleForm.smsCode,
                        smsToken: "2222222"
                    };
                    params.sys = 'trade';
                    this.loading = true;
                    this.$http.post(this.$apiUrl.loginUrl, params)
                    .then(res=>{
                        if (res.data.status === this.$appConst.status){
                            this.loading = false;
                            sessionStorage.setItem('user', JSON.stringify(res.data.data.user));
                            sessionStorage.setItem('token', `${res.data.data.token}`);
                            sessionStorage.setItem('authorities', JSON.stringify(res.data.data.authorities));
                            this.$router.push({path:'/Home'});
                        }
                    })
                    .catch(err=>{
                        this.loading = false;
                        this.$message.error(err.data.message);
                    });
                } else {
                    return false;
                }
            });
        },
    }

}
</script>
<style  scoped>
.login-container{
    background-image: linear-gradient(180deg, #FFF8E0 0%, #FFF7DD 22%, #FFF4D3 100%);
    position: relative;
    height: calc(100% - 60px);
}
.content{
    width:1200px;
    margin:0 auto;
    height:100%;
    display: flex;
    align-items: center;
    position: relative;
}
.content .right{
    position: absolute;
    right:0;
}
.footer{
    height:60px;
    line-height:60px;
}
.footer div{
    width:1200px;
    margin:0 auto;
    color: #707070;
    font-size: 12px;
}
.left{
    float:left;
}
.right{
    float:right;
}
.login{
    width:340px;
    height:410px;
    background: #FFFFFF;
    box-shadow: 0 10px 30px 0 rgba(121,121,121,0.10);
    padding-left:30px;
    padding-right:30px;
    padding-top:20px;
}
.icon img{
    margin-bottom:-6px;
}
.loginButton{
    background: #FFD24D;
    border-radius: 22px;
    border-radius: 22px;
    color: #7F4318;
    height:44px;
}
.el-button--primary {
    background-color: #FFD24D;
    border-color: #FFD24D;
}

.leftspan{
    margin:0 10px;
    cursor: pointer;
}
</style>
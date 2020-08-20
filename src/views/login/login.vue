<template>
    <div style="height:calc(100% - 80px)">
        <div class="login-container" style="padding:0;bottom:0;">
            <div class="content">
                <div class="login-content-left left" >
                    <img src="static/images/login.png" alt="" style="width:592px;height:294px;">
                </div>
                <!-- 登录 -->
                <div class="login right" v-show="title === 'loginForm'">
                    <h2>登 录</h2>
                    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0" class="demo-loginForm">
                        <el-form-item label="" prop="userName">
                            <el-input v-model="loginForm.userName" placeholder="邮箱/手机号">
                                <!-- <i slot="prefix" class="el-input__icon icon"><img src="static/images/userName.png" alt=""></i> -->
                            </el-input>
                        </el-form-item>
                        <el-form-item label="" prop="pwd">
                            <el-input type="password" v-model="loginForm.pwd" placeholder="密码">
                                <!-- <i slot="prefix" class="el-input__icon icon"><img src="static/images/password.png" alt=""></i> -->
                            </el-input>
                        </el-form-item>
                        <el-form-item label="" prop="smsCode">
                            <el-input v-model="loginForm.smsCode" placeholder="请填写短信验证码" class="smsInput">
                                <!-- <i slot="prefix" class="el-input__icon icon"><img src="static/images/code.png" alt=""></i> -->
                            </el-input>
                            <!-- <img src="static/images/smsCode.png" alt="" style="position:absolute;right:0;"> -->
                            <span @click="getSMScode" class="smsCodeTip">{{smsCodeTip}}</span>
                        </el-form-item>
                        <el-form-item>
                            <el-button :loading="loading" type="primary" @click="submitForm('loginForm')" class="loginButton">登录</el-button>
                        </el-form-item>
                    </el-form>
                    <p>
                        <span style="margin-right:20px;"><el-checkbox v-model="checked"><span class="blue">自动登录</span></el-checkbox></span>
                        <label style="float:right;">
                            <span @click="changeTab('resetPwdForm')" class="blue leftspan">忘记密码</span>
                            <span style="color:#D8D8D8">|</span>
                            <span @click="changeTab('registerForm')" class="blue leftspan">注册账户</span>
                        </label>
                    </p>
                </div>
                <!-- 注册 -->
                <div v-show="title === 'registerForm'" class="login right" style="height:575px;width:388px;">
                    <h2>注 册</h2>
                    <el-form :model="registerForm" :rules="rules" ref="registerForm">
                        <el-form-item prop="username">
                            <el-input v-model.trim="registerForm.username" placeholder="用户名"></el-input>
                            <span class="el-form-item__error" v-show="usernameRegistered">该用户名已注册</span>
                        </el-form-item>
                        <el-form-item prop="mobile">
                            <el-input v-model.trim="registerForm.mobile" placeholder="手机号"></el-input>
                        </el-form-item>
                        <el-form-item prop="smsCode">
                            <el-input :disabled="notfillsmscode" style="width: 150px;" v-model.trim="registerForm.smsCode" placeholder="填写短信验证码"></el-input>
                            <span @click="handleResetPwdSMS('registerForm')" class="SMSverification">{{smsCodeTip}}</span>
                        </el-form-item>
                        <el-form-item prop="newPassword">
                            <el-input type="password" v-model.trim="registerForm.newPassword" placeholder="输入密码"></el-input>
                        </el-form-item>
                        <el-form-item prop="checkpwd">
                            <el-input type="password" v-model.trim="registerForm.checkpwd" placeholder="再次输入密码"></el-input>
                            <span class="el-form-item__error" v-show="pwdInconformity">两次输入密码不一致</span>
                        </el-form-item>
                    </el-form>
                    <div class="btn">
                        <el-button :disabled="!agree" @click="handleRegisterNewuser" :class="agree?'loginButton':'noagreeForRegister'">注册</el-button>
                        <div class="agreement"><el-checkbox v-model="agree"></el-checkbox> 我同意并遵守<span @click="handleShowAgreement('userRegister')">《会员服务协议》</span>、<span @click="handleShowAgreement('CFCA')">《CFCA数字证书服务协议》</span></div>
                        <div class="hasaccount" @click="changeTab('loginForm')">已有账号，立即登录</div>
                    </div>
                </div>
                <!-- 重置密码 -->
                <div v-show="title === 'resetPwdForm'" style="height:540px;width:388px;" class="login right">
                    <h2>密码重置</h2>
                    <el-form :model="resetPwdForm" :rules="rules" ref="resetPwdForm">
                        <el-form-item prop="userName">
                            <el-input v-model.trim="resetPwdForm.userName" placeholder="请输入您的用户名"></el-input>
                        </el-form-item>
                        <el-form-item prop="mobile">
                            <el-input v-model.trim="resetPwdForm.mobile" placeholder="请输入您的手机号"></el-input>
                        </el-form-item>
                        <el-form-item prop="smsCode">
                            <el-input :disabled="notfillsmscode" style="width: 150px" v-model.trim="resetPwdForm.smsCode" placeholder="填写短信验证码"></el-input>
                            <span @click="handleResetPwdSMS('resetPwdForm')" class="SMSverification" style="color: #FDA328;border: 1px solid #E1E5EF;">{{smsCodeTip}}</span>
                        </el-form-item>
                        <el-form-item prop="newPassword">
                            <el-input type="password" v-model.trim="resetPwdForm.newPassword" placeholder="请设置您的密码"></el-input>
                        </el-form-item>
                        <el-form-item prop="checkpwd">
                            <el-input type="password" v-model.trim="resetPwdForm.checkpwd" placeholder="请再次输入密码"></el-input>
                            <span class="el-form-item__error" v-show="pwdInconformity">两次输入密码不一致</span>
                        </el-form-item>
                    </el-form>
                    <div class="btn">
                        <el-button class="loginButton" @click="handleConfirmResetPwd">确定</el-button>
                        <div class="hasaccount" style="marginTop:10px;" @click="changeTab('loginForm')">已有账号，立即登录</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div>
                <span class="left">©华南富汇智慧供应链平台 All Rights Reserved. </span>                                                                                                                              
                <span class="right">京ICP证120829号    京ICP备 12032080号-2    京公网安备11010802017204号</span>
            </div>
        </div>
        <!-- 用户注册协议 -->
        <userRegisterAgreementComponent ref="userRegisterAgreement" :title="registerAgreementTitle" @agreement="agree = true"></userRegisterAgreementComponent>
    </div>
</template>
<script>
import userRegisterAgreementComponent from '@/components/userregisteragreement.vue';

export default {
    data(){
        return{
            title: 'loginForm',
            loading: false, // button loading
            checked: true, // 自动登录 勾选
            smsCodeTip: "获取验证码",
            sendingSMS: false, // 注册 是否已发送验证码
            usernameRegistered: false, //用户名是否已经注册
            pwdInconformity: false, // 判断两次输入密码一致
            agree: true, // 是否统一协议
            registerAgreementTitle: '', // 协议展示标题
            notfillsmscode:true, // 是否可输入验证码
            loginForm:{ // login
                userName:null,
                pwd:null,
                smsCode:null,
                smsToken:null
            },
            registerForm: { // register
                username:null,
                mobile:null, // 注册时传phone
                newPassword:null,
                checkpwd:null,
                smsCode:null,
                smsToken:null
            },
            resetPwdForm: { // 重置密码
                userName:null,
                mobile:null,
                newPassword: null,
                checkpwd:null,
                smsCode: null,
                smsToken: null
            }, // 重置密码
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
                mobile:[
                    {required: true, message: "请输入手机号", trigger: "change"},
                    { pattern: /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[35-8]\d{2}|4(?:0\d|1[0-2]|9\d))|9[0135-9]\d{2}|66\d{2})\d{6}$/, message: '手机号格式不正确' }
                ],
                newPassword:[
                    {required: true, message: "请输入密码", trigger: "change"},
                    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[^]{6,}$/, message: '请输入包含大小写字母及数字的6位以上密码' }
                ],
                checkpwd:[
                    {required: true, message: "请再次输入密码", trigger: "change"},
                ],
                username:[
                    {required: true, message: "请输入用户名", trigger: "change"},
                    { pattern: /^[a-zA-Z0-9_\.@-]{2,50}$/, message: '请输入可包含字母、数字 或者 @ - _ . 的2~50位字符' },
                ],
                smsCode: [
                    {required: true, message: "请输入验证码", trigger: "change"},
                ],
            }
        }
    },
    watch: {
        "registerForm.newPassword"(){
            this.pwdInconformity = false
            if(this.registerForm.newPassword && this.registerForm.checkpwd){
                if(this.registerForm.newPassword === this.registerForm.checkpwd){
                    this.pwdInconformity = false
                }else{
                    this.pwdInconformity = true
                }
            }
        },
        "registerForm.checkpwd"(){
            this.pwdInconformity = false
            if(this.registerForm.newPassword && this.registerForm.checkpwd){
                if(this.registerForm.newPassword === this.registerForm.checkpwd){
                    this.pwdInconformity = false
                }else{
                    this.pwdInconformity = true
                }
            }
        },
        "registerForm.username"(){
            this.usernameRegistered = false
            if(this.registerForm.username&&this.registerForm.username.length){
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.handleUserNameRepeate()
                }, 350);
            }
        },
        "resetPwdForm.newPassword"(){
            this.pwdInconformity = false
            if(this.resetPwdForm.newPassword && this.resetPwdForm.checkpwd){
                if(this.resetPwdForm.newPassword === this.resetPwdForm.checkpwd){
                    this.pwdInconformity = false
                }else{
                    this.pwdInconformity = true
                }
            }
        },
        "resetPwdForm.checkpwd"(){
            this.pwdInconformity = false
            if(this.resetPwdForm.newPassword && this.resetPwdForm.checkpwd){
                if(this.resetPwdForm.newPassword === this.resetPwdForm.checkpwd){
                    this.pwdInconformity = false
                }else{
                    this.pwdInconformity = true
                }
            }
        },
    },
    methods:{
        // 用户名获取短信验证码
        getSMScode(){
            if (this.smsCodeTip !== '获取验证码') {
                return;
            }
            if(!this.loginForm.userName){
                this.$message.error('用户名不能为空！');
                return;
            }
            if(!this.loginForm.pwd){
                this.$message.error('密码不能为空！');
                return;
            }
            let url = this.$apiUrl.sms.getSmsCode;
            let params = {
                username: this.loginForm.userName.trim(),
                password: this.loginForm.pwd.trim()
            };
            this.$http.post(url, params)
            .then(res => {
                if (res.data.status === 200) {
                    this.loginForm.smsToken = res.data.data.uid;
                    let djs = 60;
                    window.$('.smsCodeTip').css('cursor', 'not-allowed');
                    this.timer = setInterval(() => {
                        this.smsCodeTip = `${djs}秒后重新发送`;
                        if (djs <= 0) {
                            this.smsCodeTip = '获取验证码';
                            window.$('.smsCodeTip').css('cursor', 'pointer');
                            clearInterval(this.timer);
                        }
                        djs -= 1;
                    }, 1000);
                }
            }).catch(err=>{
                this.$message.error(err.data.message);
            })
        },
        /* 密码重置  注册（重置密码）发送验证码 手机号获取验证码*/
        handleResetPwdSMS(formname){
            if(this.sendingSMS) return;
            this.$refs[formname].validateField('mobile',(valid)=>{
                if(!valid){
                    let url = this.$apiUrl.sms.getSmsCodeByMobile;
                    let params = {
                        mobile:this.resetPwdForm.mobile,
                        smsType: "CAPTCHA_SMS"
                    }
                    if(formname === 'registerForm'){
                        params.mobile = this.registerForm.mobile;
                    }
                    this.$http.post(url,params, {headers:{Authorization: ''}})
                    .then(res => {
                        this.notfillsmscode = false;
                        let djs = 60;
                        this.sendingSMS = true;
                        this.timer = setInterval(() => {
                            this.smsCodeTip = djs + "秒后重新发送";
                            if(djs <= 0){
                                this.smsCodeTip = '发送验证码';
                                this.sendingSMS = false;
                                clearInterval(this.timer);
                            }
                            djs--;
                        }, 1000);
                        if(formname === 'registerForm'){
                            this.registerForm.smsToken = res.data.data.uid;
                        }else{
                            this.resetPwdForm.smsToken = res.data.data.uid;
                        }
                    }).catch(err=>{
                        this.notfillsmscode = true
                        this.$message.error(err.response.data.message);
                    })

                }else{
                    this.$message.error(valid);
                }
            })
        },
        // 登录
        submitForm(formName) {
            if (!this.loginForm.smsToken && this.loginForm.smsToken === '') {
                this.$message.warning('请先获取验证码');
                return;
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = {
                        userName: this.loginForm.userName.trim(),
                        pwd: this.loginForm.pwd.trim(),
                        smsCode: this.loginForm.smsCode,
                        // smsToken: '456415345454'
                        smsToken: this.loginForm.smsToken
                    };
                    // params.sys = 'trade';
                    this.loading = true;
                    this.$http.post(this.$apiUrl.login.loginUrl, params)
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
        // 切换tab
        changeTab(val) {
            this.$refs[val].resetFields();
            this.title = val;
        },
        // 查询用户重复，手机号重复，是否已经被注册
        handleUserNameRepeate(value){
            this.usernameRegistered = false;
            this.$refs['registerForm'].validateField('username',valid => {
                if(!valid){
                    this.$http.get(this.$apiUrl.login.isExist + '?username=' + this.registerForm.username, {headers:{Authorization: ''}})
                        .then(response => {
                            if (response.data.status === 200) {
                                if (response.data.data === true) {
                                    this.usernameRegistered = true;
                                }
                            } else {
                                this.usernameRegistered = false;
                            }
                        })
                }
            })
        },
        // 注册协议展示
        handleShowAgreement(title){
            if(title === 'userRegister'){
                this.registerAgreementTitle = '会员服务协议'
                this.$refs['userRegisterAgreement'].handleRegisterAgreementShow()
            }else if(title === 'CFCA'){
                this.registerAgreementTitle = 'CFCA数字证书服务协议'
                this.$refs['userRegisterAgreement'].handleRegisterAgreementShow()
            }
        },
        // 注册新用户
        handleRegisterNewuser(){
            this.$refs['registerForm'].validate(valid => {
                if(valid && !this.pwdInconformity&&!this.usernameRegistered){
                    // 校验验证码
                    let smsVerifyurl = this.$apiUrl.sms.checkSmsMsg;
                    let smsVerifparams = {
                        uid:this.registerForm.smsToken,
                        content:this.registerForm.smsCode
                    }
                    this.$http.post(smsVerifyurl,smsVerifparams, {headers:{Authorization: ''}})
                    .then(res => {
                        if(res.data.data){
                            let url = this.$apiUrl.login.register;
                            let params = {
                                username:this.registerForm.username,
                                phone:this.registerForm.mobile,
                                password:this.registerForm.newPassword
                            }
                            this.$http.post(url,params)
                            .then(res => {
                                if(res.data.status === 200){
                                    this.$message.success('注册成功，请您使用新用户进行登录')
                                    window.clearInterval(this.timer)
                                    this.smsCodeTip = '发送验证码'
                                    this.changeTab('loginForm')
                                }else{
                                    window.clearInterval(this.timer)
                                    this.smsCodeTip = '发送验证码'
                                }
                            }).catch(err => {
                                window.clearInterval(this.timer)
                                this.smsCodeTip = '发送验证码'
                                this.$message.error(err.response.data.message)
                            })
                        }else{
                            this.$message.error(res.data.message)
                        }
                    }).catch(err => {
                        this.$message.error(err.ersponse.data.message)
                    })

                }else{
                    this.$message.error('请按提示填写相关内容')
                }
            })
        },
        // 重置密码
        handleConfirmResetPwd() {
            this.$refs['resetPwdForm'].validate(valid => {
                if(valid && !this.pwdInconformity){
                    let url = this.$apiUrl.login.resetPassword;
                    let params ={
                        username:this.resetPwdForm.userName,
                        phone:this.resetPwdForm.mobile,
                        newPassword:this.resetPwdForm.newPassword,
                        smsCode:this.resetPwdForm.smsCode,
                        smsToken:this.resetPwdForm.smsToken
                    }
                    this.$http.post(url,params, {headers:{Authorization: ''}})
                    .then(res => {
                        if(res.data.data === '密码重置成功'){
                            this.$message.success("密码重置成功，请您使用新密码进行登录")
                        }else{
                            window.clearInterval(this.timer)
                            this.smsCodeTip = '发送验证码'
                        }
                        this.changeTab('loginForm')
                    }).catch(err => {
                        window.clearInterval(this.timer)
                        this.smsCodeTip = '发送验证码'
                        this.$message.error(err.response.data.message)
                    })
                }
            })
        }
    },
    components: {
        userRegisterAgreementComponent
    }
}
</script>
<style lang="less" scoped>
.smsCodeTip{
    width: 192px;
    text-align: center;
    height: 48px;
    color: #000;
    line-height: 50px;
    display: inline-block;
    border: 1px solid #DCDFE6;
    float: right;
    padding-right: 7px;
    background:rgba(240,240,240,1);
    cursor: pointer;
}
.login-container{
    background-image: linear-gradient(180deg, #FFF8E0 0%, #FFF7DD 22%, #FFF4D3 100%);
    position: relative;
    height: calc(100% - 60px);
    overflow: auto;
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
    width:346px;
    height:415px;
    background: #FFFFFF;
    box-shadow: 0 10px 30px 0 rgba(121,121,121,0.10);
    padding-left:42px;
    padding-right:42px;
    padding-top:20px;
    h2 {
        font-size:24px;
        font-weight:500;
        color:rgba(93,93,93,1);
    }
}
.icon img{
    margin-bottom:-6px;
}
.loginButton{
    width: 100% !important;
    background-color: #FFD24D !important;
    border: none;
    border-radius: 22px;
    border-radius: 22px;
    height:44px;
    font-size:16px;
    font-weight:500;
    color:rgba(127,67,24,1);
}
.el-button--primary {
    background-color: #FFD24D;
    border-color: #FFD24D;
}
.leftspan{
    margin:0 20px;
    cursor: pointer;
}
.agreement{
    font-size: 12px;
    text-align: left;
    margin: 10px 0;
    span{
        color: #32C5FF;
        cursor: pointer;
    }
}
.hasaccount{
    font-size: 14px;
    cursor: pointer;
    width: 128px;
    margin: 0px auto;
    font-weight:400;
    color:rgba(51,51,51,1);
}
.SMSverification{
    display: inline-block;
    height: 48px;
    width: 230px;
    line-height: 48px;
    text-align: center;
    color: #B8B8B8;
    cursor: pointer;
    margin-left: 4px;
    background:rgba(240,240,240,1);
    border:1px solid rgba(225,229,239,1);
    font-size:14px;
    font-weight:400;
    color:rgba(0,0,0,1);
}
.noagreeForRegister {
    cursor: not-allowed;
    width: 100% !important;
    background-color: #B3B3BE !important;
    border: none;
    border-radius: 22px;
    border-radius: 22px;
    height:44px;
    color: #ffffff;
}
.smsInput {
    width: 142px;
    /deep/.el-input__inner {
        padding-right: 0;
    }
}
.el-input /deep/.el-input__prefix {
    left: 14px;
}
.el-input /deep/ .el-input__inner {
    height: 50px;
}
.el-checkbox /deep/.el-checkbox__input {
    line-height: 19px;
}
.el-input--prefix /deep/.el-input__inner {
    padding-left: 46px;
    height: 50px;
}
.el-button.is-disabled:hover {
    color: #fff;
}
.el-input.is-disabled /deep/.el-input__inner {
    border: 1px solid #DCDFE6;
}
</style>
<template>
<div style="height:calc(100% - 60px);">
    <div class="header">
        <img src="static/images/homeLogo.png" alt="" class="left pointer" @click="goHomePage">
        <el-dropdown @command="handleCommand2" style="position:relative;top:-13px;left:20px;font-weight:bold;" v-if="$route.path!='/Home'&&$route.path!='/home'">
            <span class="el-dropdown-link">
                富宝通<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">库易宝</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="right">
            <span class="manageCenter pointer" v-show="$route.path=='/home' ||$route.path=='/Home'" @click="goManageCenter">管理中心</span>
            <img src="static/images/infoLogo.png" alt="" class="infoLogo" @click="goMail">
            <el-dropdown trigger="click" @command="handleCommand" style="margin-top:7px;cursor:pointer;">
                <span class="el-dropdown-link">
                    <img class="userIcon" src="static/images/toux.png" />
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item style="font-size: 12px;color: #666666;">{{userName}}</el-dropdown-item>
                    <el-dropdown-item :command="'enterpriseAgreement'">企业协议</el-dropdown-item>
                    <p class="line"></p>
                    <el-dropdown-item :command="'enterpriseManagement'">企业管理</el-dropdown-item>
                    <p class="line"></p>
                    <el-dropdown-item :command="'personalCenter'">个人中心</el-dropdown-item>
                    <p class="line"></p>
                    <el-dropdown-item :command="'logout'">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return{
            userName: JSON.parse(sessionStorage.getItem('user')).username
        }
    },
    methods:{
        goManageCenter(){
            this.$router.push({
                path:'/manage/businessOpenAudit'
            });
        },
        goMail(){
            this.$router.push({
                path:'/publicInfoModel/mail'
            });
        },
        handleCommand (command) {
            // 退出
            if (command === 'logout') {
                sessionStorage.clear()
                localStorage.clear()
                this.$router.push({path:'/login'});
            }
            if (command === 'enterpriseManagement'){
                let token = sessionStorage.getItem('token');
                window.open(`${SSO_URL}/login?token=${token}`);
            }
            if(command === 'personalCenter'){
                // 跳转到公共信息模块的个人信息
                this.$router.push({
                    path:'/publicInfoModel/personalInfo'
                });
            }
            if(command === 'enterpriseAgreement'){
                // 跳转到公共信息模块的企业协议
                this.$router.push({
                    path:'/publicInfoModel/enterpriseAgreement'
                });
            }
        },
        handleCommand2(command) {
            this.$message('click on item ' + command);
        },
        goHomePage(){
            this.$router.push({path:'/homePage'});
        }
    }
}
</script>
<style scoped>
.manageCenter{
    color: #333333;
    font-size: 18px;
}
.header{
    height:60px;
    padding-left:20px;
    padding-right:20px;
    background: #FFFFFF;
    box-shadow: 0 4px 8px 0 rgba(52,57,87,0.05);
}
.header .left{
    margin-top:5px;
}
.header .right{
    display: inline-block;
    float:right;
    display:flex;
    align-items:center;
    height:60px;
    text-align: right;
}
.infoLogo{
    margin-left:20px;
    margin-right:20px;
    cursor: pointer;
}
.el-dropdown-menu {
    text-align: center;
    margin-bottom: 0;
    padding-bottom: 0;
}
.line {
    background-color: #EDEDED;
    height: 1px;
}
</style>
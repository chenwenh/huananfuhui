<template>
<div style="height:calc(100% - 60px);">
    <div class="header">
        <img src="static/images/homeLogo.png" alt="" class="left">
        <div class="right">
             <el-input
                placeholder="输入关键字进行搜索"
                v-model="searchValue" style="width:200px;" class="search">
                <i slot="prefix" class="el-input__icon el-icon-search" style="margin-top:-2px;"></i>
            </el-input>
            <img src="static/images/infoLogo.png" alt="" class="infoLogo">
            <el-dropdown trigger="click" @command="handleCommand" style="margin-top:7px;cursor:pointer;">
                <span class="el-dropdown-link">
                    <img class="userIcon" src="static/images/toux.png" />
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
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
            searchValue:''
        }
    },
    methods:{
        handleCommand (command) {
            if (command === 'logout') {
                sessionStorage.clear()
                localStorage.clear()
                this.$router.push({path:'/homePage'});
            }
        },
    }
}
</script>
<style scoped>
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
    width:326px;
    float:right;
    display:flex;
    align-items:center;
    height:60px;
}
.infoLogo{
    margin-left:20px;
    margin-right:20px;
    cursor: pointer;
}
</style>
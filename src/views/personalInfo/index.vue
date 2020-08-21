<template>
<div>
    
    <div class="box2">
    <breadcrumb :breadcrumbList="breadcrumbs"/>
    <div class="personalInfo">
        <p class="center" style="margin-bottom:40px;"><img src="static/images/personalLogo.png" alt=""></p>
        <p><span class="left">用户名</span><el-input v-model="ruleForm.username" disabled=""></el-input></p>
        <p><span class="left">手机号</span><el-input v-model="ruleForm.phone" :disabled="isDisabled"></el-input>
            <span class="blue pointer edit" @click="isDisabled=false" v-if="isDisabled">修改</span>
            <span class="blue pointer edit" @click="editPhone" v-if="!isDisabled">完成</span>
        </p> 
        <p><span class="left">身份证号</span><el-input v-model="ruleForm.idCardNo" disabled=""></el-input></p>
        <p class="roles"><span class="left">角色</span>
            <ul>
                <li v-for="(item,index) in ruleForm.roles" :key="index">
                    {{item.description}}
                </li>
            </ul>
        </p>
        <p><span class="left">密码</span><span class="blue edit pointer" @click="editPassword()">修改</span></p>
        <editPassword ref="editPassword"></editPassword>
    </div>
    </div>
</div>
</template>
<script>
import breadcrumb from '@/components/breadcrumb.vue';
import editPassword from './editPassword.vue';
export default {
    data(){
        return{
            ruleForm:{},
            isDisabled:true,
            breadcrumbs:['个人信息']
        }
    },
    methods:{
        editPassword(){
            this.$refs.editPassword.show();
        },
        editPhone(){
            var vm = this;
            vm.$http.put(`${this.$apiUrl.userInfo}`,vm.ruleForm)
            .then(res=>{
                if(res.data.status = vm.$appConst.status){
                    vm.$message.success('修改成功');
                    vm.isDisabled = true;
                }else{
                    vm.$message.error(res.data.$message);
                }
            }).catch(err=>{
                vm.$message.error(err.data.message);
            });
        }
    },
    components:{
        breadcrumb,
        editPassword
    },
    mounted(){
        var vm = this;
        vm.$http.get(`${this.$apiUrl.userInfo}`)
        .then(res=>{
            vm.ruleForm = res.data.data;
        });
    }
}
</script>
<style scoped>
.box2{
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
    border: 1px solid #F7F7F7;
    padding-bottom:40px;
}
.center{
    text-align: center;
}
.personalInfo{
  width:500px;
  margin:20px auto;
}
.personalInfo p{
    margin-bottom:10px;
}
.personalInfo span.left{
    width:80px;
    display: inline-block;
    color: #888888;
    float: left;
    /* line-height: 40px; */
}
.personalInfo span.edit{
    margin-left:15px;
}
.personalInfo .el-input,ul{
    width:calc(100% - 150px);
    display: inline-block;
}
.personalInfo .roles ul li{
    display: inline-block;
    padding-right:20px;
    border:1px solid #f3f3f3;
    padding:0 5px;
    margin-right:20px;
    margin-bottom:20px;
}
</style>
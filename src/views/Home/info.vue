<template>
    <div class="content">
        <div class="left">
            <div class="alert shadow" v-show="alertShow">
                <h3 class="title">实用提示</h3>
                <p><img src="static/images/lamp.png">为保证您的帐户及资源的所属权安全，建议您优先完成实名认证。<span @click="goToSSO" class="blue pointer">前往认证</span></p>
                <i class="el-icon-close close" @click="alertShow=!alertShow"></i>
            </div>
            <div class="product shadow">
                 <h3 class="title">产品中心</h3>
                 <img src="static/images/fubaotong.png" alt="" style="margin-right:20px;" class="pointer" @click="fubaotongClick">
                 <div style="position:relative;display:inline-block;" @click="applicationOpen">
                    <img src="static/images/kuyibao.png" alt="" class="pointer">
                    <span class="status" v-show="$store.state.openState=='notOpen'">申请开通</span>
                    <span class="status" v-show="$store.state.openState=='opening'">开通中</span>
                 </div>
            </div>
            <!-- 开通组件 -->
            <dialogCommonComponent ref="dialogCommonComponent" title="业务开通申请" width="860px">
                <applicationOpen ref="applicationOpen"></applicationOpen>
            </dialogCommonComponent>
            <div class="questions shadow">
                <h3 class="title">常见问题</h3>
                <ul>
                    <li>DDH价格查询</li>
                    <li>项目结束了怎么撤回</li>
                    <li>项目结束了怎么撤回</li>
                    <li>项目结束了怎么撤回</li>
                    <li>登录出问题了</li>
                    <li>实名认证会不会泄露我的信息</li>
                </ul>
            </div>
            <div class="public shadow" style="overflow:hidden;">
                <img src="static/images/erweima.png" alt="" style="float:left;margin-right:20px;">
                <h4>汇富通APP</h4>
                <p>随时随地移动管控 独有的行业咨询  更安全 更便捷</p>
            </div>
        </div>
        <div class="right">
            <div class="shadow" style="overflow:hidden; padding-top: 24px;">
                <img src="static/images/touxiang2.png" alt="" style="float:left;margin-right:20px;margin-top:13px;">
                <h4 style="margin-top:5px;">欢迎“{{enterpriseData.orgName}}”登录系统</h4>
                <p style="margin-left:20px;" class="word">
                    <span>{{enterpriseData.orgRole}}</span><span class="noReal">{{enterpriseData.isVerified}}</span>
                    <span class="blue pointer" style="float:right;">企业管理</span>
                </p>
            </div>
            <div class="shadow publicMessages" style="padding-top:11px; padding-bottom: 18px;">
                <p class="title">公告</p>
                <ul>
                    <li v-for="(item,index) in publicMessages" :key="index">
                        {{item.info}}
                    </li>
                </ul>
                <p class="blue pointer">更多</p>
            </div>
            <div class="shadow publicMessages" style="padding-top:11px">
                <p class="title">公示</p>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="项目信息" name="first">
                        <ul>
                            <li v-for="(item,index) in projectInfos" :key="index"> 
                                <span class="marginRight">{{item.name}}</span>
                                <span class="marginRight">{{item.date}}</span>
                                <span>{{item.status}}</span>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="采购计划" name="second">
                         <ul>
                            <li v-for="(item,index) in projectInfos" :key="index"> 
                                <span class="marginRight">{{item.name}}</span>
                                <span class="marginRight">{{item.date}}</span>
                                <span>{{item.status}}</span>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="销售信息" name="third">
                         <ul>
                            <li v-for="(item,index) in projectInfos" :key="index"> 
                                <span class="marginRight">{{item.name}}</span>
                                <span class="marginRight">{{item.date}}</span>
                                <span>{{item.status}}</span>
                            </li>
                        </ul>
                    </el-tab-pane>
                </el-tabs>
                <p class="blue pointer">更多</p>
            </div>
        </div>
    </div>
</template>
<script>
import dialogCommonComponent from '@/components/dialogCommonComponent';
import applicationOpen from './applicationOpen.vue';
export default {
    created() {
        this.getUserData();
    },
    data(){
        return{
            activeName:'first',
            alertShow:true,
            enterpriseData: { // 企业信息
                orgName: '',
                isVerified: '',
                orgRole: ''
            },
            publicMessages:[
                {
                    info:"【每日一习话】推动脱贫攻坚各项政策措施落地生根"
                },
                {
                    info:"美国制裁新疆生产建设兵团 中方:严重干涉中国内政"
                },
                {
                    info:"【幸福花开新边疆】五畜兴旺的边疆生活"
                },
                {
                    info:"【每日一习话】推动脱贫攻坚各项政策措施落地生根"
                },
                {
                    info:"美国制裁新疆生产建设兵团 中方:严重干涉中国内政"
                },
                {
                    info:"【幸福花开新边疆】五畜兴旺的边疆生活"
                }
            ],
            projectInfos:[
                {
                    name:'xxxxxxxxxxx钢材销售',
                    date:'2020-04-08',
                    status:'发布中'
                },
                {
                    name:'xxxxxxxxxxx钢材销售',
                    date:'2020-04-08',
                    status:'发布中'
                },
                {
                    name:'xxxxxxxxxxx钢材销售',
                    date:'2020-04-08',
                    status:'发布中'
                },
                {
                    name:'xxxxxxxxxxx钢材销售',
                    date:'2020-04-08',
                    status:'发布中'
                },
                {
                    name:'xxxxxxxxxxx钢材销售',
                    date:'2020-04-08',
                    status:'发布中'
                },
                {
                    name:'xxxxxxxxxxx钢材销售',
                    date:'2020-04-08',
                    status:'发布中'
                }
                
            ]
        }
    },
    methods:{
        applicationOpen(){
            this.$refs.dialogCommonComponent.show();
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        fubaotongClick(){
            this.$router.push({
                path:'/home2'
            });
        },
        // 获取用户信息
        getUserData() {
            let user = JSON.parse(sessionStorage.getItem('user'));
            this.enterpriseData.orgName = user.orgName;
            this.enterpriseData.isVerified = user.hasOwnProperty('verified') && user.verified === true ? '已实名' : '未实名';
            this.enterpriseData.orgRole = this.$appConst.enterOrgRole[user.orgRole];
        },
        // 跳转统一登陆系统
        goToSSO() {
            let token = sessionStorage.getItem('token');
            window.open(`${SSO_URL}/login?token=${token}`);
        }
    },
    components:{
        dialogCommonComponent,
        applicationOpen
    }
}
</script>
<style scoped>
.status{
    position: absolute;
    right:4px;
    top:0;
    padding:3px;
    background:red;
    color:white;
    border-top-right-radius:3px;
}
.marginRight{
    margin-right:26px;
}
.word{
    font-size:12px;
}
.noReal{
    height:20px;
    background: #C1C6C8;
    color: #FFFFFF;
    padding-left:3px;
    padding-right:3px;
    margin-left:20px;
}
 .content{
    padding:20px;
    background:rgb(244,244,244);
    overflow: hidden;
 }
 body{
     background:rgb(244,244,244);
 }
 .content .left{
     width:calc(100% - 420px);
     float:left;
 }
 .content .left .alert{
     padding:20px;
     position: relative;
     padding-top:10px;
 }
.title{
    font-weight: 700;
    font-size: 14px;
    color: #000000;
    letter-spacing: 0;
 }
 .content .right{
     width:390px;
     float:right;
 }
 .shadow{
    padding:20px;
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
    margin-bottom:20px;
 }
 .close{
     position: absolute;
     right:10px;
     top:10px;
     font-size:20px;
     cursor: pointer;
 }
 .questions ul li{
     display: inline-block;
     margin-right:140px;
     line-height:30px;
     cursor: pointer;
     margin-bottom: 5px;
 }
 .publicMessages ul li {
     height:35px;
     line-height:35px;
     color: #666666;
 }
</style>
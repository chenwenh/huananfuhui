<template>
    <div class="content">
        <div class="left">
            <div class="alert shadow" v-show="!isVerified">
                <h3 class="title">实用提示</h3>
                <p><img src="static/images/lamp.png">为保证您的帐户及资源的所属权安全，建议您优先完成实名认证。<span @click="goToSSO" class="blue pointer">前往认证</span></p>
                <i class="el-icon-close close" @click="isVerified=!isVerified"></i>
            </div>
            <div class="product shadow">
                 <h3 class="title">产品中心</h3>
                 <img src="static/images/fubaotong.png" alt="" style="margin-right:20px;" class="pointer" @click="fubaotongClick">
                 <div style="position:relative;display:inline-block;" @click="applicationOpen">
                    <img src="static/images/kuyibao.png" alt="" class="pointer">
                    <span class="status" v-if="step === 'NOT_OPEN'">申请开通</span>
                    <span class="status" v-else>开通中</span>
                 </div>
            </div>
            <!-- 开通组件 -->
            <dialogCommonComponent ref="dialogCommonComponent" title="业务开通申请" width="860px">
                <applicationOpen ref="applicationOpenRef"></applicationOpen>
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
                    <span class="blue pointer" style="float:right;" @click="goToSSO">企业管理</span>
                </p>
            </div>
            <div class="shadow publicMessages" style="padding-top:11px; padding-bottom: 18px;">
                <p class="title">公告</p>
                <ul>
                    <li v-for="(item,index) in publicMessages" :key="index">
                        {{item.title}}
                    </li>
                </ul>
                <p class="blue pointer" @click="getMoreNotice">更多</p>
            </div>
            <div class="shadow publicMessages publicMessages2" style="padding-top:11px">
                <p class="title">公示</p>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="项目信息" name="first">
                        <ul>
                            <li v-for="(item,index) in projectInfos" :key="index"> 
                                <span class="marginRight title2">{{item.title}}</span>
                                <span class="marginRight publishDate">{{item.publishDate}}</span>
                                <span class="publishStatus">{{$appConst.publishStatus[item.publishStatus]}}</span>
                            </li>
                        </ul>
                        <p class="blue pointer" @click="getMoreProject">更多</p>
                    </el-tab-pane>
                    <el-tab-pane label="采购计划" name="second">
                         <ul>
                            <li v-for="(item,index) in purchaseInfos" :key="index"> 
                                <span class="marginRight title2">{{item.title}}</span>
                                <span class="marginRight publishDate">{{item.publishDate}}</span>
                                <span class="publishStatus">{{$appConst.publishStatus[item.publishStatus]}}</span>
                            </li>
                        </ul>
                        <p class="blue pointer" @click="getMorePurchase">更多</p>
                    </el-tab-pane>
                    <el-tab-pane label="销售信息" name="third">
                         <ul>
                            <li v-for="(item,index) in salesInfos" :key="index"> 
                                <span class="marginRight title2">{{item.title}}</span>
                                <span class="marginRight publishDate">{{item.publishDate}}</span>
                                <span class="publishStatus">{{$appConst.publishStatus[item.publishStatus]}}</span>
                            </li>
                        </ul>
                        <p class="blue pointer" @click="getMoreSales">更多</p>
                    </el-tab-pane>
                </el-tabs>
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
        this.getServiceStatus();
    },
    data(){
        return{
            businessId: null,
            step: 'NOT_OPEN', // 业务开通步骤
            activeName:'first',
            alertShow:true,
            enterpriseData: { // 企业信息
                orgName: '',
                isVerified: '',
                orgRole: ''
            },
            publicMessages:[],
            purchaseInfos:[],
            salesInfos:[],
            projectInfos:[],
            isVerified:false
        }
    },
    methods:{
        getMoreNotice(){
            this.$router.push({
                path:'/manage/noticeManage'
            });
        },
        getMoreProject(){
            this.$router.push({
                path:'/publicInfoModel/projectInfo'
            });
        },
        getMorePurchase(){
            this.$router.push({
                path:'/publicInfoModel/procurementPlan'
            });
        },
        getMoreSales(){
            this.$router.push({
                path:'/publicInfoModel/salesInfo'
            });
        },
        // 获取业务开通状态
        getServiceStatus() {
            const url = `${this.$apiUrl.serviceFulfillment.query}`;
            let params = {
                sortField: 'applyDate',
                sortDirection: 'DESC'
            };
            this.$http.post(url, params)
                .then(res => {
                if (res.data.status !== 200) return;
                // 进入页面获取状态
                if(res.data.data && res.data.data.content[0] === null) {
                    this.step = 'NOT_OPEN';
                }
                }).catch(err => {
                    this.$message.warning(err.message || '服务器错误，请稍后再试!');
                });
        },
        applicationOpen(){
            this.$refs.dialogCommonComponent.show();
            this.$nextTick(() =>{
                this.$refs.applicationOpenRef.init(this.step, 'PATTERN_A');
            });
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        fubaotongClick(){
            this.$router.push({
                path:'/homes/agreementMaintenance'
            });
        },
        // 获取用户信息
        getUserData() {
            let user = JSON.parse(sessionStorage.getItem('user'));
            this.enterpriseData.orgName = user.orgName;
            this.isVerified = user.verified;
            this.enterpriseData.isVerified = user.hasOwnProperty('verified') && user.verified === true ? '已实名认证' : '未实名';
            this.enterpriseData.orgRole = this.$appConst.enterOrgRole[user.orgRole];
        },
        // 跳转统一登陆系统
        goToSSO() {
            let token = sessionStorage.getItem('token');
            window.open(`${SSO_URL}/login?token=${token}`);
        },
        getProject(){
            const params = {
                page: 1,
                pageSize: 6
            };
            const url = `${this.$apiUrl.project.query}`;
            this.$http.get(url,{params})
                .then(res => {
                if (res.data.status !== 200) return;
                    this.projectInfos = res.data.data.content;
                }).catch(err => {
                   
                });
        },
        getPurchase(){
            const params = {
                page: 1,
                pageSize: 6
            };
            const url = `${this.$apiUrl.purchase.query}`;
            this.$http.get(url,{params})
                .then(res => {
                if (res.data.status !== 200) return;
                    this.purchaseInfos = res.data.data.content;
                }).catch(err => {
                   
                });
        },
        getSales(){
            const params = {
                page: 1,
                pageSize: 6
            };
            const url = `${this.$apiUrl.salesInfo.query}`;
            this.$http.get(url,{params})
                .then(res => {
                if (res.data.status !== 200) return;
                    this.salesInfos = res.data.data.content;
                }).catch(err => {
                   
                });
        },
        getNotice(){
            const params = {
                page: 1,
                pageSize: 6
            };
            const url = `${this.$apiUrl.notice.query}`;
            this.$http.get(url,{params})
                .then(res => {
                if (res.data.status !== 200) return;
                    this.publicMessages = res.data.data.content;
                }).catch(err => {
                   
                });
        },
    },
    components:{
        dialogCommonComponent,
        applicationOpen
    },
    mounted(){
        this.getProject();
        this.getPurchase();
        this.getSales();
        this.getNotice();
    },
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
    margin-right:15px;
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
    min-height: calc(100% - 42px);
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
 .publicMessages2 .title2{
     width:170px;
     display: inline-block;
     overflow: hidden;
     white-space: nowrap;
     text-overflow: ellipsis;
     color: #666666;
     font-weight: 400;
 }
  .publicMessages .publishDate{
      display: inline-block;
      width:90px;
      overflow: hidden;
  }
  .publicMessages .publishStatus{
      display: inline-block;
      width:60px;
      overflow: hidden;
  }
  /* .publicMessages2 ul{
      animation: 10s wordsLoop  infinite normal;
  }
  @keyframes wordsLoop {
        0% {
            transform: translateY(0px);
            -webkit-transform: translateY(0px);
        }
        100% {
            transform: translateY(-5%);
            -webkit-transform: translateY(-5%);
        }
    }

    @-webkit-keyframes wordsLoop {
        0% {
            transform: translateY(0px);
            -webkit-transform: translateY(0px);
        }
        100% {
            transform: translateY(-5%);
            -webkit-transform: translateY(-5%);
        }
    } */
</style>
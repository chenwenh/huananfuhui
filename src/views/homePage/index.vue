<template>
    <div>
        <el-carousel trigger="click"  id="el-carousel">
            <el-carousel-item v-for="(item,index) in imgList"
                                :interval="3000"
                                :key="index">
                <img :src="item.url" class="carousel-content">
            </el-carousel-item>
        </el-carousel>
        <div class="messageContent">
            <el-row :gutter="20">
                <el-col :span="8" v-for="(item,index) in infos" :key="index">
                    <div class="children">
                        <p class="header">
                            <img :src="item.image" alt="">
                            <span class="info">{{item.currentTitle}}</span>
                            <span class="right" @click="showMore(item.type)">查看更多 ></span>
                        </p>
                        <ul v-for='(item2,index2) in item.children' :key="index2">
                            <li>
                                <p class="Title"><span class="left title">{{item2.title}}</span><span class="right state" :class="{'active':item2.state === '发布中'}">{{item2.state}}</span></p>
                                <p @click="toDetail(item.type, item2.id)" class="content">{{item2.content}}<span class="date">{{item2.date}}</span></p>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
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
            imgList:[
                {
                    url: 'static/images/banner.png'
                },
                {
                    url: 'static/images/banner.png'
                },
                {
                    url: 'static/images/banner.png'
                }
            ],
            infos:[
                {   
                    type:'project',
                    currentTitle:'项目信息',
                    image:'static/images/projectLogo.png',
                    children:[
                        {
                            id: 1,
                            title:'无锡中恒制药医药器材采购项目',
                            state:'发布中',
                            content:'萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的',
                            date:'2020-07-27'
                        },
                        {
                            id: 1,
                            title:'无锡中恒制药医药器材采购项目',
                            state:'已结束',
                            content:'萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的',
                            date:'2020-07-27'
                        },
                        {
                            id: 1,
                            title:'无锡中恒制药医药器材采购项目',
                            state:'发布中',
                            content:'萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的',
                            date:'2020-07-27'
                        },
                    ]
                },
                {   type:'buy',
                    currentTitle:'采购计划',
                    image:'static/images/buyLogo.png',
                    children:[
                        {
                            id: 1,
                            title:'无锡中恒制药医药器材采购项目',
                            state:'发布中',
                            content:'萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的',
                            date:'2020-07-27'
                        },
                        {
                            id: 1,
                            title:'无锡中恒制药医药器材采购项目',
                            state:'已结束',
                            content:'萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的',
                            date:'2020-07-27'
                        },
                        {
                            id: 1,
                            title:'无锡中恒制药医药器材采购项目',
                            state:'发布中',
                            content:'萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的',
                            date:'2020-07-27'
                        },
                    ]
                },
                {   type:'sell',
                    currentTitle:'销售信息',
                    image:'static/images/sellLogo.png',
                    children:[
                        {
                            id: 1,
                            title:'无锡中恒制药医药器材采购项目',
                            state:'发布中',
                            content:'萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的',
                            date:'2020-07-27'
                        },
                        {
                            id: 1,
                            title:'无锡中恒制药医药器材采购项目',
                            state:'已结束',
                            content:'萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的',
                            date:'2020-07-27'
                        },
                        {
                            id: 1,
                            title:'无锡中恒制药医药器材采购项目',
                            state:'发布中',
                            content:'萨迪实打实交鞍山对手搞活动不结婚ID附近上动肝火撒飞机盎司附近第三方的',
                            date:'2020-07-27'
                        },
                    ]
                },
            ]
        }
    },
    mounted(){
        var vm = this;
        //监听浏览器窗口大小改变
        window.addEventListener('resize', function() {
            var screenWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
            var bannerHeight = 480 / 1920 * screenWidth;
            document.getElementById('el-carousel').style.height = bannerHeight + 'px';
        }, false);
    },
    methods: {
        toDetail(type, id) {
            this.$router.push({
                path: '/homePage/detail',
                query: {
                    type: type,
                    id: id
                }
            })
        },
        showMore(type) {
            this.$router.push({
                path:'/homePage/list',
                query: {
                    type
                }
            });
        }
    },
}
</script>
<style scoped lang="scss">
#el-carousel{
    min-width: 1200px;
    height: 480px;
}
.el-carousel__container img{
    width:100%;
}
.messageContent{
    width:1200px;
    margin:30px auto;
}
.messageContent .children{
    background: #FFFFFF;
    border: 1px solid #E4E5E6;
    box-shadow: 0 8px 4px 0 rgba(0,0,0,0.05);
    height:328px;
    padding:15px;
}
.messageContent .children .header{
    border-bottom: 1px solid #DEDEDE;
    padding-bottom:15px;
}
.messageContent .children .header img{
    float: left;
}
.messageContent .children .header span{
    line-height: 37px;
}
.messageContent .children .header span.info{
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    color: #333333;
    font-weight: bold;
    margin-left:10px;
    letter-spacing: 0;
}
.messageContent .children .header span.right{
    float:right;
    cursor: pointer;
    color: #4A6EE6;
}
.footer{
    background: #524A44;
    height:60px;
    line-height:60px;
}
.footer div{
    width:1200px;
    margin:0 auto;
    color: #FFFFFF;
    font-size: 12px;
}
.left{
    float:left;
}
.right{
    float:right;
}
ul li{
    cursor: pointer;
}
ul li p{
    overflow: hidden;
}
ul li .Title{
    padding-top:10px;
    padding-bottom:10px;
}
ul li .content{
    position: relative;
    font-size: 12px;
}
ul li .date{
    position: absolute;
    right:0;
    bottom:0;
    color: #999999;
}
ul li .title{
    font-size: 14px;
    color: #555555;
    font-weight: bold;
}
ul li .active{
    color: #FD992F;
}
</style>

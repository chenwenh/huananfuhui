<template>
    <el-container>
        <el-container>
            <el-aside style='width: 189px !important;float:left;background:#F5F5F5'>
                <div class="logo" @click="contentShow = !contentShow" v-show="enterType === 'homes'">
                    <img src="static/images/menu.png" class="productWord">产品中心
                    <i class="el-icon-arrow-right iconRight" style="float:right;"></i>
                    <div class="content" v-show="contentShow"> 
                        <!-- <div style="width:100px;float:left">
                            <p class="title">供应链</p>
                            <ul>
                                <li>订单管理</li>
                                <li>发货管理</li>
                                <li>企业协议</li>
                            </ul>
                        </div>
                        <div style="width:100px;float:right">
                            <p class="title">融资</p>
                            <ul>
                                <li>订单管理</li>
                                <li>发货管理</li>
                                <li>企业协议</li>
                            </ul>
                        </div> -->
                        <div class="squareBox">供应链</div>
                        <div class="squareBox">融资</div>
                        <div class="squareBox">物流公司</div>
                    </div>
                </div>
                <div class="siderBox" v-show="enterType === 'manage'">管理中心</div>
                <sidebar></sidebar>
            </el-aside>
            <el-main style="width:calc(100% - 60px);float:right;background:white;">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import sidebar from '@/components/sideMenu.vue'

    export default {
        name: 'home',
        data () {
            return {
                enterType: '', // 从哪个入口进去管理系统
                contentShow:false,
                userName: JSON.parse(sessionStorage.getItem('user')).username,
                orgName: sessionStorage.getItem('orgName'),
            }
        },
        computed: {
            currentRouter () {
                return this.router
            },
        },
        watch: {
            $route() {
                if (this.enterType !== this.$route.path.split('/')[1]) {
                    this.enterType = this.$route.path.split('/')[1];
                }
            }
        },
        created() {
            this.enterType = this.$route.path.split('/')[1]; // 从哪个入口进入
        },
        methods: {
            handleCommand (command) {
                if (command === 'logout') {
                    sessionStorage.clear()
                    localStorage.clear()
                    this.$router.push({path:'/homePage'});
                }
            },
        },
        components: {
            sidebar
        }
    }
</script>
<style lang="scss" scoped>
    .header{
        float:right;
    }
    .supAttachmentsUpload {
        position: relative;

        /deep/.el-upload-dragger {
            display: none;
        }
    }
    .el-menu-item {
        width: 189px;
        text-align: left;
    }

    .el-submenu {
        text-align: left;
    }

    .el-submenu__title {
        width: 189px;
        text-align: left;
    }

    .el-container {
        width: 100%;
        height: 100%;

        .logo {
            position: relative;
            display: flex;
            cursor: pointer;
            text-align: center;
            align-items: center;
            font-size: 16px;
            color:white;
            padding-right: 0px;
            background: #ED9D03;
            height: 42px;
            line-height: 42px;
            box-sizing: border-box;
            border-bottom: 1px solid #E5E7EA;
            span {
                font-weight: 600;
                font-size: 16px;
                color: #9E6B23;
            }
            .iconRight{
                position: absolute;
                right:20px;
                top:12px;
            }
            .content{
                position: fixed;
                left:189px;
                top:60px;
                width:387px;
                height: 118px;
                z-index: 100;
                background: #F7F7F7;
                border:1px solid white;
                box-shadow: 0px 8px 7px 0px rgba(0,0,0,0.1);
                color:black;
                p.title{
                    color:#444444;
                    font-weight: bold;
                }
                ul{
                    color: #666666;
                    li{
                        font-size:13px;
                        line-height:32px;
                    }
                }
            }
        }

        .header {
            display: flex;
            justify-content: space-between;
            padding-top: 20px;
            height: 86px;
            box-sizing: border-box;

            .searchWrap {
                display: inline-block;
            }

            .el-input /deep/ {
                width: 490px;
                height: 40px;

                .el-input__inner {
                    padding: 0 20px;
                    border: 0;
                    border-radius: 20px;
                }

                .el-input__suffix {
                    right: 14px;
                    font-weight: 600;
                    color: #8C8E90;
                }
            }

            .userIcon {
                margin-top: -10px;
                width: 55px;
                height: 55px;
                cursor: pointer;
                border-radius: 50%;
                box-shadow: 0px 8px 7px 0px rgba(0,0,0,0.1);

                +.el-icon-arrow-down {
                    display: none;
                }
            }
        }

        .el-container {
            // height: 100%;
            // height: 100vh;

            .el-aside {
                height: 100%;
                user-select: none;
            }

            .el-main {
                padding-top: 0;
                height: 100%;
                box-sizing: border-box;
                overflow: unset;
                background-color: #FAFBFF;
                overflow:auto;
            }
        }
    }

    .el-dropdown-menu__item {
        letter-spacing: 0.2em;
    }

    .mainContent.boxShadow {
        box-shadow: unset;
        background: transparent;
        border-bottom-left-radius: 0px;
    }
    .productWord{
        width:22px;
        height:22px;
        margin-left:20px;
        margin-right:6px;
    }
    .squareBox {
        width: 100px;
        height: 53px;
        background: #FFFFFF;
        float: left;
        margin-left: 20px;
        margin-top: 28px;
        line-height: 53px;
        text-align: center;
    }
    .squareBox:hover {
        border:1px solid rgba(237,157,3,1) !important;
    }
    .siderBox {
        height: 66px;
        width: 100%;
        line-height: 66px;
        text-align: center;
        font-size: 16px;
        color: #373D42;
        font-weight: 600;
        border-bottom: 1px solid #DCDCDC;
    }
</style>

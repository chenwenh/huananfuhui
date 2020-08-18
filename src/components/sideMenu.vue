<template>
    <div class="sidebar">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            text-color="#444444"
            unique-opened
            router
            background-color="#F5F5F5"
            ref='sidebar'
            :default-openeds='openeds'
        >
            <template v-for="item in menuList">
                <template v-if="item.subs.length">
                    <el-submenu :index="item.index" :key="item.index" v-if="item.subs.length">
                        <template slot="title">
                            <!-- <i :class="['sideIcon', 'iconfont', item.icon]"></i> -->
                            <i style="margin-left: 27px;"></i>
                            {{ item.title }}
                        </template>
                        <div>
                            <el-menu-item
                              v-for="subItem in item.subs"
                              :key="subItem.index"
                              :index="subItem.index">
                                {{
                                  subItem.title
                                }}
                            </el-menu-item>
                        </div>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" v-if="item.index !== 'assetSetting'" :key="item.index">
                        <i :class="['sideIcon', 'iconfont', item.icon]"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
        <div class="fixedBottom" @click="goHome">
            <!-- <i class="el-icon-menu"></i> -->
            <img src="./../assets/img/iconhome.png" style="width:16px; vertical-align:middle; margin-right:5px;">
            返回平台
        </div>
    </div>
</template>

<script>
  export default {
    name: 'sideBar',
    data () {
        return {
            menuList: [
                {
                    "icon": "el-icon-search",
                    "index": "12",
                    "title": "协议管理",
                    "subs": [
                        {
                            "index": "/agreementMaintenance",
                            "title": "协议维护",
                        },
                        {
                            "index": "/signAgreement",
                            "title": "协议签署",
                        },
                        {
                            "index": "/businessOpenAudit",
                            "title": "业务开通审核",
                        },
                        {
                            "index": "/mapComponent",
                            "title": "地图",
                        },
                    ]
                },
            ],
            openeds: [],
        }
    },
    computed: {
        activeIndex () {
            if (this.$route.path ==='/homes'){
                return '/agreementMaintenance'
            }else{
                return this.$route.path;
            }  
        }
    },
    watch: {
    },
    methods: {
        goHome() {
            this.$router.push({
                path: '/home'
            });
        }
    },
    mounted () {
        
    }
  }
</script>

<style scoped lang="scss">
    .el-menu-vertical-demo
    /deep/ .el-menu--inline {
        .el-menu-item {
            position: relative;
            width: auto !important;
            font-size: 12px !important;
            color: #666 !important;
        }
    }

    .el-aside {
        position: relative;
        background: #F5F5F5;
        
        .sideIcon {
            display: inline-block;
            margin-top: -3px;
            margin-right: 8px;
            font-size: 18px;
            color: #B7C2D1 !important;
        }

        .el-menu-item.is-active /deep/,
        .el-menu-item.is-active:hover {
            color: #FEA700 !important;
            // background: #FFF1DB !important;
            background: #FFFFFF !important;
            text-align: center;

            .sideIcon {
                color: #E79C2A !important;
            }
        }

        .el-menu-item:hover /deep/ {
            color: #E59D28 !important;
            background: transparent !important;

            .sideIcon {
                color: #E79C2A !important;
            }
        }

        .sidebar {
            width:100%;
            // padding-top: 9px;
            ul {
                border-right:none !important;
            }
            .sideConfig {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 189px;
                height: 45px;
                border-top: 1px solid #E7EFF7;
                text-align: center;
                line-height: 45px;
                font-size: 14px;
                color: #B7C2D1;
                cursor: not-allowed;

                .iconfont {
                    // margin-right: 12px;
                }
            }
            .active, .active:hover {
                color: #333;
                cursor: pointer;
                // .iconfont {
                //     color: #228BF7;
                // }
            }

            .fixedBottom{
                border-top: 1px solid #EDEDED;
                position:fixed;
                background:#F5F5F5;
                height:50px;
                line-height: 50px;
                text-align: center;
                width: 189px;
                bottom:0;
                cursor: pointer;
                font-size: 12px;

                i {
                    color:#FEA700;
                }
            }
            .fixedBottom:hover {
               background: #FFFFFF!important;
               color:#FEA700;
            }

        }
    }

    .el-submenu .el-menu-item {
        text-align: center;
    }
</style>

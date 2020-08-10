<template>
    <div class="sidebar">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            text-color="#4A3718"
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
                            <i class="sideBar"></i>
                            <!-- <i :class="['sideIcon', 'iconfont', item.icon]"></i> -->
                            {{ item.title }}
                        </template>
                        <div>
                            <el-menu-item
                              v-for="subItem in item.subs"
                              :key="subItem.index"
                              :index="subItem.index">
                                <i class="sideBar"></i>
                                {{
                                  subItem.title
                                }}
                            </el-menu-item>
                        </div>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" v-if="item.index !== 'assetSetting'" :key="item.index">
                        <i class="sideBar"></i>
                        <i :class="['sideIcon', 'iconfont', item.icon]"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
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
                            "index": "/contractQuery",
                            "title": "协议维护",
                        },
                        {
                            "index": "/orderQuery",
                            "title": "协议签署",
                        },
                    ]
                },
            ],
            openeds: [],
        }
    },
    computed: {
        activeIndex () {
            if (this.$route.path ==='/home2'){
                return '/contractQuery'
            }else{
                return this.$route.path;
            }  
        }
    },
    watch: {
    },
    methods: {
        
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

    .sideBar {
        display: none;
        position: absolute;
        left: 0;
        top: 20px;
        width: 4px;
        height: 19px;
        background: #E59D28;
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
            color: #4A3718 !important;
            background: #FFF1DB !important;

            .sideIcon {
                color: #E79C2A !important;
            }

            .sideBar {
                display: block;
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
                width: 220px;
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
        }
    }
</style>

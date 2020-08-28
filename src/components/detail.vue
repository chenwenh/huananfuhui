<template>
<div>
    <div class="baseInfo">
        <el-col 
            class="inner" 
            :span="24" 
            v-for="(item, key) in detailInfo" 
            :key="item+key">
            <el-col :span="24" class="elCol" style="">
                <el-col class="elLable" :span="10" style="text-align:left; padding-left:10px; color:#666666;">
                    {{item}}
                </el-col>
                <el-col :span="14">
                    <div class="elInput" style="padding-left: 10px;">
                        <span v-if="key=='publishStatus'" class="blackColor">
                            {{$appConst.publishStatus[diaComData[key]]}}
                        </span>
                        <span v-else class="blackColor">
                            {{diaComData[key]}}
                        </span>
                    </div>
                </el-col>
            </el-col>
        </el-col>
        <!-- <el-col v-show="detailInfo.hasOwnProperty('content')">
            <el-col  class="elCol">
                <el-col class="elLable" :span="4" style="text-align:right; padding-right:5px; color:#48576a;margin-left:-9px;">
                    {{detailInfo['content']}}:
                </el-col>
                <el-col :span="20">
                    <span style="margin-left:17px;display:inline-block;">{{diaComData['content']}}</span>
                </el-col>
            </el-col>
        </el-col> -->
        <div style="clear:both;"></div>
    </div>
    <!-- <div class="dialog-footer" style="text-align:center;" v-show="closeButton">
        <el-button plain  @click="close()" size="medium">关闭</el-button>
    </div> -->
</div>
</template>
<script>
export default {
    props:['detailInfo','closeButton'],
    data(){
        return{
            diaComData: {},
        }
    },
    methods:{
        init(row){
            this.diaComData = Object.assign({},row);
        },
        close() {
            this.$bus.$emit('closeDialog');
        },
    },
    mounted(){
        console.log(this.detailInfo,'this.detailInfo');
    },
}
</script>
<style scoped>
.baseInfo .inner{
    line-height: 32px;
}
.baseInfo .inner:nth-child(odd){
    background: #FBFBFB;
}
.blackColor{
    color:#303133;
}
</style>
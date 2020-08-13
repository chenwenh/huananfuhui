<template>
<div>
    <div class="baseInfo" style="padding:20px;">
        <el-col 
            class="inner" 
            :span="12" 
            v-for="(item, key) in detailInfo" 
            :key="item+key">
            <el-col :span="24" class="elCol" style="margin-bottom:10px;">
                <el-col class="elLable" :span="8" style="text-align:right; padding-right:5px; color:#48576a; ">
                    {{item}}：
                </el-col>
                <el-col :span="15">
                    <div class="elInput" style="border-bottom: 1px dashed #ddd; height: 18px; padding-left: 10px;">
                        {{diaComData[key]}}
                    </div>
                </el-col>
            </el-col>
        </el-col>
        <div style="clear:both;"></div>
    </div>
    <div class="dialog-footer" style="text-align:center;" v-show="closeButton">
        <el-button plain  @click="close()" size="medium">关闭</el-button>
    </div>
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
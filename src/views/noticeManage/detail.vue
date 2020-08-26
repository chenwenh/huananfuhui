
<template>
    <div class="notice">
        <h2 style="text-align:center;">{{form.title}}</h2>
        <div>
            <el-input type="textarea" v-model="form.content" autosize disabled=""></el-input>
        </div>
        <div class="dialog-footer" style="text-align:center;margin-top:20px;">
            <el-button plain  @click="close()" size="medium">关闭</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            form:{
                title:'',
                content:""
            }
        }
    },
    methods:{
        init(row){
            this.form = Object.assign({},row);
            $('.notice .el-textarea__inner').attr('disabled',true);
        },
        close(){
            this.$bus.$emit('closeDialog');
        }
    },
    mounted(){
        
    }
}
</script>
<style scoped>
.el-textarea.is-disabled .el-textarea__inner{
    background-color: none;
    border-color: none;
    color:black;
}
</style>
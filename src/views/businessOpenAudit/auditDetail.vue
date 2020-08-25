<template>
<div v-loading='loading'>
    <div class="baseInfo" style="padding:20px;">
        <el-col 
            class="inner" 
            :span="12" 
            v-for="(item, key) in detailInfo" 
            :key="item+key">
            <el-col :span="24" class="elCol">
                <el-col class="elLable" :span="8">
                    {{item}}：
                </el-col>
                <el-col :span="15">
                    <div class="elInput">
                        {{diaComData[key]}}
                    </div>
                </el-col>
            </el-col>
        </el-col>
        <div style="clear:both;"></div>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="specialsForm" style="width:100%;">
          <div style="overflow:hidden;">
                <el-form-item label="审核意见" prop="action">
                   <el-select v-model="ruleForm.action" placeholder="请选择审核意见" clearable=""  style="width:300px;">
                        <el-option label="通过" value="CONFIRM"></el-option>
                        <el-option label="拒绝" value="REJECT"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="拒绝理由" v-if="ruleForm.action === 'REJECT'">
                    <el-input type="textarea" v-model="ruleForm.comments" placeholder="请输入拒绝理由"></el-input>
                </el-form-item>
          </div>
        </el-form>
    <div class="dialog-footer" style="text-align:center;">
        <el-button type="info" @click="close()" class="radiusNone">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" class="primaryButton radiusNone">
            <span v-if="ruleForm.action === 'CONFIRM'">下一步</span>
            <span v-else>提交</span>
        </el-button>      
    </div>
</div>
</template>
<script>
export default {
    props:['detailInfo'],
    data(){
        return{
            loading: false,
            diaComData: {},
            ruleForm:{
                action: 'CONFIRM',
                comments: ''
            },
            rules:{
                action: [
                    { required: true, message: '审核意见不能为空！', trigger: 'change' }
                ],
            }
        }
    },
    methods:{
        init(row){
            this.diaComData = Object.assign({},row);
            this.$refs['ruleForm'].resetFields();
        },
        close() {
            this.$bus.$emit('closeDialog');
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const url = `${this.$apiUrl.serviceFulfillment.process}/${this.diaComData.id}/${this.ruleForm.action}`;  
                    let params = {};
                    if (this.ruleForm.action === 'REJECT') {
                        params.comments = this.ruleForm.comments;
                    }
                    this.$http.post(url, params)
                        .then(res => {
                            if (res.data.status !== 200) return;
                            if (this.ruleForm.action === 'CONFIRM') {
                                this.$message.success('审核通过');
                            }
                            if (this.ruleForm.action === 'REJECT') {
                                this.$message.success('审核已被拒绝');
                            }
                            this.$emit('search');
                        }).catch(err => {
                            this.$message.warning(err.message || '服务器错误，请稍后再试!');
                        });
                } else {
                    return false;
                }
            });
        },
    }
}
</script>
<style lang="less" scoped>
    .elCol {
        margin-bottom:10px;
    }
    .elLable {
        text-align:right;
        padding-right:5px;
        color:#48576a;
    }
    .elInput {
        border-bottom: 1px dashed #ddd;
        height: 18px;
        padding-left: 10px;
    }
</style>
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
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="specialsForm" style="width:100%;">
          <div style="overflow:hidden;">
                <el-form-item label="审核意见" prop="audit">
                   <el-select v-model="ruleForm.audit" placeholder="请选择审核意见" clearable=""  style="width:300px;">
                        <el-option label="通过" value="true"></el-option>
                        <el-option label="拒绝" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="拒绝理由" v-if="ruleForm.audit=='false'">
                    <el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入拒绝理由"></el-input>
                </el-form-item>
          </div>
        </el-form>
    <div class="dialog-footer" style="text-align:center;">
        <el-button type="info" @click="close()" class="radiusNone">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" class="primaryButton radiusNone">提交</el-button>      
    </div>
</div>
</template>
<script>
export default {
    props:['detailInfo'],
    data(){
        return{
            diaComData: {},
            ruleForm:{
                audit:''
            },
            rules:{
                audit: [
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
                   this.close();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
    mounted(){
        console.log(this.detailInfo,'this.detailInfo');
    },
}
</script>
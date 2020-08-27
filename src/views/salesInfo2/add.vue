<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="specialsForm" style="width:100%;">
            <div style="overflow:hidden;">
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="截止日期" prop="endDate">
                        <el-date-picker
                            v-model="ruleForm.endDate"
                            type="date"
                            placeholder="选择日期" style="width:100%;" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="内容" prop="content" style="width:90%;">
                        <el-input v-model="ruleForm.content" type="textarea"></el-input>
                    </el-form-item>
            </div>
            <detailEntry ref="detailEntry"></detailEntry>
            <div style="text-align:right;width:100%;">
                <el-form-item>
                    <el-button type="info" @click="close()" >取消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')" class="primaryButton" :loading="loading">提交</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
import detailEntry from '@/components/detailEntry.vue';
export default {
    props:[],
    data(){
        return{
            loading:false,
            ruleForm: {
                title:'',
                endDate: '',
                content:'',
                publishStatus:'NO_PUBLISH'
            },
            projects:[],
            rules: {
                title: [
                    { required: true, message: '标题不能为空！', trigger: 'blur' }
                ],
                endDate: [
                    { required: true, message: '截止日期不能为空！', trigger: 'change' }
                ],
            },
            isAdd:true
        }
    },
    components: {
        detailEntry
    },
    methods:{
        submitForm(formName) {
            var vm = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.loading = true;
                    var params = vm.ruleForm;
                    params['@class'] = 'com.evisible.hnfh.entity.domain.SalesInfoBo';
                    var url = this.isAdd ? vm.$apiUrl.salesInfo.save : vm.$apiUrl.salesInfo.update;
                    params.goods = vm.$refs.detailEntry.getGoods();
                    vm.$http.post(`${url}`,params)
                    .then(res=>{
                        if(res.data.status == vm.$appConst.status){
                            vm.loading = false;
                            if(this.isAdd){
                              vm.$message.success('添加成功');
                            }else{
                              vm.$message.success('修改成功');
                            }                            
                            vm.close();
                            vm.$emit('search');
                        }
                    }).catch(err=>{
                        vm.$message.error(err.data.message);
                        vm.loading = false;
                    })
                } else {
                    return false;
                }
            });
        },
        init(flag,data){
            this.isAdd = flag;
            if(!flag){
                this.ruleForm = Object.assign({},data);
                this.$refs.detailEntry.setGoods(this.ruleForm.goods);
            }
        },
        resetForm() {
            this.$refs['ruleForm'].resetFields();
        },
        close(){
            this.$bus.$emit('closeDialog');
        },
    }
}
</script>
<style  scoped>
.specialsForm  .el-form-item{
    width:45%;
    display: inline-block;
}
</style>
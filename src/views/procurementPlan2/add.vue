<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="specialsForm" style="width:100%;">
            <div style="overflow:hidden;">
                    <el-form-item label="项目名称" prop="projectId">
                        <el-select v-model="ruleForm.projectId" placeholder="" clearable=""  style="width:100%;" :disabled="!isAdd">
                            <el-option v-for="item in projects" :key="item.id" :label="item.title" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="计划单号" prop="planNo">
                        <el-input v-model="ruleForm.planNo" placeholder="请输入计划单号"></el-input>
                    </el-form-item>
                    <el-form-item label="部门" prop="department">
                        <el-input v-model="ruleForm.department" placeholder="请输入部门"></el-input>
                    </el-form-item>
                    <el-form-item label="业务员" prop="salesMan">
                        <el-input v-model="ruleForm.salesMan" placeholder="请输入业务员"></el-input>
                    </el-form-item>
                    <el-form-item label="截止日期" prop="endDate">
                    <el-date-picker
                            v-model="ruleForm.endDate"
                            type="date"
                            placeholder="选择日期" style="width:100%;" value-format="yyyy-MM-dd">
                        </el-date-picker>
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
                planNo: '',
                department: '',
                salesMan:'',
                endDate: '',
                projectId:'',
                publishStatus:'NO_PUBLISH'
            },
            projects:[],
            rules: {
                projectId: [
                    { required: true, message: '请先选择项目！', trigger: 'change' }
                ],
                planNo: [
                    { required: true, message: '计划单号不能为空！', trigger: 'blur' }
                ],
                department: [
                    { required: true, message: '部门不能为空！', trigger: 'blur' }
                ],
                salesMan: [
                    { required: true, message: '业务员不能为空！', trigger: 'blur' }
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
                    params['@class'] = 'com.evisible.hnfh.entity.domain.PurchasePlanInfoBo';
                    var url = this.isAdd ? vm.$apiUrl.purchase.save : vm.$apiUrl.purchase.update;
                    params.projectInfo = vm.projects.find(item=>item.id==vm.ruleForm.projectId);
                    params.goods = vm.$refs.detailEntry.getGoods();
                    params.projectInfo['@class'] = 'com.evisible.hnfh.entity.domain.ProjectInfoBo';
                    delete params.projectId;
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
            this.queryProject();
            if(!flag){
                this.ruleForm = Object.assign({},data);
                this.ruleForm.projectId = this.ruleForm.projectInfo.id;
                this.$refs.detailEntry.setGoods(this.ruleForm.goods);
            }
        },
        // 获取全部的项目
        queryProject(){
            const params = {
                page: 1,
                pageSize: 100000
            };
            // 获取意向申请列表
            const url = `${this.$apiUrl.project.query}`;
            this.$http.get(url,{params})
                .then(res => {
                if (res.data.status !== 200) return;
                    this.projects = res.data.data.content;
                }).catch(err => {
                    this.$message.warning(err.data.message || '服务器错误，请稍后再试!');
                });
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
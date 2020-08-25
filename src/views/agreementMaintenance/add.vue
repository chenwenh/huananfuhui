<template>
    <div v-loading='loading'>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="specialsForm" style="width:100%;">
          <div style="overflow:hidden;">
              <div style="width:44%;float:left;">
                <el-form-item label="签订方式" prop="signMode">
                   <el-select v-model="ruleForm.signMode" placeholder="" clearable=""  style="width:100%;">
                        <el-option label="线上" value="onLine"></el-option>
                        <el-option label="纸质" value="paper"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合同类型" prop="contractType">
                    <el-select v-model="ruleForm.contractType" placeholder="" clearable=""  style="width:100%;">
                        <el-option label="是" value="true"></el-option>
                        <el-option label="否" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合同号" prop="contractNum">
                    <el-input v-model="ruleForm.contractNum"></el-input>
                </el-form-item>
                <el-form-item label="合同名称" prop="contractName">
                    <el-input v-model="ruleForm.contractName"></el-input>
                </el-form-item>
                <el-form-item label="合同金额" prop="contractAmount">
                    <el-input v-model="ruleForm.contractAmount"></el-input>
                </el-form-item>
                <el-form-item label="起始日期" prop="startDate" >
                    <el-date-picker
                        v-model="ruleForm.startDate"
                        type="date"
                        placeholder="选择日期" style="width: 100%;" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="签署日期" prop="signDAate" v-if="ruleForm.signMode === 'paper'">
                   <el-date-picker
                        v-model="ruleForm.signDAate"
                        type="date"
                        placeholder="选择日期" style="width:100%;" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
              </div>

              <div style="width:44%;float:right;">
                <el-form-item label="甲方" prop="jiafang" class="inputwidth">
                  <el-input v-model="ruleForm.jiafang"></el-input>
                </el-form-item>
                <el-form-item label="乙方" prop="yifang" class="inputwidth">
                  <el-input v-model="ruleForm.yifang"></el-input>
                </el-form-item>
                <!-- <el-form-item label="丙方" prop="bingfang"  class="inputwidth">
                  <el-input v-model="ruleForm.bingfang"></el-input>
                </el-form-item> -->
                <el-form-item label="合同层级" prop="level"  class="inputwidth">
                  <el-input v-model="ruleForm.level"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="department"   class="inputwidth">
                    <el-input v-model="ruleForm.department"></el-input>
                </el-form-item>
                <el-form-item label="到期日期" prop="endDate" >
                   <el-date-picker
                        v-model="ruleForm.endDate"
                        type="date"
                        placeholder="选择日期" style="width:100%;" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="合同附件" prop="" v-if="ruleForm.signMode === 'paper'">
                    <textStyleUpload ref="textStyleUpload" fileAccept= 'PDF,pdf'></textStyleUpload>
                </el-form-item>
                <el-form-item label="线上签署" prop="" v-if="ruleForm.signMode === 'onLine'">
                     <span @click="signAgreement()" class="blue pointer" style="position:relative;">签署协议</span>
                </el-form-item>
              </div>
          </div>  
            <div style="text-align:center;width:100%;">
                <el-form-item>
                    <el-button type="info" @click="close()" >取消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')" class="primaryButton">提交</el-button>
                    <span @click="preView()" class="blue pointer" style="position:relative;right:-20px;">预览</span>
                </el-form-item>
            </div>
        </el-form>
        <show-file-detail ref="showFileDetail"></show-file-detail>
    </div>
</template>
<script>
import showFileDetail from '@/components/showFileDetail.vue';
import   textStyleUpload from '@/components/textStyleUpload.vue';

export default {
    props:['fromAudit'],
    data(){
        return{
            loading: false,
            filePrev: {
                dataPoolURL: "/tdp/0f307499499c478089f874edfe389957/network/a25eaecd3d6f4a35a4d163b0e9f69d9d/ledger/95d07aa9f7884212a9618f4d537ed998/v2.0/attachment/2353157961395",
                description: "合同文本电子版",
                fileId: "fa39e420-85d5-4ba7-a1e5-76c7b61b7252",
                fileName: "国内保理业务合同(常用).pdf",
                size: 188717,
                uid: "1587630180252",
            },
            ruleForm: {
                id: '',
                signMode: 'onLine',
                contractType: '',
                contractNum: '',
                contractName: '',
                contractAmount: '',
                startDate: '',
                endDate: '',
                signDAate:'',
                department: '',
                jiafang: "",
                yifang: "",
                // bingfang: '',
                level: 0,
            },
            rules: {
                signMode: [
                { required: true, message: '不能为空！', trigger: 'change' }
                ],
                contractType: [
                { required: true, message: '不能为空！', trigger: 'blur' }
                ],
                contractNum: [
                { required: true, message: '不能为空！', trigger: 'change' }
                ],
                contractName:[
                { required: true, message: '不能为空！', trigger: 'change' }
                ],
                contractAmount: [
                { required: true, message: '不能为空！', trigger: 'change' }
                ],
                jiafang: [
                { required: true, message: '不能为空！', trigger: 'blur' },
                ],
                yifang: [
                { required: true, message: '不能为空！', trigger: 'blur' },
                ],
                // bingfang: [
                // { required: true, message: '不能为空！', trigger: 'blur' },
                // ],
                level: [
                { required: true, message: '不能为空！', trigger: 'blur' }
                ],
                startDate: [
                { required: true, message: '不能为空！', trigger: 'blur' }
                ],
            },

        }
    },
    components: {
        showFileDetail,
        textStyleUpload
    },
    methods:{
        // 预览
        preView() {
            this.$refs.showFileDetail.showFile(this.filePrev);
        },
        // 安心签 签署
        signAgreement(){

        },
        // 提交操作
        submitForm(formName) {
            var vm = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 业务开通审核
                    if(vm.fromAudit){
                        vm.$store.state.step = 3;
                        // 线上
                        if (this.ruleForm.signMode === 'onLine') {
                            // 平台审核
                            const url = `${this.$apiUrl.agreement.sign}`;
                            let params = {
                            };
                            this.$http.put(url, params)
                                .then(res => {
                                if (res.data.status !== 200) return;
                                    this.$message.success('平台签署成功');
                                    vm.close();
                                }).catch(err => {
                                    this.$message.warning(err.message || '服务器错误，请稍后再试!');
                                });
                        }
                        // 线下
                        if (this.ruleForm.signMode === 'paper') {
                            // 平台审核
                            const url = `${this.$apiUrl.credit.apply}`;
                            let params = {
                                orgId: JSON.parse(sessionStorage.getItem('user')).orgId,
                                pattern: "PATTERN_A"
                            };
                            this.$http.post(url, params)
                                .then(res => {
                                if (res.data.status !== 200) return;
                                    this.$message.success('授信申请成功');
                                    vm.close();
                                }).catch(err => {
                                    this.$message.warning(err.message || '服务器错误，请稍后再试!');
                                });
                        }
                    }
                } else {
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs['ruleForm'].resetFields();
        },
        init(row) {
            const vm = this;
            this.$refs['ruleForm'].resetFields();
            Object.keys(row).forEach(function(key){
                if (vm.ruleForm.hasOwnProperty(key)) {
                    console.log('row', key, row[key], vm.ruleForm[key]);
                    vm.ruleForm[key] = row[key]
                }
            });
        },
        close(){
            this.$bus.$emit('closeDialog');
        },
    }
}
</script>
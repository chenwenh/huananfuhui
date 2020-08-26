<template>
    <div v-loading='loading'>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="specialsForm" style="width:100%;">
           <div style="overflow:hidden;">
              <div style="width:44%;float:left;">
                <el-form-item label="签订方式" prop="signMode">
                   <el-select v-model="ruleForm.signMode" placeholder="" clearable=""  style="width:100%;" :disabled="fromAudit">
                        <el-option label="线上" value="onLine"></el-option>
                        <el-option label="线下" value="paper"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合同类型" prop="contractType">
                    <el-select v-model="ruleForm.contractType" placeholder="" clearable=""  style="width:100%;" :disabled="fromAudit">
                        <el-option v-for="(item, key) in $appConst.agreementType" :key="key" :label="item" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="合同流水号" prop="contractSerialNum">
                    <el-input v-model="ruleForm.contractSerialNum"></el-input>
                </el-form-item> -->
                <el-form-item label="合同编号" prop="contractNum" v-if="ruleForm.signMode === 'paper'">
                    <el-input v-model="ruleForm.contractNum"></el-input>
                </el-form-item>
                <el-form-item label="合同名称" prop="contractName">
                    <el-input v-model="ruleForm.contractName"></el-input>
                </el-form-item>
                <el-form-item label="合同金额" prop="contractAmount">
                    <el-input v-model="ruleForm.contractAmount"></el-input>
                </el-form-item>
                <el-form-item label="到期类型" prop="expireType">
                   <el-select v-model="ruleForm.expireType" placeholder="" clearable=""  style="width:100%;">
                        <el-option label="固定日期" value="固定日期"></el-option>
                        <el-option label="项目结束" value="项目结束"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="起始日期" prop="startDate" >
                    <el-date-picker
                        v-model="ruleForm.startDate"
                        type="date"
                        placeholder="选择日期" style="width: 100%;" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="签署日期" prop="signDate">
                   <el-date-picker
                        v-model="ruleForm.signDate"
                        type="date"
                        placeholder="选择日期" style="width:100%;" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="到期日期" prop="endDate" >
                   <el-date-picker
                        v-model="ruleForm.endDate"
                        type="date"
                        placeholder="选择日期" style="width:100%;" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
              </div>

              <div style="width:44%;float:right;">
                <el-form-item label="追索权" prop="recourse" class="inputwidth">
                  <el-radio v-model="ruleForm.recourse" :label="true">有</el-radio>
                  <el-radio v-model="ruleForm.recourse" :label="false">无</el-radio>
                </el-form-item>
                <el-form-item label="甲方" prop="firstParty" class="inputwidth">
                  <el-input v-model="ruleForm.firstParty"></el-input>
                </el-form-item>
                <el-form-item label="乙方" prop="secondParty" class="inputwidth">
                  <el-input v-model="ruleForm.secondParty"></el-input>
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
                <el-form-item label="保证金比例" prop="marginLevel"   class="inputwidth">
                    <el-input v-model="ruleForm.marginLevel"></el-input>
                </el-form-item>
                <el-form-item label="标的数量" prop="markNumber"   class="inputwidth">
                    <el-input v-model="ruleForm.markNumber"></el-input>
                </el-form-item>
                <el-form-item prop="" v-if="ruleForm.signMode === 'paper'">
                    <span slot="label"><span style="color:#F56C6C">* </span>合同</span>
                    <textStyleUpload ref="textStyleUpload" fileAccept= 'PDF,pdf'></textStyleUpload>
                </el-form-item>
                <!-- <el-form-item prop="" v-if="ruleForm.signMode === 'onLine'">
                    <span slot="label"><span style="color:#F56C6C">* </span>合同</span>
                     <span @click="signAgreement()" class="blue pointer" style="position:relative;">签署协议</span>
                </el-form-item> -->
              </div>
            </div>  
            <el-form-item label="备注" prop="comments" v-if="ruleForm.signMode === 'onLine'">
                <el-input maxlength="100" type="textarea" v-model="ruleForm.comments"></el-input>
            </el-form-item>
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
                signMode: 'onLine', // 签订方式
                contractType: '', // 合同类型
                contractSerialNum: '', //合同流水号
                contractNum: '', // 合同编号
                contractName: '', // 合同名称
                contractAmount: '', // 合同金额
                expireType: '', // 到期类型
                startDate: '', // 起始日期
                signDate:'', // 签署日期
                recourse: true, // 追索权
                firstParty: "", // 甲方
                secondParty: "", // 乙方
                level: null, // 合同层级
                department: '', // 部门
                marginLevel: '', // 保证金比例
                markNumber: '', // 标的数量
                endDate: '', // 到期时间
                comments: '', // 备注
                // bingfang: '',
            },
            rules: {
                // 签订方式
                signMode: [
                    { required: true, message: '不能为空！', trigger: 'change' }
                ],
                // 合同流水号
                contractSerialNum: [
                    { required: true, message: '不能为空！', trigger: 'blur' },
                    { min: 1, max: 30, message: '长度不能超过30个字符', trigger: 'blur' }
                ],
                // 合同类型
                contractType: [
                    { required: true, message: '不能为空！', trigger: 'change' }
                ],
                // 合同编号
                contractNum: [
                    { required: true, message: '不能为空！', trigger: 'blur' },
                    { min: 1, max: 30, message: '长度不能超过30个字符', trigger: 'blur' }
                ],
                // 合同名称
                contractName:[
                    { required: true, message: '不能为空！', trigger: 'blur' },
                    { min: 1, max: 30, message: '长度不能超过30个字符', trigger: 'blur' }
                ],
                // 追索权
                recourse: [
                    { required: true, message: '不能为空！', trigger: 'change' }
                ],
                // 合同金额
                contractAmount: [
                    { required: true, message: '不能为空！', trigger: 'change' },
                    { validator: this.$validate.twoDecimalPlaces, trigger: 'change'}
                ],
                // 甲方
                firstParty: [
                    { required: true, message: '不能为空！', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
                ],
                // 乙方
                secondParty: [
                    { required: true, message: '不能为空！', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
                ],
                level: [
                    { required: true, message: '不能为空！', trigger: 'blur' }
                ],
                // 签署日期
                signDate: [
                    { required: true, message: '不能为空！', trigger: 'change' }
                ],
                // 起始日期
                startDate: [
                    { required: true, message: '不能为空！', trigger: 'change' }
                ],
                // 保证金比例
                marginLevel: [
                    { required: true, message: '不能为空！', trigger: 'change' },
                    { validator: this.$validate.fourDecimalPlaces, trigger: 'change'}
                ],
                // 标的数量
                markNumber: [
                    { required: true, message: '不能为空！', trigger: 'change' },
                    { validator: this.$validate.integer, trigger: 'change'}
                ],
                // 到期类型
                expireType: [
                    { required: true, message: '不能为空！', trigger: 'change' }
                ],
                // 到期日期
                endDate: [
                    { required: true, message: '不能为空！', trigger: 'change' }
                ],
                // 部门
                department: [
                    { required: true, message: '不能为空！', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度不能超过20个字符', trigger: 'blur' }
                ]
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
        init(row, templateType) {
            const vm = this;
            this.$refs['ruleForm'].resetFields();
            Object.keys(row).forEach(function(key){
                if (vm.ruleForm.hasOwnProperty(key)) {
                    console.log('row', key, row[key], vm.ruleForm[key]);
                    vm.ruleForm[key] = row[key]
                }
            });
            vm.ruleForm.contractType = templateType;
        },
        close(){
            this.$bus.$emit('closeDialog');
        },
    }
}
</script>
<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="specialsForm" style="width:100%;">
          <div style="overflow:hidden;">
              <div style="width:44%;float:left;">
                <el-form-item label="签订方式" prop="signMode">
                   <el-select v-model="ruleForm.signMode" placeholder="" clearable=""  style="width:100%;">
                        <el-option label="线上" value="onLine"></el-option>
                        <el-option label="纸质" value="paper"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合同类型" prop="designated">
                    <el-select v-model="ruleForm.designated" placeholder="" clearable=""  style="width:100%;">
                        <el-option label="是" value="true"></el-option>
                        <el-option label="否" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合同模板" prop="designated">
                    <el-select v-model="ruleForm.designated" placeholder="" clearable=""  style="width:100%;">
                        <el-option label="是" value="true"></el-option>
                        <el-option label="否" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合同名称" prop="contextOverview">
                    <el-input v-model="ruleForm.contextOverview"></el-input>
                </el-form-item>
                <el-form-item label="合同金额" prop="contextOverview">
                    <el-input v-model="ruleForm.contextOverview"></el-input>
                </el-form-item>
                <el-form-item label="起始日期" prop="contextOverview" >
                    <el-date-picker
                        v-model="ruleForm.value1"
                        type="date"
                        placeholder="选择日期" style="width:305px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="合同附件" prop="contextOverview" v-if="ruleForm.signMode === 'paper'">
                    <upload-file ref="uploadFile" drag="true" @fileChange="fileChange"></upload-file>
                </el-form-item>
              </div>

              <div style="width:44%;float:right;">
                <el-form-item label="甲方" prop="finAmount" class="inputwidth">
                  <el-input v-model="ruleForm.finAmount"></el-input>
                </el-form-item>
                <el-form-item label="乙方" prop="finRate" class="inputwidth">
                  <el-input v-model="ruleForm.finRate"></el-input>
                </el-form-item>
                <el-form-item label="丙方" prop="paymentDays"  class="inputwidth">
                  <el-input v-model="ruleForm.paymentDays"></el-input>
                </el-form-item>
                <el-form-item label="合同层级" prop="finFee"  class="inputwidth">
                  <el-input v-model="ruleForm.finFee"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="desc"   class="inputwidth">
                    <el-input v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="到期日期" prop="finIntention" >
                   <el-date-picker
                        v-model="ruleForm.value1"
                        type="date"
                        placeholder="选择日期" style="width:302px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="签署日期" prop="finIntention" v-if="ruleForm.signMode === 'paper'">
                   <el-date-picker
                        v-model="ruleForm.value1"
                        type="date"
                        placeholder="选择日期" style="width:302px;">
                    </el-date-picker>
                </el-form-item>
              </div>
          </div>
             <span @click="signAgreement()" class="blue pointer" style="position:relative;right:-20px;">签署协议</span>
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
import uploadFile from '@/components/uploadFile.vue';
import showFileDetail from '@/components/showFileDetail.vue';

export default {
    props:['fromAudit'],
    data(){
        return{
            filePrev: {
                dataPoolURL: "/tdp/0f307499499c478089f874edfe389957/network/a25eaecd3d6f4a35a4d163b0e9f69d9d/ledger/95d07aa9f7884212a9618f4d537ed998/v2.0/attachment/2353157961395",
                description: "合同文本电子版",
                fileId: "fa39e420-85d5-4ba7-a1e5-76c7b61b7252",
                fileName: "国内保理业务合同(常用).pdf",
                size: 188717,
                uid: "1587630180252",
            },
            ruleForm: {
                signMode: '',
                value1:'',
                prepaymentAllowed: true,//允许提前还款
                repaymentMethod: "ONE_TIME_DEBT_SERVICE",//还款方式
                entityNo: '',
                finIntention:"",
                finType: "ACCOUNTING_FINANCING",
                contextOverview: '',
                tradeAmount: "",
                desc: '',
                factoringType: '',
                finAmount: "",
                finRate: "",
                paymentDays: '',
                finFee: 0,
                effBindingTime: '',
                attachments: [],
                designated:"",
                contextUid:"",//贸易合同uid
                contexts:[],//结算单列表
                participants:[],
                finOrgId:""
            },
            rules: {
                signMode: [
                { required: true, message: '不能为空！', trigger: 'change' }
                ],
                tradeAmount: [
                { required: true, message: '不能为空！', trigger: 'blur' }
                ],
                factoringType: [
                { required: true, message: '不能为空！', trigger: 'change' }
                ],
                designated:[
                { required: true, message: '不能为空！', trigger: 'change' }
                ],
                finOrgId: [
                { required: true, message: '不能为空！', trigger: 'change' }
                ],
                finAmount: [
                { required: true, message: '不能为空！', trigger: 'blur' },
                ],
                finRate: [
                { required: true, message: '不能为空！', trigger: 'blur' },
                ],
                paymentDays: [
                { required: true, message: '不能为空！', trigger: 'blur' },
                ],
                finFee: [
                { required: true, message: '不能为空！', trigger: 'blur' }
                ],
                effBindingTime: [
                { required: true, message: '不能为空！', trigger: 'blur' }
                ],
            },

        }
    },
    components: {
        showFileDetail,
        uploadFile
    },
    methods:{
        preView() {
            this.$refs.showFileDetail.showFile(this.filePrev);
        },
        fileChange (){ // 上传成功验证；
            
        },
        signAgreement(){

        },
        submitForm(formName) {
            var vm = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(vm.fromAudit,'vm.fromAudit');
                    if(vm.fromAudit){
                        console.log('2');
                        vm.$store.state.step = 3;
                    }
                    vm.close();
                } else {
                    console.log('error submit!!');
                    return false;
                }
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
<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="specialsForm" style="width:100%;">
          <div style="overflow:hidden;">
              <div style="width:44%;float:left;">
                <el-form-item label="签订方式" prop="entityNo">
                   <el-select v-model="ruleForm.designated" placeholder="" clearable=""  style="width:100%;">
                        <el-option label="线上" value="true"></el-option>
                        <el-option label="线下" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合同类型" prop="designated">
                    <el-select v-model="ruleForm.designated" placeholder="" clearable=""  style="width:100%;">
                        <el-option label="是" value="true"></el-option>
                        <el-option label="否" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合同号" prop="designated">
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
                        placeholder="选择日期" style="width:305px;" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="附件" prop="contextOverview">
                    <el-input v-model="ruleForm.contextOverview"></el-input>
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
                  <el-input v-model="ruleForm.finFee" ></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="desc"   class="inputwidth">
                    <el-input v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="到期日期" prop="finIntention" >
                   <el-date-picker
                        v-model="ruleForm.value1"
                        type="date"
                        placeholder="选择日期" style="width:302px; " value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                  <el-form-item label="签署日期" prop="finIntention" value-format="yyyy-MM-dd">
                   <el-date-picker
                        v-model="ruleForm.value1"
                        type="date"
                        placeholder="选择日期" style="width:302px;" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
              </div>
          </div>
            <div style="text-align:right;width:100%;">
                <el-form-item>
                   <el-button type="info" @click="close()" >取消</el-button>
                   <el-button type="primary" @click="submitForm('ruleForm')" class="primaryButton">提交</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            ruleForm: {
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
                entityNo: [
                { required: true, message: '不能为空！', trigger: 'blur' }
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
                {pattern:/^\d+(\.\d+)?$/,message:"只能输入数字和小数点",trigger:"blur"}
                ],
                finRate: [
                { required: true, message: '不能为空！', trigger: 'blur' },
                {pattern:/^\d+(\.\d{1,2})?$/,message:"只能输入数字和最多两位小数",trigger:"blur"}
                ],
                paymentDays: [
                { required: true, message: '不能为空！', trigger: 'blur' },
                {pattern:/^[1-9]\d*$/,message:"只能输入数字",trigger:"blur"}
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
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
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
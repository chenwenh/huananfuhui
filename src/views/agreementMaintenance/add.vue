<template>
    <div v-loading='loading'>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="specialsForm" style="width:100%;">
           <div style="overflow:hidden;">
              <div style="width:44%;float:left;">
                <el-form-item label="签订方式" prop="onlineSign">
                   <el-select v-model="ruleForm.onlineSign" placeholder="" clearable=""  style="width:100%;" :disabled="fromAudit">
                        <el-option label="线上" :value="true"></el-option>
                        <el-option label="线下" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合同类型" prop="type">
                    <el-select v-model="ruleForm.type" placeholder="" clearable=""  style="width:100%;" :disabled="fromAudit">
                        <el-option v-for="(item, key) in $appConst.agreementType" :key="key" :label="item" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="合同流水号" prop="contractSerialNo">
                    <el-input v-model="ruleForm.contractSerialNo"></el-input>
                </el-form-item> -->
                <el-form-item label="合同编号" prop="contractNo" v-if="ruleForm.onlineSign === false">
                    <el-input v-model="ruleForm.contractNo"></el-input>
                </el-form-item>
                <el-form-item label="合同名称" prop="contractName">
                    <el-input v-model="ruleForm.contractName"></el-input>
                </el-form-item>
                <el-form-item label="合同金额" prop="contractAmount">
                    <el-input v-model="ruleForm.contractAmount"></el-input>
                </el-form-item>
                <el-form-item label="到期类型" prop="expirationType">
                   <el-select v-model="ruleForm.expirationType" placeholder="" clearable=""  style="width:100%;">
                        <el-option label="固定日期" value="固定日期"></el-option>
                        <el-option label="项目结束" value="项目结束"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合同有效期自" prop="startDate" >
                    <el-date-picker
                        v-model="ruleForm.startDate"
                        type="date"
                        placeholder="选择日期" style="width: 100%;" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="签订日期" prop="signDate">
                    <el-date-picker
                        v-model="ruleForm.signDate"
                        type="date"
                        placeholder="选择日期" style="width:100%;" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="保证金比例" prop="marginLevel"   class="inputwidth">
                    <el-input v-model="ruleForm.marginLevel"></el-input>
                </el-form-item>
                <el-form-item label="付款时间" prop="paymentTime">
                    <el-date-picker
                        v-model="ruleForm.paymentTime"
                        type="date"
                        placeholder="选择日期" style="width:100%;" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="甲方授权人姓名" prop="authorizedAName">
                    <el-input v-model="ruleForm.authorizedAName"></el-input>
                </el-form-item>
                <el-form-item label="甲方授权人微信" prop="authorizedAWeChat">
                    <el-input v-model="ruleForm.authorizedAWeChat"></el-input>
                </el-form-item>
                <el-form-item label="甲方授权人电话" prop="authorizedAPhone">
                    <el-input v-model="ruleForm.authorizedAPhone"></el-input>
                </el-form-item>
                <el-form-item label="票据结算" prop="billSettlement">
                    <el-input v-model="ruleForm.billSettlement"></el-input>
                </el-form-item>
              </div>

              <div style="width:44%;float:right;">
                <el-form-item label="追索权" prop="demandRight" class="inputwidth">
                  <el-radio v-model="ruleForm.demandRight" :label="true">有</el-radio>
                  <el-radio v-model="ruleForm.demandRight" :label="false">无</el-radio>
                </el-form-item>
                <el-form-item label="甲方" prop="firstPartyName" class="inputwidth">
                  <el-input v-model="ruleForm.firstPartyName" placeholder="请输入企业全称，Enter查询" @keyup.enter.native="handleOtherInfo('firstPartyName')"></el-input>
                </el-form-item>
                <el-form-item label="乙方" prop="secondPartyName" class="inputwidth">
                  <el-input v-model="ruleForm.secondPartyName" placeholder="请输入企业全称，Enter查询" @keyup.enter.native="handleOtherInfo('secondPartyName')"></el-input>
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
                <el-form-item label="合同有效期至" prop="expirationDate">
                   <el-date-picker
                        v-model="ruleForm.expirationDate"
                        type="date"
                        placeholder="选择日期" style="width:100%;" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="标的数量" prop="markNumber"   class="inputwidth">
                    <el-input v-model="ruleForm.markNumber"></el-input>
                </el-form-item>
                <el-form-item label="合同签订地" prop="place"   class="inputwidth">
                    <el-input v-model="ruleForm.place"></el-input>
                </el-form-item>
                <el-form-item label="交货方式" prop="delivery"   class="inputwidth">
                    <el-select v-model="ruleForm.delivery" placeholder="" clearable=""  style="width:100%;">
                        <el-option label="包" value="包"></el-option>
                        <el-option label="不包到" value="不包到"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="" v-if="ruleForm.onlineSign === false">
                    <span slot="label"><span style="color:#F56C6C">* </span>合同</span>
                    <textStyleUpload ref="textStyleUpload" fileAccept= 'PDF,pdf'></textStyleUpload>
                </el-form-item>
                <el-form-item label="乙方授权人姓名" prop="authorizedBName">
                    <el-input v-model="ruleForm.authorizedBName"></el-input>
                </el-form-item>
                <el-form-item label="乙方授权人微信" prop="authorizedBWeChat">
                    <el-input v-model="ruleForm.authorizedBWeChat"></el-input>
                </el-form-item>
                <el-form-item label="乙方授权人电话" prop="authorizedBPhone">
                    <el-input v-model="ruleForm.authorizedBPhone"></el-input>
                </el-form-item>
                <el-form-item label="单位信息" prop="company">
                    <el-input v-model="ruleForm.company"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="" v-if="ruleForm.onlineSign === true">
                    <span slot="label"><span style="color:#F56C6C">* </span>合同</span>
                    <span @click="signAgreement()" class="blue pointer" style="position:relative;">签署协议</span>
                </el-form-item> -->
              </div>
            </div>  
            <el-form-item label="备注" prop="comments">
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
                id: null,
                onlineSign: true, // 签订方式
                type: '', // 合同类型
                contractSerialNo: '', //合同流水号
                contractNo: '', // 合同编号
                contractName: '', // 合同名称
                contractAmount: '', // 合同金额
                expirationType: '', // 到期类型
                startDate: '', // 起始日期
                signDate:'', // 签署日期
                demandRight: true, // 追索权
                firstPartyName: "", // 甲方
                firstOrgId: '', // 甲方orgId
                secondPartyName: "", // 乙方
                secondOrgId: '', // 乙方orgId
                level: null, // 合同层级
                department: '', // 部门
                marginLevel: '', // 保证金比例
                markNumber: '', // 标的数量
                expirationDate: '', // 到期时间
                comments: '', // 备注
                // 以下字段未确定
                paymentTime: '', // 付款时间
                authorizedAName: '', // 甲方授权人姓名
                authorizedAWeChat: '', // 甲方授权人微信
                authorizedAPhone: '', // 甲方授权人电话
                billSettlement: '', // 票据结算
                place: '', // 合同签订地
                delivery: '', // 交货方式
                authorizedBName: '', // 乙方授权人姓名
                authorizedBWeChat: '', // 乙方授权人微信
                authorizedBPhone: '', // 乙方授权人电话
                company: '' // 单位信息
            },
            rules: {
                // 签订方式
                onlineSign: [
                    { required: true, message: '不能为空！', trigger: 'change' }
                ],
                // 合同流水号
                contractSerialNo: [
                    { required: true, message: '不能为空！', trigger: 'blur' },
                    { min: 1, max: 30, message: '长度不能超过30个字符', trigger: 'blur' }
                ],
                // 合同类型
                type: [
                    { required: true, message: '不能为空！', trigger: 'change' }
                ],
                // 合同编号
                contractNo: [
                    { required: true, message: '不能为空！', trigger: 'blur' },
                    { min: 1, max: 30, message: '长度不能超过30个字符', trigger: 'blur' }
                ],
                // 合同名称
                contractName:[
                    { required: true, message: '不能为空！', trigger: 'blur' },
                    { min: 1, max: 30, message: '长度不能超过30个字符', trigger: 'blur' }
                ],
                // 追索权
                demandRight: [
                    { required: true, message: '不能为空！', trigger: 'change' }
                ],
                // 合同金额
                contractAmount: [
                    { required: true, message: '不能为空！', trigger: 'change' },
                    { validator: this.$validate.twoDecimalPlaces, trigger: 'change'}
                ],
                // 甲方
                firstPartyName: [
                    { required: true, message: '不能为空！', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
                ],
                // 乙方
                secondPartyName: [
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
                expirationType: [
                    { required: true, message: '不能为空！', trigger: 'change' }
                ],
                // 到期日期
                expirationDate: [
                    { required: true, message: '不能为空！', trigger: 'change' }
                ],
                // 部门
                department: [
                    { required: true, message: '不能为空！', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度不能超过20个字符', trigger: 'blur' }
                ],
                // 甲方授权人电话
                authorizedAPhone: [
                    { validator: this.$validate.phoneValidate, trigger: 'change'}
                ],
                // 乙方授权人电话
                authorizedBPhone: [
                    { validator: this.$validate.phoneValidate, trigger: 'change'}
                ]
            },

        }
    },
    components: {
        showFileDetail,
        textStyleUpload
    },
    methods:{
        // 根据输入查询企业信息
        handleOtherInfo(type) {
            let url = this.$apiUrl.companyDetail;
            let params = {
                orgName: this.ruleForm[type]
            }
            this.$http.get(url,{params})
                .then(res => {
                if (res.data.status !== 200) {
                    this.$message.warning('查询失败');
                }
                if (res.data.hasOwnProperty('data') && res.data.data.length === 0) {
                    this.$message.warning('查询企业不存在');
                }
                if (res.data.status !== 200 || res.data.hasOwnProperty('data') && res.data.data.length === 0) {
                    if (type === 'firstPartyName') {
                        this.ruleForm.firstPartyName = '';
                        this.ruleForm.firstOrgId = '';
                    }
                    if (type === 'secondPartyName') {
                        this.ruleForm.secondPartyName = '';
                        this.ruleForm.secondOrgId = '';
                    }
                    return;
                }
                if (res.data.data && res.data.data.length > 0) {
                    this.$message.success('查询成功');
                    if (type === 'firstPartyName') {
                        this.ruleForm.firstOrgId = res.data.data[0].orgId
                    }
                    if (type === 'secondPartyName') {
                        this.ruleForm.secondOrgId = res.data.data[0].orgId
                    }
                }
                }).catch(err => {
                   this.$message.warning(err.message || '服务器错误，请稍后再试!');
                });
        },
        // 预览
        preView() {
            this.$refs.showFileDetail.showFile(this.filePrev);
        },
        // 安心签 签署
        // signAgreement(){

        // },
        // 提交操作 + 安心签
        submitForm(formName) {
            var vm = this;
            if (this.ruleForm.firstOrgId === '' || this.ruleForm.secondOrgId === '') {
                this.$message.warning('请选中甲方乙方企业进行查询');
                return;
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 业务开通审核 只有线上
                    if(vm.fromAudit){
                        vm.$store.state.step = 3;
                        // 线上
                        if (this.ruleForm.onlineSign === true) {
                            // 平台审核
                            const url = `${this.$apiUrl.agreement.sign}`;
                            let params = Object.assign({}, this.ruleForm);
                            for (const item in params) {
                                if (!params[item] || params[item] === '') {
                                delete params[item];
                                }
                            }
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
                        // if (this.ruleForm.signMode === false) {
                        //     // 平台审核
                        //     const url = `${this.$apiUrl.credit.apply}`;
                        //     let params = {
                        //         orgId: JSON.parse(sessionStorage.getItem('user')).orgId,
                        //         pattern: "PATTERN_A"
                        //     };
                        //     this.$http.post(url, params)
                        //         .then(res => {
                        //         if (res.data.status !== 200) return;
                        //             this.$message.success('授信申请成功');
                        //             vm.close();
                        //         }).catch(err => {
                        //             this.$message.warning(err.message || '服务器错误，请稍后再试!');
                        //         });
                        // }
                    }
                    // 新建协议
                    if(!vm.fromAudit){
                        const url = `${this.$apiUrl.agreement.create}`;
                        let params = Object.assign({}, this.ruleForm);
                        for (const item in params) {
                            if (!params[item] || params[item] === '') {
                            delete params[item];
                            }
                        }
                        this.$http.put(url, params)
                            .then(res => {
                            if (res.data.status !== 200) return;
                                this.$message.success('协议新建成功');
                                vm.close();
                            }).catch(err => {
                                this.$message.warning(err.message || '服务器错误，请稍后再试!');
                            });
                    }
                } else {
                    return false;
                }
            });
        },
        // 重置表单
        resetForm() {
            this.$refs['ruleForm'].resetFields();
        },
        // 初始化数据
        init(row, templateType) {
            const vm = this;
            this.$refs['ruleForm'].resetFields();
            Object.keys(row).forEach(function(key){
                if (vm.ruleForm.hasOwnProperty(key)) {
                    vm.ruleForm[key] = row[key]
                }
            });
            vm.ruleForm.type = templateType;
        },
        close(){
            this.$bus.$emit('closeDialog');
        },
    }
}
</script>
<template>
<div style="background:rgba(255,255,255,1);" class="applicationOpen">
    <div class="steps">
        <span><span class="step child" :class="{'active':step=='1'}">1</span><label>基础信息</label><span class="line"></span></span>
        <span class="step" :class="{'active':step=='2'}">2</span><label>平台审核</label><span class="line"></span>
        <span class="step" :class="{'active':step=='3'}">3</span><label>签署框架合同</label><span class="line"></span>
        <span class="step" :class="{'active':step=='4'}">4</span><label>银行授信审核</label>
    </div>
    <!-- 步骤1 -->
    <div v-show="step==1">
        <div>
            <el-form :model="serviceFulfillment" :rules="serviceFulfillmentRules" ref="serviceFulfillment" label-width="70px" class="specialsForm" style="width:100%;">
                <div style="overflow:hidden;">
                    <el-form-item label="名称" prop="agreementtype">
                        <el-select v-model="serviceFulfillment.agreementtype" placeholder="请选择协议模板" clearable=""  style="width:100%;">
                            <el-option label="年度框架协议" value="00"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="serviceFulfillment.name"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <p style="margin-left:31px;">附件<span class="download" @click="download">下载模板</span></p>
            <el-row type="flex" class="attachmentContent" justify="space-between">
                <el-col :span="7">
                    <div class="child">
                        <h4>营业执照扫描件</h4>
                        <textStyleUpload ref="textStyleUpload1" fileAccept= 'jpg,jpeg,png,gif,PDF,pdf' :limitNumber="limitNumber"></textStyleUpload>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="child">
                        <h4>企业法人或负责人证件扫描件</h4>
                        <textStyleUpload ref="textStyleUpload2" fileAccept= 'jpg,jpeg,png,gif,PDF,pdf' :limitNumber="limitNumber"></textStyleUpload>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="child">
                        <h4>营业执照扫描件</h4>
                        <textStyleUpload ref="textStyleUpload3" fileAccept='jpg,jpeg,png,gif,PDF,pdf' :limitNumber="limitNumber"></textStyleUpload>
                    </div>
                </el-col>
            </el-row>
            <p class="checkContent"><el-checkbox v-model="checked" style="margin-right:10px;"></el-checkbox>我同意并遵守<span class="blue pointer">库易保业务开通协议</span></p>
            <div style="text-align:right;width:100%;">
                <el-button type="info" @click="close('serviceFulfillment')" class="radiusNone">取消</el-button>
                <el-button type="primary" @click="submitForm('serviceFulfillment')" class="primaryButton radiusNone">提交</el-button>      
            </div>
        </div>
    </div>
    <!-- 步骤2 -->
    <div v-show="step==2 && auditState == 'shenhezhong'" style="text-align:center;padding-top:40px;padding-bottom:60px;">
        <img src="static/images/shenhezhong.png" alt="">
        <p style="color:rgba(153,153,153,1);">平台审核中，请耐心等待</p>
    </div>
    <div v-show="step==2 && auditState =='failed'" style="text-align:center;padding-top:40px;padding-bottom:10px;">
        <img src="static/images/shenheerror.png" alt="">
        <p style="color:rgba(255,88,1,1);">平台审核未通过</p>
        <p style="color:rgba(102,102,102,1);text-align:left;margin-top:20px;">“一般来说资格审核是用不了多久的,一般一两天就可以通过了。 但是也不排除因为其他的原因而造成的等待时间特别长。 但是这个也不一定,因为有的地方一天左右的样子就会审核完成,而有的地方需要10天或者一个星期左右,还有的地方甚至要半个 月的时间。我们这里一般审核的话,大概一个星期左右就可以拿到...”</p>
        <p style="text-align:right;"><el-button type="primary" @click="repeatApplication()" class="primaryButton radiusNone">重新申请</el-button>      </p>
    </div>
    <!-- 步骤3 -->
    <div v-show="step==3" class="thirdStep">
        <el-form :model="review" ref="review" label-width="70px" class="specialsForm" style="width:100%;">
          <div style="overflow:hidden;">
                <el-form-item label="名称" prop="agreementtype">
                   <el-select v-model="review.agreementtype" placeholder="请选择协议模板" clearable=""  style="width:100%;" disabled="">
                        <el-option label="年度框架协议" value="value1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="review.name" disabled=""></el-input>
                </el-form-item>
          </div>
        </el-form>
         <el-row type="flex" class="attachmentContent" justify="space-between">
            <el-col :span="7">
                <div class="child">
                    <h4>营业执照扫描件</h4>
                    <img src="static/images/pdf.png" alt="" class="pdf"><span @click="handlePreview(attachment1)">{{attachment1.name}}</span>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="child">
                    <h4>企业法人或负责人证件扫描件</h4>
                    <img src="static/images/pdf.png" alt="" class="pdf"><span @click="handlePreview(attachment2)">{{attachment2.name}}</span>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="child">
                    <h4>营业执照扫描件</h4>
                    <img src="static/images/pdf.png" alt="" class="pdf"><span @click="handlePreview(attachment3)">{{attachment3.name}}</span>
                </div>
            </el-col>
        </el-row>
        <p style="margin-left:30px;margin-top:20px;">年度框架协议：<span class="blue" @click="handlePreview(attachment1)">库易保业务开通协议.pdf</span>
            <span class="onlineSign">在线签署</span>
        </p>
        <div style="text-align:right;width:100%;">
            <el-button type="info" @click="close('review')" class="radiusNone">取消</el-button>
            <el-button type="primary" @click="signSubmit()" class="primaryButton radiusNone">提交</el-button>
        </div>
    </div>
    <!-- 步骤4 -->
    <div v-show="step==4 && auditState == 'shenhezhong'" style="text-align:center;padding-top:40px;padding-bottom:60px;">
        <img src="static/images/shenhezhong.png" alt="">
        <p style="color:rgba(153,153,153,1);">银行授信审核中，请耐心等待</p>
    </div>
    <div v-show="step==4 && auditState =='failed'" style="text-align:center;padding-top:40px;padding-bottom:10px;">
        <img src="static/images/shenheerror.png" alt="">
        <p style="color:rgba(255,88,1,1);">银行授信审核未通过</p>
        <p style="color:rgba(102,102,102,1);text-align:left;margin-top:20px;">“一般来说资格审核是用不了多久的,一般一两天就可以通过了。 但是也不排除因为其他的原因而造成的等待时间特别长。 但是这个也不一定,因为有的地方一天左右的样子就会审核完成,而有的地方需要10天或者一个星期左右,还有的地方甚至要半个 月的时间。我们这里一般审核的话,大概一个星期左右就可以拿到...”</p>
        <p style="text-align:right;"><el-button type="primary" @click="repeatApplication()" class="primaryButton radiusNone">重新申请</el-button>      </p>
    </div>
    <show-file-detail ref="showFileDetail"></show-file-detail>
</div>
</template>
<script>
import textStyleUpload from '@/components/textStyleUpload.vue';
import showFileDetail from '@/components/showFileDetail.vue'
export default {
    data(){
        return{
            stepStatus: '', // 步骤数
            limitNumber: 1, // 限制文件上传
            checked: true, // 步骤1 协议是否同意
            serviceFulfillment:{ //业务开通 步骤1
                agreementtype:'',
                name:''
            },
            attachment1:{
	            "uid": 1597214482997,
                "size": 70269,
                "fileId": "fda5fd07-da7b-45d6-bbe4-922d04dd3bfc",
                "fileName": "正面.pdf",
                "name": "正面.pdf",
	            "dataPoolURL": "/tdp/0f307499499c478089f874edfe389957/network/a25eaecd3d6f4a35a4d163b0e9f69d9d/ledger/95d07aa9f7884212a9618f4d537ed998/v2.0/attachment/2913919147222"
            },
            attachment2:{
                "uid": 1597214482997,
                "size": 70269,
                "fileId": "fda5fd07-da7b-45d6-bbe4-922d04dd3bfc",
                "fileName": "正面.pdf",
                "name": "正面.pdf",
	            "dataPoolURL": "/tdp/0f307499499c478089f874edfe389957/network/a25eaecd3d6f4a35a4d163b0e9f69d9d/ledger/95d07aa9f7884212a9618f4d537ed998/v2.0/attachment/2913919147222"
            },
            attachment3:{
                "uid": 1597214482997,
                "size": 70269,
                "fileId": "fda5fd07-da7b-45d6-bbe4-922d04dd3bfc",
                "fileName": "正面.pdf",
                "name": "正面.pdf",
	            "dataPoolURL": "/tdp/0f307499499c478089f874edfe389957/network/a25eaecd3d6f4a35a4d163b0e9f69d9d/ledger/95d07aa9f7884212a9618f4d537ed998/v2.0/attachment/2913919147222"
            },
            review:{ // 步骤3回显数据
                agreementtype:'value1',
                name:'名称1',
            },
            serviceFulfillmentRules:{
                agreementtype: [
                    { required: true, message: '不能为空！', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '不能为空！', trigger: 'blur' }
                ],
            }
        }
    },
    components:{
        textStyleUpload,
        showFileDetail
    },
    computed:{
        step(){
            return this.$store.state.step;
        },
        auditState(){
            return this.$store.state.auditState;
        }
    },
    methods:{
        // 获取当前业务步骤
        getStep(step) {
            this.stepStatus = step;
        },
        // 在线签署
        onlineSign(){
        },
        // 下载模板
        download(){
            window.location.href="static/模板.rar";
        },
        // 预览pdf
        handlePreview(file) {
            let IEPDF = this.$global.isAcrobatPDFPluginInstalled();
            var vm = this;
            if(IEPDF) {
                vm.$refs.showFileDetail.showFile(file);
            }else{
                this.$message.error("对不起,您还没有安装PDF阅读器软件呢,为了方便预览PDF文档,请选择安装！");
                location = 'http://ardownload.adobe.com/pub/adobe/reader/win/9.x/9.3/chs/AdbeRdr930_zh_CN.exe';
            }
        },
        // 取消
        close(refType){
            this.$refs[refType].resetFields();
            this.$bus.$emit('closeDialog');
        },
        // 步骤1 业务开通申请
        submitForm(formName) {
            var vm = this;
            if (vm.checked === false) {
                vm.$message.warning('请您同意并遵守库易保业务开通协议。');
                return;
            }
            vm.$refs[formName].validate((valid) => {
                if (valid) {
                    // if(vm.$refs.textStyleUpload1.getFile.length==0){
                    //     vm.$message.error('请先上传营业执照扫描件');
                    //     return;
                    // }
                    // if(vm.$refs.textStyleUpload2.getFile.length==0){
                    //     vm.$message.error('请先上传企业法人或负责人证件扫描件');
                    //     return;
                    // }
                    // if(vm.$refs.textStyleUpload3.getFile.length==0){
                    //     vm.$message.error('请先上传营业执照扫描件');
                    //     return;
                    // }
                    vm.$store.state.step = 2;
                    const url = this.$apiUrl.serviceFulfillment.apply;
                    let params = {
                        auditStatus: 'TO_BE_AUDIT',
                        orgId: JSON.parse(sessionStorage.getItem('user')).orgId,
                        orgName: JSON.parse(sessionStorage.getItem('user')).orgName,
                        agreementtype: this.serviceFulfillment.model,
                        name: this.serviceFulfillment.name,
                    };
                    this.$http.post(url, params)
                        .then(res => {
                        if (res.data.status !== 200) return;
                            // 业务开通申请
                            this.stepStatus = '';
                        }).catch(err => {
                            this.$message.warning(err.message || '服务器错误，请稍后再试!');
                        });
                        } else {
                            vm.$message.warning('请检查输入是否正确。');
                            return false;
                        }
                    });
        },
        // 签署提交
        signSubmit(){
            this.$store.state.step = 4;
            this.$store.state.auditState = 'shenhezhong';
            const url = `${this.$apiUrl.agreement.sign}`;
            let params = {
            };
            this.$http.put(url, params)
                .then(res => {
                if (res.data.status !== 200) return;
                    this.$message.success('签署成功');
                }).catch(err => {
                    this.$message.warning(err.message || '服务器错误，请稍后再试!');
                });
        },
        repeatApplication(){
            this.$store.state.step = 1;
            this.$store.state.auditState = 'shenhezhong';
        }
    }
}
</script>
<style  scoped>
    .pdf{
        position: relative;
        top:3px;
        right:7px;
    }
    .checkContent{
        margin-top:20px;
        padding-left:30px;
    }
    .attachmentContent{
        margin-top:20px;
        padding-left:29px;
        padding-right:22px;
    }
    .attachmentContent .child h4{
        font-weight:400;
        color:rgba(102,102,102,1);
    }
    .attachmentContent .child{
        text-align:center;
        border:1px solid rgba(225,229,239,1);
        padding:10px 20px;
    }
    span.download{
        padding:5px 8px;
        background:rgba(255,255,255,1);
        border:2px solid rgba(247,181,0,1);
        display: inline-block;
        cursor: pointer;
        margin-left:10px;
    }
    span.onlineSign{
        padding:5px 8px;
        background:rgba(255,255,255,1);
        border:2px solid rgba(247,181,0,1);
        color:rgba(247,181,0,1);
        display: inline-block;
        cursor: pointer;
        margin-left:10px;
    }
    .specialsForm{
        margin-top:40px;
    }
    .specialsForm .el-form-item{
        width:48%;
        display:inline-block;
    }
    .steps{
        padding-left:20px;
    }
    .child{
        cursor: pointer;
    }
    span.step{
        width:26px;
        padding-top:2px;
        padding-bottom:2px;
        background:rgb(188,188,188);
        border-radius: 50%;
        display: inline-block;
        text-align: center;
        color:white;
        margin-right:10px;
    }
    span.step.active{
        background-color:#FEAE16;
    }
    .steps label{
        color:#333333;
        font-size:16px;
    }
    span.line{
        width:80px;
        border-bottom:2px dotted #ccc;
        height:1px;
        display: inline-block;
        position:relative;
        top:-3px;
        margin-left:10px;
        margin-right:10px;
    }
</style>
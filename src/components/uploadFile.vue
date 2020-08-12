<template>
<div>
  <div>
    <el-upload v-if="drag=='true'"
      class="upload-demo"
      :action="action"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeAvatarUpload"
      :on-success="handleAvatarSuccess"
      :headers="headers"
      :file-list="fileList"
      >
      <!-- <i class="iconfont iconup"></i> -->
      <span class="blue">点击上传</span>
    <!-- <div class="el-upload__text">
      <p>请将盖章文件拖到此处</p>
      <div style="overflow:hidden;margin-left:30%;margin-top:20px;"> 
        <div style="float:left;width:23%;height:1px;background:rgba(153,153,153,0.1);margin-top:10px;"></div>      
        <div style="float:left;margin:0 10px;">or</div>
        <div style="float:left;width:23%;height:1px;background:rgba(153,153,153,0.1);margin-top:10px;"></div>
      </div>
      <el-button type="primary" style="margin-top:20px;width:41%;">点击上传</el-button>
    </div> -->
    </el-upload>
    <el-upload v-else
       class="upload-demo"
      :action="action"
      :on-preview="handlePreview"
      :on-remove="handleRemove2"
      :on-success="handleAvatarSuccess2"
      :before-upload="beforeAvatarUpload2"
      :headers="headers"
      :file-list="fileList2" >
        <div style="width:100%;">
          <!-- <el-button size="small" type="primary" style="width:200px;margin-top:20px;margin-left:-200px;position:relative;">添加其他附件</el-button> -->
          <span class="colorStyle" style="display:inline-block;width:200px;margin-top:20px;font-weight:600;">添加其他附件</span>
        </div>
    </el-upload>
  </div>
    <show-file-detail ref="showFileDetail"></show-file-detail>
</div>
</template>

<style>
.el-upload--text{
    width:220px;
}
.upload-demo{
  width:100%;
}
.upload-demo .el-upload{
  width:100%;
}
.el-upload-dragger{
  width:100% !important;
  height:140px !important;
}
.el-upload-dragger i{
  margin-top:20px !important;
}

</style>
<script>
import showFileDetail from './showFileDetail.vue'
  export default {
    data() {
      return {
        fileList:[],
        fileList2:[],
        uuid:this.$global.uuid(13,10)
      };
    },
    components:{
      showFileDetail
    },
    props:['drag'],
    mounted(){

    },
    computed:{
      action(){
          return this.$apiUrl.FILE_IP + this.$apiUrl.upload + this.uuid;
      },
      headers(){
        return{
            Authorization: sessionStorage.getItem("token"),
            org_id: JSON.parse(sessionStorage.getItem('user')).orgId,
            client_id: this.$apiUrl.ClIENT_ID,
        }
      },
    },
    methods: {
      commonRemove(file, fileList,arr){
        var removeId = file.fileId;
        for(var i =0 ;i<arr.length;i++){
          if(arr[i].fileId == removeId){
            arr.splice(i,1);
          }
        }
        this.$emit("fileChange");
      },
      handleRemove(file, fileList) {
        this.commonRemove(file,fileList,this.fileList);
      },
      handleRemove2(file, fileList2) {
         this.commonRemove(file,fileList2,this.fileList2);
      },
      //文件预览
      handlePreview(file) {
         var vm = this;
         vm.$refs.showFileDetail.showFile(file);
      },
      handleAvatarSuccess(res, file) {
        this.commonSuccess(res,file,this.fileList,"mainFile");
      },
      handleAvatarSuccess2(res, file) {
          this.commonSuccess(res,file,this.fileList2,'anotherFile');
          // document.querySelectorAll(".text .upload-demo")[1].classList.add('icongreen')
          // var arrIcon = document.querySelectorAll('.text .icongreen a i')
          // for(var j = 0;j<arrIcon.length;j++) {
          //   arrIcon[j].classList.add("iconfont");
          //     for(var k = 0;k<arrIcon.length;k++) {
          //       arrIcon[k].classList.add("iconpng");
          //       arrIcon[k].style.color = '#00D4F3';
          //     }
          // }
      },
      commonSuccess(res, file,arr,type){
        var uploadFile = file.response.data;
        var currentFile = {
          //  name:file.name,
          //  fileName:file.name,
          //  id:uploadFile.filepath,
          //  type:type,
           name:file.name,
           fileName: file.name,
           fileId: uploadFile.uuid,
           size: file.size,
           dataPoolURL: this.$apiUrl.fileQuery + uploadFile.filepath,
           type: type,
        };
        arr.push(currentFile);  // 为当前上传的文件
        this.uuid = this.$global.uuid(13,10);
        this.$emit("fileChange");
      },
      getImgPath(){
        return this.fileList;
      },
      getImgPath2(){
        return this.fileList2;
      },
      resetList(){
        this.fileList = [];
        this.fileList2 = [];
      },
      putFile(attachments){
        var vm = this;
        if(!attachments){this.fileList = [];return;}
        if(attachments.length == 0)return;
        vm.fileList = attachments;
        for(var i =0;i<attachments.length;i++){
          vm.fileList[i].name = attachments[i].fileName;
        }
      },
      putFile2(attachments){
        var vm = this;
        if(!attachments){this.fileList2 = [];return;}
        if(attachments.length == 0)return;
        vm.fileList2 = attachments;
        for(var i =0;i<attachments.length;i++){
          vm.fileList2[i].name = attachments[i].fileName;
        }
      },
      setFiles(data){
        var vm = this;
        vm.fileList = data;
      },
      beforeAvatarUpload(file) {
        const isPDF = file.type === 'application/pdf';
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isPDF) {
          this.$message.error('上传附件只能是pdf格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传附件大小不能超过 10MB!');
        }
        return (isPDF) && isLt2M;
      },
      beforeAvatarUpload2(file) {
        const isPDF = file.type === 'application/pdf';
        const isJPG = file.type === 'image/jpeg';
        const isPng = file.type ==='image/png';
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isJPG&&!isPng&&!isPDF) {
          this.$message.error('上传其他附件只能是pdf，jpg，png格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传其他附件大小不能超过 10MB!');
        }
        return (isJPG || isPng || isPDF) && isLt2M;
      },
    }
  }
</script>

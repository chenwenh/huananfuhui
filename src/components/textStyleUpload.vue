<template>
<div>
<el-upload
  class="upload-demo textStyleUpload"
  :class="{limitStyleUpload:limitNumber==1}"
  :headers="headers"
  :action="upload"
  :drag="drag"
  :accept="fileAccept"
  :before-upload="handleBeforeUpload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :limit="limitNumber"    
  :on-success="handleSuccess"
  :file-list="fileList">
  <span class="blue" v-if="limitNumber== 1 && fileList.length==0">添加</span>
  <span class="blue" v-if="limitNumber!=1 && !drag">文件上传</span>
  <i class="el-icon-upload" v-if="drag"></i>
  <div class="el-upload__text" v-if="drag">将文件拖到此处，或<em>点击上传</em></div>
</el-upload>
<show-file-detail ref="showFileDetail"></show-file-detail>
</div>
</template>
<script>
  import showFileDetail from './showFileDetail.vue'
  export default {
    props:['fileAccept','limitNumber','drag'],
    data() {
      return {
        fileList:[],
        uuid:''
      };
    },
    computed:{
        headers(){
            return{
                "Authorization": sessionStorage.getItem('token'),
                "client_id":this.$apiUrl.ClIENT_ID,
                "org_id": JSON.parse(sessionStorage.getItem('user')).orgId,
            }
		},
        upload(){
            return this.$apiUrl.uploadFileApi + '/'+ this.uuid;
        },
    },
    components:{
        showFileDetail
    },
    methods: {
        handleBeforeUpload(file) {				
            const isLt30M = file.size / 1024 / 1024 < 30    
            if(!isLt30M) {  
                this.$message.error("上传文件大小不能超过 30MB!")
            }
            const typeList = file.name.split('.');
            const type = typeList[typeList.length - 1];
            const isDoc = this.fileAccept.indexOf(type)!=-1;
            if (!isDoc) {
                this.$message.error('文件格式错误!');
            }
            return isDoc &&　isLt30M;
        },
        handleRemove(file, fileList) {
            fileList.map((val, index) => {
                if(val.fileId == file.fileId) {
                    fileList.splice(index,1);
                }
            })
            this.fileList = fileList;
        },
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
        resetFileList() {
            this.fileList = [];
        },
        getFile() {
            return this.fileList;
        },
        handleSuccess(response, fileList, data) {
            if(data.length) {
                let arr = [];
                arr.push(fileList);
                this.handleFileData(arr);
            }
            this.uuid = this.$global.uuid(13,10);
        },
        handleFileData(file) {
            file.map((val, index) => {
                let json = {};
                json.uid = val.uid;
                json.size=val.size;
                json.fileId = val.response.data.uuid;
                json.fileName = val.name;
                json.name = val.name;
                json.dataPoolURL = this.$appConst.fileQuery + val.response.data.filepath;
                this.fileList.push(json);
            })
        },
    },
    mounted(){
        this.uuid = this.$global.uuid(13,10);
    },
  }
</script>
<style >
.textStyleUpload.limitStyleUpload .el-upload-list__item:first-child{
    margin-top:-28px !important;
}
</style>
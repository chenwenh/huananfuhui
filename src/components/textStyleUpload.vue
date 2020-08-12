<template>
<div>
<el-upload
  class="upload-demo textStyleUpload"
  :headers="headers"
  :action="upload"
  :beforeUpload="handleBeforeUpload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :limit="1"    
  :on-success="handleSuccess"
  :file-list="fileList">
  <span class="blue" v-if="fileList.length==0">添加</span>
</el-upload>
<show-file-detail ref="showFileDetail"></show-file-detail>
</div>
</template>
<script>
  import showFileDetail from './showFileDetail.vue'
  export default {
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
                "client_id":"pGCXRYBmkbDS88Yls6CNBaD8YkHK7QPzFHFlG1m8IPIgD6T3L98ZnO82q67kj8R1",
                "org_id": sessionStorage.getItem("orgId"),
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
                global.errMsg("上传文件大小不能超过 30MB!")
                return
            }
            return isLt30M
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
                console.log(file,'file');
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
.textStyleUpload .el-upload-list__item:first-child{
    margin-top:-28px !important;
}
</style>
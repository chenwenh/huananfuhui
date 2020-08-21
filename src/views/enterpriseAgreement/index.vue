<template>
<div class="agreement">
    <breadcrumb :breadcrumbList="breadcrumbs"/>
    <div class="content">
        <h3>签署协议</h3>
        <div v-for="(item,index) in agreements" :key='index' class="child">
            <p>
                <span class="title">{{item.title}}</span>
                <span class="blue right">查看历史</span>
            </p>
            <p class="file">
                <img src="static/images/pdf.png" alt="" style="float:left;margin-right:4px;">{{item.attachment.name}}
                <span class="state right">已签署</span>
            </p>
        </div>
    </div>
</div>
</template>
<script>
import breadcrumb from '@/components/breadcrumb.vue';
export default {
    data(){
        return{
            breadcrumbs:['企业协议'],
            agreements:[
                {
                    title:"年度销售合同",
                    attachment:{
                        "uid": 1597214482997,
                        "size": 70269,
                        "fileId": "fda5fd07-da7b-45d6-bbe4-922d04dd3bfc",
                        "fileName": "正面.pdf",
                        "name": "正面.pdf",
                        "dataPoolURL": "/tdp/0f307499499c478089f874edfe389957/network/a25eaecd3d6f4a35a4d163b0e9f69d9d/ledger/95d07aa9f7884212a9618f4d537ed998/v2.0/attachment/2913919147222"
                    },
                },
                {
                    title:"物流运输合同",
                    attachment:{
                        "uid": 1597214482997,
                        "size": 70269,
                        "fileId": "fda5fd07-da7b-45d6-bbe4-922d04dd3bfc",
                        "fileName": "正面.pdf",
                        "name": "正面.pdf",
                        "dataPoolURL": "/tdp/0f307499499c478089f874edfe389957/network/a25eaecd3d6f4a35a4d163b0e9f69d9d/ledger/95d07aa9f7884212a9618f4d537ed998/v2.0/attachment/2913919147222"
                    },
                }
            ]
        }
    },
    components:{
        breadcrumb
    }
}
</script>
<style scoped>
.agreement .child{
    width:300px;
    display: inline-block;
    margin-right:50px;
    border: 1px solid #EDEDED;
    border-radius: 4px;
    border-radius: 4px;
    padding:10px;
}
.agreement .content{
    border: 1px solid #F7F7F7;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
    padding:20px;
}
.agreement .title{
    color: #000000;
    font-weight:bold;
}
.agreement .state{
    border: 1px solid #999999;
    border-radius: 3px;
    padding:3px;
    font-size: 12px;
}
.agreement .file{
    margin-top:30px;
    margin-bottom:30px;
}
.right{
    float: right;
}
</style>
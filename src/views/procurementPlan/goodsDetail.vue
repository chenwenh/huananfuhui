<template>
<div>
        <Table
            ref="tableRef"
            :mainTable="mainTable"
            :selected="false"
            :showPagination="false" height2="250">
        </Table>
        <div class="dialog-footer" style="text-align:center;margin-top:20px;">
            <el-button plain  @click="close()" size="medium">关闭</el-button>
        </div>
</div>
</template>
<script>
import Table from '@/components/Table.vue';
export default {
    data(){
        return{
            mainTable: {
                tableHeader: {
                    skuId: "编号",
					spec: "规格",
					materialQuality: "材质",
					length: "长度",
					quality:"数量",
                    productName: "品名",
                    unit: "计量单位",
                },
                tableData: [
                   
                ],
            }
        }        
    },
    components:{
        Table
    },
    methods:{
        init(goods){
            this.mainTable.tableData = goods;
        },
        close(){
            this.$bus.$emit('closeDialog');
        }
    }
}
</script>
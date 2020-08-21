<template>
	<div>
		<el-table 
			ref="multipleTable" 
			tooltip-effect="dark" 
			stripe 
			class="detailEntry"
			:data="tabData"
			>
			<el-table-column fixed type="index" width="65" center >
		    </el-table-column>

		    <el-table-column 
		    	v-for="(item, key) in formItem" 
		    	:prop="key" 
		    	:column-key="key" 
		    	:label="item" 
		    	:key="key" 
		    	:show-overflow-tooltip="true" 
		    	>
		    	<template slot="header" slot-scope="scope">
			        <div  v-if="key == 'quantity'|| key == 'unitPrice'|| key == 'taxRate'" class="table-head" style="width: 100%;">
			        	<i style="color: #f56c6c;">*</i>
			        	{{item}}
			        </div>
			        <div v-else>
			        	{{item}}
			        </div>
			    </template>
		    	<template slot-scope="scope">
  					<el-input
  						v-if="key !== 'currency'" 
  						v-model="scope.row[key]"
  						class="editInput"
  						:keyVal="key"
  					    :index="scope.$index"
  						:val="scope.row[key]"
  						@blur="handleDetailBlur($event, scope.row, key, scope.$index)"
  						>
  					</el-input>
  					<span v-else>
  						{{scope.row[key]}}
  					</span>
			    </template>
		    </el-table-column>
		</el-table> 
	</div>
</template>
<script>
	export default {
		data() {
			return {
                tabData:[
					{
						skuId: "类型",
						goodsName: "规格",
						remarks: "材质",
						spec: "长度",
						quantity: "数量",
						unit: "备注",
						name:'钢厂',
						name2:'投标量',
						name3:"单价",
						name4:'仓库',
						name5:'包到',
						name6:'运价',
						name7:'金额'
					},
					{
						skuId: "类型",
						goodsName: "规格",
						remarks: "材质",
						spec: "长度",
						quantity: "数量",
						unit: "备注",
						name:'钢厂',
						name2:'投标量',
						name3:"单价",
						name4:'仓库',
						name5:'包到',
						name6:'运价',
						name7:'金额'
					}
				],
                formItem:{
                    skuId: "类型",
                    goodsName: "规格",
                    remarks: "材质",
                    spec: "长度",
                    quantity: "数量",
					unit: "备注",
					name:'钢厂',
					name2:'投标量',
					name3:"单价",
					name4:'仓库',
					name5:'包到',
					name6:'运价',
					name7:'金额'
                }
			}
		},
        computed:{
            num() {
                return this.tabData.length;
            }
		},
		methods: {
			init(){
				this.tabData = [];
			},
			close() {
				this.$bus.$emit('closeDialog');
			},
			getGoods(){
				return this.tabData;
			},
			// target
			handleDetailBlur(event, row, key, index) {
				this.refEle = $(event.target);
					if(key === "quantity" || key === "unitPrice" || key === "taxRate") {
						let val = event.target.value;
						this.handleValidate(event.target.value, this.refEle, index)
					}
					this.amount = 0;
					for(var i =0;i<this.tabData.length;i++){
					this.amount+= this.tabData[i].quantity * this.tabData[i].unitPrice;
					this.tabData[i]['totalAmount'] = this.$appConst.fmoney(this.tabData[i].quantity * this.tabData[i].unitPrice, 2);
				}
				if (key === 'unitPrice') {
					row.unitPrice ? row.unitPrice = this.$appConst.fmoney(row.unitPrice, 4) : '';
				}
			},
			handleValidate(val, ele, index) {
				if(!isNaN(Number(val)) && val) {
					$(ele).css("border-color", "#dcdfe6");
					return true
				}else if(isNaN(Number(val)) && val) {
					$(ele).css("border-color", "#f56c6c")
					this.$message.error("只能填写数字，请重新输入！");
					return false;
				}else if(!val) {
					$(ele).css("border-color", "#f56c6c")
					this.$message.error("此项为必填项，请重新输入！");
					return false
				}
			},
			handleValidateAll() {
				var flag = true;
				for(var i =0;i<this.tabData.length;i++){
						if(!this.tabData[i]['quantity'] ||　isNaN(Number(this.tabData[i]['quantity']))) {
								$('.detailEntry input').eq(4+i*10).css("border-color", "#f56c6c");
								flag = false;
								return flag;
						}
						if(!this.tabData[i]['unitPrice'] ||　isNaN(Number(this.tabData[i]['unitPrice']))) {
								$('.detailEntry input').eq(7+i*10).css("border-color", "#f56c6c");
								flag = false;
								return flag;
						}
						if(!this.tabData[i]['taxRate'] ||　isNaN(Number(this.tabData[i]['taxRate']))) {
								$('.detailEntry input').eq(8+i*10).css("border-color", "#f56c6c");
								flag = false;
								return flag;
						}
				}
				return flag;
			}
		},
		mounted() {
			var vm = this;
			vm.$bus.$on('initForm',function() {
				vm.init();
			});
		},
		components: {
			
		}
	}
</script>
<style  scoped>
.detailAdd{
	text-align:center;
	color:#FB9022;
	height:40px;
	line-height:40px;
	border-bottom:1px solid #EBEEF5;
	margin-bottom:20px;
}
</style>
<template>
	<div>
		<el-table 
			ref="multipleTable" 
			tooltip-effect="dark" 
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
					<!-- 品名 -->
					<el-select v-if='key=="breed"' v-model="scope.row[key]"  clearable=""  style="width:100%;" @change="querySpec(scope.row[key])">
						<el-option :label="item" :value="item" v-for="(item,index) in breeds" :key="index"></el-option>
					</el-select>
					<!-- 规格 -->
					<el-select v-if='key=="spec"' v-model="scope.row[key]"  clearable=""  style="width:100%;">
						<el-option :label="item" :value="item" v-for="(item,index) in specs" :key="index"></el-option>
					</el-select>
  					<el-input
  						v-else
  						v-model="scope.row[key]"
  						class="editInput"
  						:keyVal="key"
  					    :index="scope.$index"
  						:val="scope.row[key]"
  						@blur="handleDetailBlur($event, scope.row, key, scope.$index)"
  						>
  					</el-input>
			    </template>
		    </el-table-column>

		     <el-table-column
		      	fixed="right"
		      	label="操作"
		      	width="120">
			    <template slot-scope="scope">
					<i class="el-icon-delete" @click="handleDeleteRow(scope.$index)"  style="cursor:pointer;font-size:18px"></i>
			    </template>
		    </el-table-column>
		</el-table> 
		<div class="detailAdd">
			<span class="redColor pointer" @click="handleDetailAdd()"><i class="el-icon-plus"></i>添加</span>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				breeds:[],
				specs:[],
                tabData:[
				],
                formItem:{
					skuId: "编号",
					breed: "品名",
					spec: "规格",
					materielQuality: "材质",
					length: "长度",
					unit: "计量单位",
					quality:"数量"
                }
			}
		},
        computed:{
            num() {
                return this.tabData.length;
            }
		},
		methods: {
			// 查询所有的品名
			query(){
				this.$http.get(`${this.$apiUrl.materiel.query}`)
				.then(res=>{
					var arr = res.data.data.content.map(item=>item.breed);
					this.breeds = new Set(arr);
				});
			},
			// 根据品名查询规格
			querySpec(breed){
				this.$http.get(`${this.$apiUrl.materiel.query}/breed=${breed}`)
				.then(res=>{
					var arr = res.data.data.content.map(item=>item.spec);
					this.specs = new Set(arr);
				});
			},
			init(){
				this.tabData = [];
			},
			close() {
				this.$bus.$emit('closeDialog');
			},
			getGoods(){
				return this.tabData;
			},
			setGoods(goods){
				this.tabData = goods;
			},
			// 添加行
			handleDetailAdd() {
				var json = {};
					for(var key in this.formItem){
						json[key] = '';
					}
				this.tabData.push(json);
			},
			// 删除 行
			handleDeleteRow(index) {
				this.tabData.splice(index,1);
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
					// this.tabData[i]['totalAmount'] = this.$appConst.fmoney(this.tabData[i].quantity * this.tabData[i].unitPrice, 2);
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
			this.query();
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
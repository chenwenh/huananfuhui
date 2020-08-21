<template>
<div style="width:100%;height:100%;" class="map">
    <div style="width:300px;float:left;background:white;" class="leftContent">
        <h3 class="borderBottom">甲方系统车辆控制区域</h3>
        <el-tree
        :data="carsArray"
        show-checkbox
        node-key="id"
        ref="tree"
        :default-expanded-keys="[2, 3]"
        @check-change="handleCheckChange"
        style="height:400px;overflow:auto;">
        </el-tree>
        <h3 class="borderBottom borderTop">历史轨迹查询</h3>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini" style="padding-right:10px;">
            <el-form-item label="车牌号" prop="number">
                <el-input v-model="ruleForm.number"></el-input>
            </el-form-item>
            <el-form-item label="开始时间" required>
                <el-form-item prop="startTime">
                    <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="ruleForm.startTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-form-item>
             <el-form-item label="结束时间" required>
                <el-form-item prop="endTime">
                    <el-date-picker  value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="ruleForm.endTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-form-item>
             <el-form-item label="停靠点" prop="checked">
                <el-checkbox v-model="ruleForm.checked">查询停靠点</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div style="width:calc(100% - 320px);float:right;height:100%;">
        <iframe id="comp-frame" style="width:calc(100% - 10px);height:90%;" border="0" src="http://components.sinoiov.cn/index.html?k=09A50240-B292-4B92-8A31-419DA8C31674"></iframe>
        <el-button @click="setCenter()">设置地图中心点位置</el-button>  
        <el-button @click="setControl()">设置缩放控件显示</el-button>
        <el-button @click="setControl2()">设置缩放控件隐藏</el-button>
        <el-button @click="addMarker()">添加车辆定位点</el-button>
        <el-button @click="updateMarker()">更新车辆定位点</el-button>
        <el-button @click="removeMarker()">删除指定定位点</el-button>
        <el-button @click="clearOverlays()">删除所有定位点</el-button>
        <el-button @click="drawTrack()">绘制历史轨迹</el-button>
        <el-button @click="drawStopPoints()">绘制停靠点</el-button>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            checkedTrees:[],
            checkedNames:[],
            ruleForm:{
                number:"",
                startTime:"",
                endtTime:"",
                checked:false
            },
            rules:{
                number: [
                    { required: true, message: '请输入车牌号', trigger: 'blur' },
                ],
                startTime: [
                    { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
                ],
                endTime: [
                    { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
                ],
            },
            win:'',
            controlShow:true,
            carsArray:[
                {
                    id: 1,
                    label: '我的车队',
                    children: [
                        {
                            id: 2,
                            label: '京A12345',
                            children: []
                        },
                        {
                            id: 3,
                            label: '京A22345',
                            children: []
                        },
                        {
                            id: 4,
                            label: '京A32345',
                            children: []
                        },
                        {
                            id: 5,
                            label: '京A42345',
                            children: []
                        },
                        {
                            id: 6,
                            label: '京A62345',
                            children: []
                        },
                    ]
                }
            ]
        }
    },
    methods:{
        setCenter(){
            this.win.postMessage('{"action":"setCenter","data":{"lng":113.704375,"lat":24.8203867}}','*');
        },
        setControl(controlShow){
            this.win.postMessage('{"action":"setControl","data":true}','*');
        },
        setControl2(controlShow){
            this.win.postMessage('{"action":"setControl","data":false}','*');
        },
        addMarker(){
            this.win.postMessage(`
            {
                "action": "addMarker",
                "data": {
                    "id": "marker01",
                    "showTip": true,
                    "tipData": {
                        "title": "京A12345",
                        "speed": "68km/h",
                        "address": "北京海淀上帝西路8号",
                        "upTime": "2017-05-06 15:25:33"
                    },
                    "offset": {
                        "x": 0,
                        "y": 25
                    },
                    "position": {
                        "lat": 40.1302155765804,
                        "lng": 117.80105123046874
                    },
                    "icon": {
                        "src":"http://192.168.28.87:8086/static/images/car.png",
                        "size": {
                            "width": 20,
                            "height": 40
                        },
                        "offset": {
                            "x": 0,
                            "y": 0
                        }
                    },
                    "label": {
                        "text": "京A12345",
                        "html": "",
                        "offset": {
                            "x": 0,
                            "y": -20
                        },
                        "angle": 0
                    }
                }
            }`,'*');
        },
        updateMarker(){
            this.win.postMessage(`{
                "action": "updateMarker",
                "data": {
                    "id": "marker01",
                    "showTip": true,
                    "tipData": {
                        "title": "京A12345",
                        "speed": "68km/h",
                        "address": "北京海淀上帝西路9号",
                        "upTime": "2017-05-06 15:25:33"
                    },
                    "offset": {
                        "x": 0,
                        "y": 0
                    },
                    "position": {
                        "lat": 22.8203833,
                        "lng": 113.704375
                    },
                    "icon": {
                        "src": "http://api.transmap.com.cn/images/marker_.png",
                        "size": {
                            "width": 23,
                            "height": 34
                        },
                        "offset": {
                            "x": -15,
                            "y": -46
                        }
                    },
                    "label": {
                        "text": "京A22345",
                        "html": "",
                        "offset": {
                            "x": 0,
                            "y": 0
                        }
                    }
                }
            }`,'*');
        },
        removeMarker(){
            this.win.postMessage(`{"action":"removeMarker","data":{"id":"marker01"}}`,'*');
        },
        clearOverlays(){
            this.win.postMessage(`{"action":"clearOverlays"}`,'*');
        },
        drawTrack(){
            this.win.postMessage(`{
                "action": "drawTrack",
                "data": {
                    "vno": "京A12345",
                    "trackData": [{
                        "lng": 113.704375,
                        "lat": 24.8203867,
                        "time": 1498468172000,
                        "speed": 60,
                        "mileage": 0
                    }, {
                        "lng": 113.704375,
                        "lat": 23.82038,
                        "time": 1498468202000,
                        "speed": 60,
                        "mileage": 0.7458405882190926
                    }, {
                        "lng": 120.704375,
                        "lat": 23.820385,
                        "time": 1498468232000,
                        "speed": 60,
                        "mileage": 1.3024380426159599
                    },
                    {
                        "lng": 117.80105123046874,
                        "lat": 40.1302155765804,
                        "time": 1498468322000,
                        "speed": 60,
                        "mileage": 1.6697923628365445
                    }]
                }
            }`,'*');
                // $("[src='images/start_end_icon.png']").hide();
                // $('#clear-btn').hide();
        },
        drawStopPoints(){
            this.win.postMessage(`{
                "action": "drawStopPoints",
                "data": {
                    "stopPoints": [{
                        "address": "天津市蓟县田野农家，向东方向，253米",
                        "stime": 1498705240102,
                        "etime": "2017-06-27 14:22:50",
                        "lat": 40.1302155765804,
                        "lng": 117.80105123046874,
                        "duration": "18.0"
                    }]
                }
            }`,'*');
        },
        handleCheckChange () {
            let res = this.$refs.tree.getCheckedNodes()
            this.checkedTrees = [];
            this.checkedNames = [];
            var vm = this;
            res.forEach((item) => {
                vm.checkedTrees.push(item.id);
                vm.checkedNames.push(item.label);
                vm.ruleForm.number = vm.checkedNames.join(',');
            })
        },
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
    },
    mounted(){
        var win = document.getElementById("comp-frame").contentWindow;
        this.win = win;
    }
}
</script>
<style  scoped>
.map .leftContent{
    border:1px solid #ccc;
}
.map .borderBottom{
    border-bottom:1px solid #ccc;
}
.map .borderTop{
    border-top:1px solid #ccc;
}
.hide{
    display: none;
}
</style>
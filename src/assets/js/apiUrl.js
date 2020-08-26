
/* eslint-disable */
export let apiUrl = {
    FILE_IP: FILE_IP,
    ClIENT_ID: ClIENT_ID,
    fileQuery: FILE_UPLOAD_URL,
    getSmsCode: apiGateway + '/auth/api/v1.0/user/send-captcha-sms',
    uploadFileApi:FILE_IP + FILE_UPLOAD_URL,//文件上传
    fileQuery:apiGateway + '/files/file/query/',//文件预览
    upload: FILE_UPLOAD_URL + "/",   //文件上传
    userInfo:apiGateway + '/auth/api/v1.0/user',//获取用户个人信息
    // login
    login: {
        loginUrl: apiGateway + '/auth/api/v1.0/token/new',
        isExist: apiGateway + '/auth/api/v1.0/user/isExist', // 校验用户名是否存在
        register: apiGateway + '/auth/api/v1.0/user/register', // 注册
        resetPassword: apiGateway + '/auth/api/v1.0/user/reset-password' // 重置密码
    },
    // 验证码
    sms: {
        getSmsCode: apiGateway + '/auth/api/v1.0/user/send-captcha-sms', // 用户名获取验证码
        getSmsCodeByMobile: apiGateway + '/smssvc/sms/v1.0/sendSms', // 电话获取验证码
        checkSmsMsg: apiGateway + '/smssvc/sms/v1.0/checkSmsMsg' // 校验验证码
    },
    // 项目管理
    project:{
        save:apiGateway2 +　'/projectInfo/save',//保存
        query:apiGateway2 + '/projectInfo/query',//查询
        queryTitle:apiGateway2 + '/projectInfo/queryTitle',//标题列表查询
        delete:apiGateway2 +　'/projectInfo/delete',//删除
        mergePublishStatus:apiGateway2  + '/projectInfo/mergePublishStatus',//改变状态
        update:apiGateway2 + '/projectInfo/update',//修改
        findById:apiGateway2 + '/projectInfo/findById/',//根据id查询详情
    },
    // 采购计划
    purchase:{
        save:apiGateway2 +　'/purchase-plan-info/save',//保存
        query:apiGateway2 + '/purchase-plan-info/query',//查询
        queryTitle:apiGateway2 + '/purchase-plan-info/queryTitle',//标题列表查询
        delete:apiGateway2 +　'/purchase-plan-info/delete',//删除
        mergePublishStatus:apiGateway2  + '/purchase-plan-info/mergePublishStatus',//改变状态
        update:apiGateway2 + '/purchase-plan-info/update',//修改
        findById:apiGateway2 + '/purchase-plan-info/findById/',//根据id查询详情
    },
    // 销售信息
    salesInfo:{
        save:apiGateway2 +　'/sales-info/save',//保存
        query:apiGateway2 + '/sales-info/query',//查询
        queryTitle:apiGateway2 + '/sales-info/queryTitle',//标题列表查询
        delete:apiGateway2 +　'/sales-info/delete',//删除
        mergePublishStatus:apiGateway2  + '/sales-info/mergePublishStatus',//改变状态
        update:apiGateway2 + '/sales-info/update',//修改
        findById:apiGateway2 + '/sales-info/findById/',//根据id查询详情
    },
    // 物料
    materiel:{
        save:apiGateway2 +　'/materiel-info/save',//保存
        query:apiGateway2 +　'/materiel-info/query',//查询所有的物料
        delete:apiGateway2 + '/materiel-info/delete',//删除
        update:apiGateway2 +　'/materiel-info/update',//更新
    },
    // 公告
    notice:{
        save:apiGateway2 +　'/notice-info/save',//保存
        query:apiGateway2 +　'/notice-info/query',//查询所有的物料
        delete:apiGateway2 + '/notice-info/delete',//删除
        update:apiGateway2 +　'/notice-info/update',//更新
        findById:apiGateway2 + '/notice-info/findById/',//根据id查询详情
    },
    // 协议管理
    agreement: {
        create: currentApiUrl + '/agreement/create', // 创建
        sign: currentApiUrl + '/agreement/sign', // 签署
        update: currentApiUrl + '/agreement/update' // 更新
    },
    // 审核
    serviceFulfillment: {
        apply: currentApiUrl + '/business/apply', // 提交业务开通申请  业务开通步骤1 
        process: currentApiUrl + '/business/process', // 审批业务开通申请 业务开通步骤2 平台审核
        query: currentApiUrl + '/business/query' // 审核查询 业务开通步骤2 list/开通状态
    },
    // 授信
    credit: {
        apply: currentApiUrl + '/credit/apply', // 申请
        cancel: currentApiUrl + '/credit/cancel', // 取消
        query: currentApiUrl + '/credit/query' // 查询
    }
}

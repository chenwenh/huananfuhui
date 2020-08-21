
/* eslint-disable */
export let apiUrl = {
    FILE_IP: FILE_IP,
    ClIENT_ID: ClIENT_ID,
    fileQuery: FILE_UPLOAD_URL,
    // 浪潮项目
    queryContract:langchaoUrl + '/asset/query',//合同查询
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
}

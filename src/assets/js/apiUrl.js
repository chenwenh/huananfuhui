
/* eslint-disable */
export let apiUrl = {
    // 浪潮项目
    loginUrl: apiGateway + '/auth/api/v1.0/token/new',

    queryContract:langchaoUrl + '/asset/query',//合同查询
    getSmsCode: apiGateway + '/auth/api/v1.0/user/send-captcha-sms',
    uploadFileApi:uploadFile + fileQuery,//文件上传
    fileQuery:apiGateway + '/files/file/query/',//文件预览
}

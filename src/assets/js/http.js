/* eslint-disable func-names */
import axios from 'axios'
import router from '../../router'
import store from '../../store'
// import { global } from '../../assets/js/global'
import Vue from 'vue'

axios.defaults.timeout = 500000

// let loader = null
axios.interceptors.request.use(
    config => {
        config.headers = {
            // 'org_id': JSON.parse(sessionStorage.getItem('user')).orgId,
            // 'org_name': encodeURI(JSON.parse(sessionStorage.getItem('user')).orgName),
            // 'user_id': JSON.parse(sessionStorage.getItem('user')).id,
            // 'username': JSON.parse(sessionStorage.getItem('user')).username
        }
        if (window.sessionStorage.getItem('token')) {
            config.headers.Authorization = window.sessionStorage.getItem('token');
            config.headers.org_id = JSON.parse(sessionStorage.getItem('user')).orgId;
            config.headers.org_name = encodeURI(JSON.parse(sessionStorage.getItem('user')).orgName);
            config.headers.user_id = JSON.parse(sessionStorage.getItem('user')).id;
            config.headers.username = JSON.parse(sessionStorage.getItem('user')).username;
        }
        
        // loader = new Vue().$loading({
        //     text: '努力加载中...',
        //     spinner: 'el-icon-loading',
        //     background: 'rgba(0, 0, 0, 0.7)'
        // })
        store.commit('SET_LOADING', true)
        return config
    },
    error => {
        store.commit('SET_LOADING', false)
        // loader.close()
        return Promise.reject(error.response)
    }
)
// http response 拦截器
axios.interceptors.response.use(
    response => {
        // if (response.data.errCode === 2) {
        //     router.push({
        //         path: '/login',
        //             querry: {
        //             redirect: router.currentRoute.fullPath
        //         }// 从哪个页面跳转
        //     })
        // }
        store.commit('SET_LOADING', false)
        // loader.close()
        return response
    },
    error => {
        if(error.response.data.message.indexOf('无效的Token')!=-1){
            router.push({
                path: '/login'
            })
        }
        store.commit('SET_LOADING', false)
        // loader.close()
        // let errMsg = error.response.data.message
        // global.errMsg(errMsg);
        return Promise.reject(error.response)
    }
)

export default axios

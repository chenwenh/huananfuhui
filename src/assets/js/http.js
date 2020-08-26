/* eslint-disable func-names */
import axios from 'axios'
import router from '../../router'
import store from '../../store'
import Vue from 'vue'

axios.defaults.timeout = 500000

axios.interceptors.request.use(
    config => {
        if (window.sessionStorage.getItem('token')) {
            config.headers.Authorization = window.sessionStorage.getItem('token');
            config.headers.org_id = JSON.parse(sessionStorage.getItem('user')).orgId;
            config.headers.org_name = encodeURI(JSON.parse(sessionStorage.getItem('user')).orgName);
            config.headers.user_id = JSON.parse(sessionStorage.getItem('user')).id;
            config.headers.username = JSON.parse(sessionStorage.getItem('user')).username;
        }
        store.commit('SET_LOADING', true)
        return config
    },
    error => {
        store.commit('SET_LOADING', false)
        return Promise.reject(error.response)
    }
)
// http response 拦截器
axios.interceptors.response.use(
    response => {
        store.commit('SET_LOADING', false)
        return response
    },
    error => {
        if(error.response.data.message.indexOf('无效的Token')!=-1 || error.response.data.message.indexOf('Token无效或已过期')!=-1){
            // router.push({
            //     path: '/login'
            // })
            sessionStorage.clear();
        }
        store.commit('SET_LOADING', false)
        return Promise.reject(error.response)
    }
)

export default axios

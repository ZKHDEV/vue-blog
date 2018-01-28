import axios from 'axios'
import store from './store/store'
import router from './router'
import types from './store/mutation-types'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://127.0.0.1:8010';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.loginUser && store.state.loginUser.token) {
            config.headers['X-Token'] = `${store.state.loginUser.token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code === -1) {
            // 清除token信息并跳转到登录页面
            store.commit(types.LOGOUT);
            router.replace({
                name: 'login',
                query: { redirect: router.currentRoute.fullPath }
            });
        }
        return response;
    },
    error => {
        router.replace({
            name: 'login',
            query: { redirect: router.currentRoute.fullPath }
        })
        // if (error.response) {
        //     switch (error.response.status) {
        //         case 401:
        //             // 401 清除token信息并跳转到登录页面
        //             store.commit(types.LOGOUT);
        //             router.replace({
        //                 name: 'login',
        //                 query: { redirect: router.currentRoute.fullPath }
        //             })
        //     }
        // }
        // return Promise.reject(error.response.data)
    }
);

export default axios;

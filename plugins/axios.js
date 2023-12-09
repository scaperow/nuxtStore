import { session, token } from "../pages/store";
import { pick } from "lodash";
export default function ({ $axios, redirect }) {
    // 设置默认请求头
    $axios.setHeader('Content-Type', 'application/json');

    // 请求拦截器
    $axios.onRequest((config) => {
        let token = localStorage.getItem('token');
        config.headers.common['Authorization'] = `Bearer ${token}`;

        return config;
    });

    // 响应拦截器
    $axios.onResponse((response) => {
        console.log('Response received:', response);
        if (response.code === 401) {
            //login
        } else {
            const { license, licenseExpireAt, token } = pick(response.data, 'license', 'licenseExpireAt', 'token');

            if (license !== undefined) {
                session.license = license;
            }

            if (licenseExpireAt !== undefined) {
                session.licenseExpireAt = licenseExpireAt;
            }

            if (token !== undefined) {
                session.token = token;
                localStorage.setItem('token', token);
            }
        }

        return response;
    });

    // 错误处理
    $axios.onError((error) => {
        console.log('Response error:');
        const code = parseInt(error.response && error.response.status);
        if (code === 401) {
            session.token = session.user = null;

            // router.go('/login');
        }
    });
}
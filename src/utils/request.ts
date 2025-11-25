import axios from 'axios';
import { ElMessage } from 'element-plus';

// 开发环境判断
const isDev = import.meta.env.DEV;


// 创建 axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, // 使用环境变量,注意是VITE开头
    timeout: 10000, // 请求超时时间
});



// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 显示加载状态（可选）
        if (config.showLoading !== false) {
            // 可以在这里触发全局 loading
        }

        // 添加 token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${JSON.parse(token).token}`;
        }

        // 添加时间戳防止缓存
        if (config.method === 'get' && !isDev) {
            config.params = {
                ...config.params,
                _t: Date.now()  // 参数后会加上_t，如果Mock没有处理将拦截不到
            };
        }

        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        // 隐藏加载状态
        // hideLoading();

        const res = response.data;

        // 根据后端返回格式调整
        if (res.code === 200 || res.code === 0 || res.success) {
            return res;
        } else {
            ElMessage.error(res.message || '请求失败');
            return Promise.reject(new Error(res.message || 'Error'));
        }
    },
    (error) => {
        // 隐藏加载状态
        // hideLoading();

        console.error('Response Error:', error);

        // 处理 HTTP 错误
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || '请求错误';

            switch (status) {
                case 400:
                    ElMessage.error(`请求参数错误: ${message}`);
                    break;
                case 401:
                    ElMessage.error('未授权，请重新登录');
                    localStorage.removeItem('token');
                    // router.push('/login');
                    break;
                case 403:
                    ElMessage.error('拒绝访问');
                    break;
                case 404:
                    ElMessage.error('请求地址不存在');
                    break;
                case 500:
                    ElMessage.error('服务器内部错误');
                    break;
                case 502:
                    ElMessage.error('网关错误');
                    break;
                case 503:
                    ElMessage.error('服务不可用');
                    break;
                default:
                    ElMessage.error(message);
            }
        } else if (error.request) {
            ElMessage.error('网络连接失败，请检查网络');
        } else {
            ElMessage.error('请求配置错误');
        }

        return Promise.reject(error);
    }
);

// 封装常用请求方法
export const http = {
    get: (url, params, config = {}) =>
        service.get(url, { params, ...config }),

    post: (url, data, config = {}) =>
        service.post(url, data, config),

    put: (url, data, config = {}) =>
        service.put(url, data, config),

    delete: (url, config = {}) =>
        service.delete(url, config),

    upload: (url, file, config = {}) => {
        const formData = new FormData();
        formData.append('file', file);
        return service.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            ...config
        });
    }
};

// 默认导出的是 axios 实例
export default service;

import axios from 'axios'

// 创建 Axios 实例
const instance = axios.create({
    baseURL: '/ap',
    timeout:10000   //  设置10秒超时时间
})

// 添加请求拦截器
instance.interceptors.request.use(config => {
    // 检查 token 的合法性
    const token = localStorage.getItem('jwtToken')
    if (!token) {
        // 如果 token 不合法，直接跳转到登录页面
        router.push('/')
        return Promise.reject('登录已过期，请重新登录')
    }
    // 在请求发送前添加请求头
    config.headers.token = token
    return config
}, error => {
    return Promise.reject(error)
})

export default instance
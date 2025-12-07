import http from '@/utils/request'


const api_name = '/product'

export default {
    getProductCategory (params) {
        return http.get(`${api_name}/category/list/tree`,params)
    },
}

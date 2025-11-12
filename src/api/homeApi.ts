import request from '@/utils/request';

export default {
    getTableData(params){
        return request({
            url:'/home/getTableData',
            method:"get",
            params
        })
    },
    getCountData(params){
        return request({
            url:"/home/getCountData",
            method:"get",
            data:params,
        })
    },
    getEchartsData(params){
        return request({
            url:"/home/getEchartsData",
            method:"get",
            data:params,
        })
    } ,
}

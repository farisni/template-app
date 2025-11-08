import request from '@/utils/request'; // 导入封装好的 axios 实例


export function getUserList() {
    return [ {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
    },
        // 可以添加更多数据来测试滚动条
        ...Array.from({ length: 30 }, (_, index) => ({
            date: `2016-05-${String(index + 1).padStart(2, '0')}`,
            name: `User${index + 1}`,
            state: 'California',
            city: 'Los Angeles',
            address: `No. ${index + 1}, Grove St, Los Angeles`,
            zip: 'CA 90036'
        }))]
}

// export default getUserList()

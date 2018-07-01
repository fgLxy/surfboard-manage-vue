import config from '@/configs'
import { fetch } from './fetch';

export default {

    async userList(pageNo, pageSize) {
        let params = {
            pageNo,
            pageSize
        }
        let rtn = await fetch(config.api.userList, params);
        return rtn.data
    },
    async addUser(params) {
        let rtn = await fetch(config.api.addUser, params);
        return rtn.data
    },
    async delUser(id) {
        let params = {
            id
        }
        let rtn = await fetch(config.api.delUser, params);
        return rtn.data
    },
    async updateUser(params) {
        let rtn = await fetch(config.api.updateUser, params);
        return rtn.data
    },
    async powerList() {
        let rtn = await fetch(config.api.powerList);
        return rtn.data
    },
    async updatePower(groupName, productName, newValue) {
        let params = {
            groupName,
            productName,
            newValue
        }
        let rtn = await fetch(config.api.updatePower, params);
        return rtn.data
    },
    async addPower(groupName) {
        let params = {
            groupName
        }
        let rtn = await fetch(config.api.addPower, params);
        return rtn.data
    },
    async deletePower(groupName) {
        let params = {
            groupName
        }
        let rtn = await fetch(config.api.deletePower, params);
        return rtn.data
    },
    async storageList(pageNo, pageSize) {
    	let params = {
            pageNo,
            pageSize
        }
        let rtn = await fetch(config.api.storageList, params);
        return rtn.data
    },
    async addStorage(name) {
        let params = {
            name
        }
        let rtn = await fetch(config.api.addStorage, params);
        return rtn.data
    },
    async delStorage(name) {
        let params = {
            name
        }
        let rtn = await fetch(config.api.delStorage, params);
        return rtn.data
    },
    async totalIncome(dateRange) {
        let params = {
            startDate: dateRange ? dateRange[0] : '',
            endDate: dateRange ? dateRange[1] : ''
        }
        let rtn = await fetch(config.api.totalIncome, params);
        return rtn.data
    },
    async dataList(pageNo, pageSize, dateRange) {
        let params = {
            pageNo,
            pageSize,
            startDate: dateRange ? dateRange[0] : '',
            endDate: dateRange ? dateRange[1] : ''
        }
        let rtn = await fetch(config.api.dataList, params);
        return rtn.data
    },
    async exportDataList(dateRange) {
        let params = dateRange ? {
            startDate: dateRange[0],
            endDate: dateRange[1]
        } : {}
        let rtn = await fetch(config.api.exportDataList, params, {responseType: 'blob'});
        return rtn.data
    },
    async surfboardList(pageNo, pageSize) {
        let params = {
            pageNo,
            pageSize
        }
        let rtn = await fetch(config.api.surfboardList, params);
        return rtn.data
    },
    async addSurfboard(params) {
        let rtn = await fetch(config.api.addSurfboard, params);
        return rtn.data
    },
    async delSurfboard(id) {
        let params = {
            id
        }
        let rtn = await fetch(config.api.delSurfboard, params);
        return rtn.data
    },
    async updateSurfboard(params) {
        let rtn = await fetch(config.api.updateSurfboard, params);
        return rtn.data
    },
    async surfboardStateList(pageNo, pageSize, queryCondition) {
        let params = {
            pageNo,
            pageSize,
            ...queryCondition
        }
        let rtn = await fetch(config.api.surfboardStateList, params);
        return rtn.data
    }
}

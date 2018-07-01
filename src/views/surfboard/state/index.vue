<template>
    <custom-table :dataAPI="getData" :eventHub="eventHub" :pageSize="pageSize" :tableColumns="columData">
        <template slot="header">
            <checkbox-group v-model="queryCondition.status" :key="statusSelection.title" :title="statusSelection.title":checks="statusSelection.list" @change="handleConditionChange">
            </checkbox-group>
            <checkbox-group v-model="queryCondition.type" :key="typeSelection.title" :title="typeSelection.title":checks="typeSelection.list" @change="handleConditionChange">
            </checkbox-group>
            <checkbox-group v-model="queryCondition.size" :key="sizeSelection.title" :title="sizeSelection.title":checks="sizeSelection.list" @change="handleConditionChange">
            </checkbox-group>
            <checkbox-group v-model="queryCondition.storage" :key="storageSelection.title" :title="storageSelection.title":checks="storageSelection.list" @change="handleConditionChange" >
            </checkbox-group>
        </template>
    </custom-table>
</template>
<script>
    import api from '@/service/index.js'
    import Vue from 'vue'
    import checkboxGroup from '@/components/checkboxGroup'
    import customTable from '@/components/customTable'
    export default {
        name: 'state',
        components: {
            checkboxGroup, customTable
        },
        data: function(){
            let sizeEnums = require('@/enums/surfboardSize.js').default
            let typeEnums = require('@/enums/surfboardType.js').default
            let statusEnums = require('@/enums/surfboardStatus.js').default
            return {
                eventHub: new Vue(),
                queryCondition: {
                    status: [],
                    type: [],
                    size: [],
                    storage: []
                },
                statusSelection: {
                    title: 'surfboard.state.state',
                    list: statusEnums.enums
                },
                typeSelection: {
                    title: 'surfboard.state.type',
                    list: typeEnums.enums
                },
                sizeSelection: {
                    title: 'surfboard.state.size',
                    list: sizeEnums.enums
                },
                storageSelection: {
                    title: 'surfboard.state.storage',
                    list: []
                },
                columData: [{
                    prop: 'id',
                    label: 'surfboard.state.id',
                    sortable: true
                }, {
                    prop: 'series',
                    label: 'surfboard.state.series'
                }, {
                    prop: 'type',
                    label: 'surfboard.state.type'
                }, {
                    prop: 'size',
                    label: 'surfboard.state.size',
                    sortable: true
                }, {
                    prop: 'num',
                    label: 'surfboard.state.num',
                    sortable: true
                }, {
                    prop: 'storage',
                    label: 'surfboard.state.storage'
                }, {
                    prop: 'state',
                    label: 'surfboard.state.state'
                }, {
                    prop: 'rentType',
                    label: 'surfboard.state.renttype'
                }, {
                    prop: 'length',
                    label: 'surfboard.state.length'
                }, {
                    prop: 'price',
                    label: 'surfboard.state.price'
                }, {
                    prop: 'outTime',
                    label: 'surfboard.state.outtime',
                    sortable: true
                },  {
                    prop: 'returnTime',
                    label: 'surfboard.state.returntime',
                    sortable: true
                }, {
                    prop: 'customName',
                    label: 'surfboard.state.custom.name'
                }, {
                    prop: 'customNationality',
                    label: 'surfboard.state.custom.nationality'
                }, {
                    prop: 'customPassport',
                    label: 'surfboard.state.custom.passport'
                }, {
                    prop: 'customPhone',
                    label: 'surfboard.state.custom.phone'
                }, {
                    prop: 'customEmail',
                    label: 'surfboard.state.custom.email'
                }],
                pageSize: 20
            }
        },
        mounted: async function() {
            let storageRtn = await api.storageList()
            this.storageSelection.list = []
            storageRtn.records.forEach(item => {
                let storage = {
                    key: item.name,
                    label: item.name
                }
                this.storageSelection.list.push(storage)
            })
        },
        methods: {
            async getData(pageNo, pageSize) {
                let data = await api.surfboardStateList(pageNo, pageSize, this.queryCondition)
                this.recNum = data.recNum || 0
                return data
            },
            handleConditionChange() {
                this.eventHub.$emit('refresh')
            }
        }
    }
</script>

<style scoped lang="less">

</style>

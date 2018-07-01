<template>
    <custom-table :dataAPI="getData" :eventHub="eventHub" :pageSize="pageSize" :tableColumns="columData">
        <template slot="header">
            <el-row>
                <el-col :span="20">
                    <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    align="right"
                    unlink-panels
                    value-format="yyyy-MM-dd"
                    :range-separator="$t('date.split')"
                    :start-placeholder="$t('date.start')"
                    :end-placeholder="$t('date.end')">
                    </el-date-picker>
                    <el-button type="primary" @click="exportData">{{$t('data.manage.export')}}</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button-group>
                        <el-button type="primary">{{$t('data.manage.totalincome')}}</el-button>
                        <el-button>{{totalIncome}}</el-button>
                    </el-button-group>
                </el-col>
            </el-row>
        </template>
    </custom-table>
</template>

<script>
    import Vue from 'vue'
    import customTable from '@/components/customTable'
    import api from '@/service/index.js'

    export default {
        name: 'depot',
        components: {
            customTable
        },
        data: function() {
            return {
                totalIncome: 0,
                eventHub: new Vue(),
                dateRange: [],
                pageSize: 20,
                columData: [{
                    prop: 'surfboardId',
                    label: 'data.manage.id'
                }, {
                    prop: 'storage',
                    label: 'data.manage.storage'
                }, {
                    prop: 'name',
                    label: 'data.manage.name'
                }, {
                    prop: 'type',
                    label: 'data.manage.type'
                }, {
                    prop: 'size',
                    label: 'data.manage.size'
                }, {
                    prop: 'num',
                    label: 'data.manage.seq'
                }, {
                    prop: 'rentStatus',
                    label: 'data.manage.state'
                }, {
                    prop: 'rentType',
                    label: 'data.manage.leasetype'
                }, {
                    prop: 'rentLength',
                    label: 'data.manage.leasetime'
                }, {
                    prop: 'eachPrice',
                    label: 'data.manage.leaseunitprice'
                }, {
                    prop: 'outTime',
                    label: 'data.manage.outtime'
                }, {
                    prop: 'returnTime',
                    label: 'data.manage.estimateintime'
                }, {
                    prop: 'income',
                    label: 'data.manage.income'
                }]
            }
        },
        watch: {
            dateRange(to, from) {
                this.eventHub.$emit('refresh')
            }
        },
        methods: {
            async getData(pageNo, pageSize){
                let data = await api.dataList(pageNo, pageSize, this.dateRange)
                this.recNum = data.recNum || 0
                let totalIncomeRtn = await api.totalIncome(this.dateRange)
                this.totalIncome = totalIncomeRtn || 0
                return data
            },
            async exportData() {
                let data = await api.exportDataList(this.dataRange)
            }
        }
    }
</script>

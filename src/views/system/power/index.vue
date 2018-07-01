<template>
    <div>
        <custom-table :dataAPI="getData" :tableColumns="columDatas" :eventHub="eventHub" :deleteFunc="deleteFunc">
            <!-- 表格头部 -->
            <template slot="header">
                <el-row>
                    <el-col :span="20">
                        <el-button-group>
                            <el-button type="primary">{{$t('power.manage.total')}}</el-button>
                            <el-button>{{recNum}}</el-button>
                        </el-button-group>
                    </el-col>
                    <el-col :span="4">
                        <el-button-group>
                            <el-button type="primary" @click="dialogFormVisible = true">{{$t('power.manage.add')}}</el-button>
                        </el-button-group>
                    </el-col>
                </el-row>
            </template>

            <!-- 自定义表格 -->
            <template slot="surfboardManage" slot-scope="scope">
                <el-button type="success" icon="el-icon-check" circle v-if="scope.row.powerList.indexOf('surfboardManage')>=0" @click="updatePower(scope.row, 'surfboardManage', false)"></el-button>
                <el-button type="danger" icon="el-icon-close" circle v-if="scope.row.powerList.indexOf('surfboardManage')<0" @click="updatePower(scope.row, 'surfboardManage', true)"></el-button>
            </template>
            <template slot="surfboardStorage" slot-scope="scope">
                <el-button type="success" icon="el-icon-check" circle v-if="scope.row.powerList.indexOf('surfboardStorage')>=0" @click="updatePower(scope.row, 'surfboardStorage', false)"></el-button>
                <el-button type="danger" icon="el-icon-close" circle v-if="scope.row.powerList.indexOf('surfboardStorage')<0" @click="updatePower(scope.row, 'surfboardStorage', true)"></el-button>
            </template>
            <template slot="systemUser" slot-scope="scope">
                <el-button type="success" icon="el-icon-check" circle v-if="scope.row.powerList.indexOf('systemUser')>=0" @click="updatePower(scope.row, 'systemUser', false)"></el-button>
                <el-button type="danger" icon="el-icon-close" circle v-if="scope.row.powerList.indexOf('systemUser')<0" @click="updatePower(scope.row, 'systemUser', true)"></el-button>
            </template>
            <template slot="systemPower" slot-scope="scope">
                <el-button type="success" icon="el-icon-check" circle v-if="scope.row.powerList.indexOf('systemPower')>=0" @click="updatePower(scope.row, 'systemPower', false)"></el-button>
                <el-button type="danger" icon="el-icon-close" circle v-if="scope.row.powerList.indexOf('systemPower')<0" @click="updatePower(scope.row, 'systemPower', true)"></el-button>
            </template>
            <template slot="surfboardData" slot-scope="scope">
                <el-button type="success" icon="el-icon-check" circle v-if="scope.row.powerList.indexOf('surfboardData')>=0" @click="updatePower(scope.row, 'surfboardData', false)"></el-button>
                <el-button type="danger" icon="el-icon-close" circle v-if="scope.row.powerList.indexOf('surfboardData')<0" @click="updatePower(scope.row, 'surfboardData', true)"></el-button>
            </template>
            <template slot="surfboardState" slot-scope="scope">
                <el-button type="success" icon="el-icon-check" circle v-if="scope.row.powerList.indexOf('surfboardState')>=0" @click="updatePower(scope.row, 'surfboardState', false)"></el-button>
                <el-button type="danger" icon="el-icon-close" circle v-if="scope.row.powerList.indexOf('surfboardState')<0" @click="updatePower(scope.row, 'surfboardState', true)"></el-button>
            </template>
        </custom-table>
         <!-- 新增表单弹窗 -->
        <el-dialog :title="$t('power.manage.add.title')" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item :label="$t('power.manage.name')" :label-width="formLabelWidth">
                  <el-input v-model="form.groupName" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="addSubmit">{{$t('submit')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Vue from 'vue'
    import customTable from '@/components/customTable'
    import api from '@/service/index.js'

    export default {
        name: 'group',
        components: {
            customTable
        },
        data() {
            return {
                formLabelWidth: '90px',
                dialogFormVisible: false,
                form: {
                    groupName: ''
                },
                eventHub: new Vue(),
                recNum: 0,
                columDatas: [{
                    prop: 'groupName',
                    label: 'power.manage.name'
                }, {
                    prop: 'surfboardManage',
                    label: 'surfboard.manage',
                    custom: true
                }, {
                    prop: 'surfboardStorage',
                    label: 'storage.manage',
                    custom: true
                }, {
                    prop: 'systemUser',
                    label: 'user.manage',
                    custom: true
                }, {
                    prop: 'systemPower',
                    label: 'power.manage',
                    custom: true
                }, {
                    prop: 'surfboardData',
                    label: 'data.manage',
                    custom: true
                }, {
                    prop: 'surfboardState',
                    label: 'surfboard.state',
                    custom: true
                }]
            }
        },
        methods: {
            async getData() {
                let data = await api.powerList()
                this.recNum = data.recNum || 0
                return data 
            },
            async updatePower(row, productName, newValue) {
                let data = await api.updatePower(row.groupName, productName, newValue)
                this.eventHub.$emit('refresh')
                return data
            },
            async deleteFunc(index, row) {
                let data = await api.deletePower(row.groupName)
                this.eventHub.$emit('refresh')
                return data
            },
            async addSubmit() {
                let data = await api.addPower(this.form.groupName)
                this.form.groupName = ''
                this.dialogFormVisible = false
                this.eventHub.$emit('refresh')
                return data
            }
        }
    }
</script>

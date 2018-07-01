<template>
    <div>
        <custom-table :dataAPI="getData" :eventHub="eventHub" :pageSize="pageSize" :tableColumns="columData" :deleteFunc="deleteFunc" :editFunc="editFunc">
            <template slot="header">
                <el-row>
                    <el-col :span="20">
                        <el-button-group>
                            <el-button type="primary">{{$t('user.manage.total')}}</el-button>
                            <el-button>{{recNum}}</el-button>
                        </el-button-group>
                    </el-col>
                    <el-col :span="4">
                        <el-button-group>
                            <el-button type="primary" @click="addFunc">{{$t('user.manage.add')}}</el-button>
                        </el-button-group>
                    </el-col>
                </el-row>
            </template>
        </custom-table>
        <!-- 新增表单弹窗 -->
        <el-dialog :title="$t('user.manage.add.title')" :visible.sync="addDialogVisible">
            <el-form :model="form">
                <el-form-item :label="$t('user.manage.name')" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('user.manage.phone')" :label-width="formLabelWidth">
                  <el-input v-model="form.phoneNumber" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('user.manage.group')" :label-width="formLabelWidth">
                    <el-select v-model="form.groupName" :placeholder="$t('choose')">
                        <el-option
                        v-for="item in groups"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('user.manage.storage')" :label-width="formLabelWidth">
                    <el-select v-model="form.storage" :placeholder="$t('choose')">
                        <el-option
                        v-for="item in storages"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('user.manage.jointime')" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.joinTime" value-format="yyyy-MM-dd" type="date" :placeholder="$t('chooseDate')">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="addSubmit">{{$t('submit')}}</el-button>
            </div>
        </el-dialog>
        <!-- 编辑表单弹窗 -->
        <el-dialog :title="$t('user.manage.edit.title')" :visible.sync="editDialogVisible">
            <el-form :model="form">
                <el-form-item :label="$t('user.manage.id')" :label-width="formLabelWidth">
                  <el-input v-model="form.id" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$t('user.manage.name')" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('user.manage.phone')" :label-width="formLabelWidth">
                  <el-input v-model="form.phoneNumber" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('user.manage.group')" :label-width="formLabelWidth">
                    <el-select v-model="form.groupName" :placeholder="$t('choose')">
                        <el-option
                        v-for="item in groups"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('user.manage.storage')" :label-width="formLabelWidth">
                    <el-select v-model="form.storage" :placeholder="$t('choose')">
                        <el-option
                        v-for="item in storages"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('user.manage.jointime')" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.joinTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" :placeholder="$t('chooseDate')">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="updateSubmit">{{$t('submit')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Vue from 'vue'
    import customTable from '@/components/customTable'
    import api from '@/service/index.js'

    export default {
        name: 'worker',
        components: {
            customTable
        },
        data() {
            return {
                eventHub: new Vue(),
                groups: [],
                storages: [],
                formLabelWidth: '90px',
                editDialogVisible: false,
                addDialogVisible: false,
                form: {
                    id: '',
                    joinTime: '',
                    storage: '',
                    name: '',
                    groupName: '',
                    phoneNumber: ''
                },
                recNum: 0,
                pageSize: 20,
                tableData: [],
                columData: [{
                    prop: 'id',
                    label: 'user.manage.id'
                }, {
                    prop: 'joinTime',
                    label: 'user.manage.jointime'
                }, {
                    prop: 'storage',
                    label: 'user.manage.storage'
                }, {
                    prop: 'name',
                    label: 'user.manage.name'
                }, {
                    prop: 'groupName',
                    label: 'user.manage.group'
                }, {
                    prop: 'phoneNumber',
                    label: 'user.manage.phone'
                }]
            }
        },
        mounted: async function() {
            let groupRtn = await api.powerList()
            this.groups = []
            groupRtn.records.forEach(item => {
                let group = {
                    key: item.groupName,
                    value: item.groupName,
                    label: item.groupName
                }
                this.groups.push(group)
            })
            let storageRtn = await await api.storageList()
            this.storages = []
            storageRtn.records.forEach(item => {
                let storage = {
                    key: item.name,
                    value: item.name,
                    label: item.name
                }
                this.storages.push(storage)
            })
        },
        methods: {
            async getData(pageNo, pageSize){
                let data = await api.userList(pageNo, pageSize)
                this.recNum = data.recNum || 0
                return data
            },
            async deleteFunc(index, row) {
                let data = await api.delUser(row.id)
                this.eventHub.$emit('refresh')
            },
            addFunc() {
                this.form = {}
                this.addDialogVisible=true
            },
            editFunc(index, row) {
                this.form = {
                    ...row
                }
                this.editDialogVisible=true
            },
            async updateSubmit() {
                let data = await api.updateUser(this.form)
                this.editDialogVisible = false
                this.eventHub.$emit('refresh')
            },
            async addSubmit() {
                let data = await api.addUser(this.form)
                this.addDialogVisible = false
                this.eventHub.$emit('refresh')
            }
        }
    }
</script>

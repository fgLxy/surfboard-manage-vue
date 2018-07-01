<template>
    <div>
        <custom-table :dataAPI="getData" :eventHub="eventHub" :pageSize="pageSize" :tableColumns="columData" :deleteFunc="deleteFunc" :editFunc="editFunc">
            <template slot="header">
                <el-row>
                    <el-col :span="20">
                        <el-button-group>
                            <el-button type="primary">{{$t('surfboard.manage.total')}}</el-button>
                            <el-button>{{recNum}}</el-button>
                        </el-button-group>
                    </el-col>
                    <el-col :span="4">
                        <el-button-group>
                            <el-button type="primary" @click="addFunc">{{$t('surfboard.manage.add')}}</el-button>
                        </el-button-group>
                    </el-col>
                </el-row>
            </template>
        </custom-table>
        <!-- 新增表单弹窗 -->
        <el-dialog :title="$t('surfboard.manage.add.title')" :visible.sync="addDialogVisible">
            <el-form :model="form">
                <el-form-item :label="$t('surfboard.manage.id')" :label-width="formLabelWidth">
                  <el-input v-model="form.id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('surfboard.manage.productiondate')" :label-width="formLabelWidth">
                  <el-date-picker v-model="form.productionDate" value-format="yyyy-MM-dd" type="date" :placeholder="$t('chooseDate')">
                    </el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('surfboard.manage.storage')" :label-width="formLabelWidth">
                    <radio-group v-model="form.storage" :checks="storages"></radio-group>
                </el-form-item>
                <el-form-item :label="$t('surfboard.manage.name')" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('surfboard.manage.type')" :label-width="formLabelWidth">
                    <radio-group v-model="form.type" :checks="typeEnums"></radio-group>
                </el-form-item>
                <el-form-item :label="$t('surfboard.manage.size')" :label-width="formLabelWidth">
                    <radio-group v-model="form.size" :checks="sizeEnums"></radio-group>
                </el-form-item>
                <el-form-item :label="$t('surfboard.manage.num')" :label-width="formLabelWidth">
                    <el-input v-model="form.num" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="addSubmit">{{$t('submit')}}</el-button>
            </div>
        </el-dialog>
        <!-- 编辑表单弹窗 -->
        <el-dialog :title="$t('surfboard.manage.edit.title')" :visible.sync="editDialogVisible">
            <el-form :model="form">
                <el-form-item :label="$t('surfboard.manage.id')" :label-width="formLabelWidth">
                  <el-input v-model="form.id" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item :label="$t('surfboard.manage.productiondate')" :label-width="formLabelWidth">
                  <el-date-picker v-model="form.productionDate" value-format="yyyy-MM-dd" type="date" :placeholder="$t('chooseDate')">
                    </el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('surfboard.manage.storage')" :label-width="formLabelWidth">
                    <radio-group v-model="form.storage" :checks="storages"></radio-group>
                </el-form-item>
                <el-form-item :label="$t('surfboard.manage.name')" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('surfboard.manage.type')" :label-width="formLabelWidth">
                    <radio-group v-model="form.type" :checks="typeEnums"></radio-group>
                </el-form-item>
                <el-form-item :label="$t('surfboard.manage.size')" :label-width="formLabelWidth">
                    <radio-group v-model="form.size" :checks="sizeEnums"></radio-group>
                </el-form-item>
                <el-form-item :label="$t('surfboard.manage.num')" :label-width="formLabelWidth">
                    <el-input v-model="form.num" auto-complete="off"></el-input>
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
    import radioGroup from '@/components/radioGroup'

    export default {
        name: 'board',
        components: {
            customTable,
            radioGroup
        },
        data() {
            let sizeEnums = require('@/enums/surfboardSize.js').default.enums
            let typeEnums = require('@/enums/surfboardType.js').default.enums
            return {
                sizeEnums,
                typeEnums,
                eventHub: new Vue(),
                groups: [],
                storages: [],
                formLabelWidth: '90px',
                editDialogVisible: false,
                addDialogVisible: false,
                form: {
                    id: '',
                    storage: '',
                    name: '',
                    type: '',
                    size: '',
                    num: ''
                },
                recNum: 0,
                pageSize: 20,
                columData: [{
                    prop: 'id',
                    label: 'surfboard.manage.id'
                }, {
                    prop: 'productionDate',
                    label: 'surfboard.manage.productiondate'
                }, {
                    prop: 'storage',
                    label: 'surfboard.manage.storage'
                }, {
                    prop: 'name',
                    label: 'surfboard.manage.name'
                }, {
                    prop: 'type',
                    label: 'surfboard.manage.type'
                }, {
                    prop: 'size',
                    label: 'surfboard.manage.size'
                }, {
                    prop: 'num',
                    label: 'surfboard.manage.num'
                }]
            }
        },
        mounted: async function() {
            let storageRtn = await api.storageList()
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
                let data = await api.surfboardList(pageNo, pageSize)
                this.recNum = data.recNum || 0
                return data
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
            async deleteFunc(index, row) {
                let data = await api.delSurfboard(row.id)
                this.eventHub.$emit('refresh')
            },
            async updateSubmit() {
                let data = await api.updateSurfboard(this.form)
                this.editDialogVisible = false
                this.eventHub.$emit('refresh')
            },
            async addSubmit() {
                let data = await api.addSurfboard(this.form)
                this.addDialogVisible = false
                this.eventHub.$emit('refresh')
            }
        }
    }
</script>

<style lang="less" scoped>
</style>

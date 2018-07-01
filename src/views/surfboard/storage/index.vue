<template>
    <div>
        <custom-table :dataAPI="getData" :eventHub="eventHub" :pageSize="pageSize" :tableColumns="columData" :deleteFunc="deleteFunc">
            <template slot="header">
                <el-row>
                    <el-col :span="20">
                        <el-button-group>
                            <el-button type="primary">{{$t('storage.manage.total')}}</el-button>
                            <el-button>{{recNum}}</el-button>
                        </el-button-group>
                    </el-col>
                    <el-col :span="4">
                        <el-button-group>
                            <el-button type="primary" @click="dialogFormVisible=true">{{$t('storage.manage.add')}}</el-button>
                        </el-button-group>
                    </el-col>
                </el-row>
            </template>
        </custom-table>
        <!-- 新增表单弹窗 -->
        <el-dialog :title="$t('storage.manage.add.title')" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item :label="$t('storage.manage.storage')" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
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
        name: 'depot',
        components: {
            customTable
        },
        data() {
            return {
                formLabelWidth: '90px',
                dialogFormVisible: false,
                eventHub: new Vue(),
                form: {
                    name: ''
                },
                recNum: 0,
                pageSize: 20,
                columData: [{
                    prop: 'name',
                    label: 'storage.manage.storage'
                }]
            }
        },
        methods: {
            async getData(pageNo, pageSize){
                let data = await api.storageList(pageNo, pageSize)
                this.recNum = data.recNum || 0
                return data
            },
            async addSubmit() {
                let data = await api.addStorage(this.form.name)
                this.dialogFormVisible = false
                this.eventHub.$emit('refresh')
            },
            async deleteFunc(index, row) {
                let data = await api.delStorage(row.name)
                this.eventHub.$emit('refresh')
            }
        }
    }
</script>

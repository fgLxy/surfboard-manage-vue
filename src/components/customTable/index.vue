<template>
    <el-container>
        <el-header :height="headerSize">
            <slot name="header"></slot>
        </el-header>
        <el-main>
            <el-row>
                <el-table :data="tableDatas" size="mini" border stripe>
                    <el-table-column
                        v-for="item in tableColumns" 
                        :key="item.prop" 
                        :prop="item.prop" 
                        :label="$t(item.label)" 
                        :width="item.width"
                    >
                    <template slot-scope="scope">
                        <span v-if="!item.custom">{{scope.row[item.prop]?$t(scope.row[item.prop]):'N/A'}}</span>
                        <div v-else>
                            <slot :name="item.prop" :row="scope.row"></slot>
                        </div>
                    </template>
                    </el-table-column>
                    <el-table-column :label="$t('operate')" width="150" v-if="editFunc||deleteFunc">
                        <template slot-scope="scope">
                            <el-button v-show="editFunc"
                            size="mini"
                            @click="editFunc(scope.$index, scope.row)">{{$t('edit')}}</el-button>
                            <el-button v-show="deleteFunc"
                            size="mini"
                            type="danger"
                            @click="deleteFunc(scope.$index, scope.row)">{{$t('delete')}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row v-if="pageSize">
                <el-pagination background layout="prev, pager, next, jumper, ->, total" :total="recNum" :page-size="pageSize" :current-page.sync="pageNo">
                </el-pagination>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
    export default {
        name: 'custom-table',
        props: {
            eventHub: {
                type: Object,
                required: false
            },
            tableColumns: {
                type: Array,
                required: true
            },
            deleteFunc: {
                type: Function,
                required: false
            },
            editFunc: {
                type: Function,
                required: false
            },
            dataAPI: {
                type: Function,
                required: true
            },
            pageSize: {
                type: Number,
                required: false,
                default: 0
            },
            headerSize: {
                type: String,
                requried: false,
                default: '60'
            }
        },
        data: function() {
            return {
                pageNo: 1,
                recNum: 1000,
                tableDatas: []
            }
        },
        watch: {
            pageNo: function(to, from) {
                this.loadData(to, this.pageSize)
            }
        },
        mounted: function() {
            this.loadData(this.pageNo, this.pageSize)
        },
        methods: {
            async loadData(pageNo, pageSize) {
                let data = await this.dataAPI(pageNo, pageSize)
                this.tableDatas = data.records
                this.recNum = data.recNum
            },
            refresh() {
                this.pageNo = 1
                this.loadData(this.pageNo, this.pageSize)
            }
        },
        created: function() {
            if (this.eventHub) {
                this.eventHub.$on('refresh', this.refresh)
            }
        },
        beforeDestroy: function() {
            if (this.eventHub) {
                this.eventHub.$off('refresh')
            }
        }
    }
</script>

<style lang="less" scoped>
.el-row {
    margin-top: 20px;
}
</style>
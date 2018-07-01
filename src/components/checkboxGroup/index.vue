<template>
    <el-row class="group">
        <el-checkbox-group class="box" size="mini" text-color="#194D5B" v-model="dataValue">
            <el-button type="primary" size="mini" v-if="title">{{$t(title)}}</el-button>
            <el-checkbox v-for="item in checks" :key="item.key" :label="$t(item.label)" border></el-checkbox>
        </el-checkbox-group>
    </el-row>
</template>

<script>
    export default {
        name: 'checkbox-group',
        props: {
            value: {
                required: false
            },
            title: {
                type: String,
                required: false,
                defalt: ''
            },
            checks: {
                type: Array,
                required: true
            }
        },
        data: function() {
            return {
                dataValue: this.$t(this.value) || [],
                reversMap: {}
            }
        },
        mounted: function() {
            this.checks.forEach(item => {
                this.reversMap[this.$t(item.label)] = item.label
            })
        },
        watch: {
            dataValue: function(to, from) {
                let newArr = []
                to.forEach(item => newArr.push(this.reversMap[item]))
                this.$emit('input', newArr)
                this.$emit('change', newArr)
            }
        }
    }
</script>

<style scoped lang="less">
 .group{
    width: 100%;
    height: 28px;
    margin-bottom: 6px;
}
.box{
    height: 28px;
    float: left;
}
.box>* {
    margin-left: 5px;
}
</style>